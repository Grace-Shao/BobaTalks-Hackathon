import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, emails } = profile;
      try {
        // if existing user with google id, return user
        let user = await User.findOne({ googleId: id });

        if (user) {
          return done(null, user);
        }

        // If user with the same email exists, link Google account and return user
        user = await User.findOne({ email: emails[0].value });
        if (user) {
          user.googleId = id;
          await user.save();
          return done(null, user);
        }

        // Create a new user
        user = new User({
          email: emails[0].value,
          googleId: id,
          role: 'donator', // Default role
        });

        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Field name for email in the request body
      passwordField: 'password', // Field name for password in the request body
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        // Authentication successful
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


export default passport;