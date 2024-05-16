import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
  dbName: 'boba_server',
})
  .then(() => console.log('MongoDB connected using Mongoose'))
  .catch(err => console.error(err));

export default mongoose;
