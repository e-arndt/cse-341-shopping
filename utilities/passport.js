// utilities/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Prefer explicit URL so it works both locally and in prod via env
const callbackURL =
  process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8080/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const firstName = profile.name?.givenName;
        const lastName = profile.name?.familyName;

        if (!email) {
          return done(new Error('No email provided by Google'), null);
        }

        // Try find by googleId first
        let user = await User.findOne({ googleId: profile.id });

        // If not found by googleId, try by email
        if (!user) {
          user = await User.findOne({ email });
        }

        // Create new user if still not found
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email,
            firstName,
            lastName,
          });
        } else if (!user.googleId) {
          // Existing user (maybe created via POST /users) → link Google account
          user.googleId = profile.id;
          await user.save();
        }

        // Passport will attach this to req.user in the callback route
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
