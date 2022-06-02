const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../../validation/register");

const validateLoginInput = require("../../../validation/login");

//Load User Model

const Agency = require("../../../model/Agency");

// @route GET api/users/test
// @desc Tests post route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Agency Works" }));

// @route GET api/users/register
// @desc Register User
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Agency.findOne({ email: req.body.email }).then((agency) => {
    if (agency) {
      return res.status(400).json({ email: "Email Already Exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const newAgency = new Agency({
        isAgency: req.body.isAgency,
        isUser: req.body.isUser,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        avatar: avatar,
        address1: req.body.address1,
        address2: req.body.address2,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        zipCode: req.body.zipCode,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAgency.password, salt, (err, hash) => {
          if (err) throw err;
          newAgency.password = hash;
          newAgency
            .save()
            .then((agency) => res.json(agency))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc Login User / Returning JWT Token
// @access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  Agency.findOne({ email }).then((agency) => {
    if (!agency) {
      errors.email = "User Not Found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, agency.password).then((isMatch) => {
      if (isMatch) {
        //User Matched
        const payload = {
          isAgency: agency.isAgency,
          isUser: agency.isUser,
          id: agency.id,
          firstName: agency.firstName,
          lastName: agency.lastName,
          avatar: agency.avatar,
          username: agency.username,
          email: agency.email,
        };
        //SignIn Token
        jwt.sign(
          payload,
          keys.secretOrKey,

          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc Return Current User
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.agency.id,
      name: req.agency.firstName + " " + req.agency.lastName,
      email: req.agency.email,
    });
  }
);

module.exports = router;
