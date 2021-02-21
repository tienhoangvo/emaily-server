const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20')
  .Strategy;

const User = require('./../models/userModel');

passport.serializeUser((user, done) => {
  console.log({ user });
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        const user = await User.findOneOrCreate({
          googleId: profile.id,
          name: profile._json.name,
          email: profile._json.email,
        });

        console.log({ profile });

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
