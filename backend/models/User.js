import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function () {
      // required if they don't use google Id
      return !this.googleId;
    }
  },
  role: {
    type: String,
    enum: ['donator', 'organizer', 'admin'],
    default: 'donator',
  },
  google_id: {
    type: String,
    sparse: true,
  },
}, { timestamps: true });

// before saving a user, hash the password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// method to compare passwords
userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;
