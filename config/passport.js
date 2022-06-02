const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Agency = mongoose.model("agency");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      if (jwt_payload.isUser) {
        User.findById(jwt_payload.id)
          .then((user) => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch((err) => console.log(err));
      } else if (jwt_payload.isAgency) {
        Agency.findById(jwt_payload.id)
          .then((agency) => {
            if (agency) {
              return done(null, agency);
            }
            return done(null, false);
          })
          .catch((err) => console.log(err));
      }
    })
  );
};
