const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      accessType: "offline",
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile)
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({ googleId: profile.id, accessToken });
      } else {
        user.accessToken = accessToken;
        await user.save();
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


exports.logoutUser = async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(400).json({ message: "No user is logged in" });
    }

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to log out", error: err.message });
      }

      // Clear the session cookie
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to log out", error: error.message });
  }
};
