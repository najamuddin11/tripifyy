const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require('multer')
const Trip = require("../../../model/Trip");

const UserProfile = require("../../../model/UserProfile");
const AgencyProfile = require("../../../model/AgencyProfile");

const validateTripInput = require("../../../validation/trip");

require('dotenv').config()


// @route GET api/trips
// @desc Get all Post
// @access Public

router.get("/", (req, res) => {
  Trip.find()
    .sort({ date: -1 })
    .then((trips) => res.json(trips))
    .catch((err) => res.status(404).json(err));
});

// @route GET api/trips/:id
// @desc Get Trips by id
// @access Public

router.get("/:id", (req, res) => {
  Trip.findById(req.params.id)
    .populate("agency", ["firstName", "lastName", "avatar", "email"])

    .then((trip) => res.json(trip))
    .catch((err) => res.status(404).json(err));
});

router.get("/agency/:id", (req, res) => {
  Trip.find({ agency: req.params.id })
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json(err));
});

// @route POST api/posts
// @desc Create Post
// @access Private

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(file)
//       cb(null, './images')
//   },
//   filename: (req, file, cb) => {
//       cb(null, Date.now() + file.originalname)
//   }
// })

// const upload = multer({storage: fileStorage})

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body)
    const { errors, isValid } = validateTripInput(req.body);
    // Check Validation
    if (!isValid) {

      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    if (req.user.isAgency) {
      const newTrip = new Trip({
        agency: req.user.id,
        designation: req.body.designation,
        departureDate: req.body.departureDate,
        numberOfDays: req.body.numberOfDays,
        numberOfPeople: req.body.numberOfPeople,
        tripType: req.body.tripType,
        title: req.body.title,
        desc: req.body.desc,
        image: `http://localhost:5000/images/${req.files[0].filename}`,
        
        price: req.body.price,
      });
      newTrip.save().then((post) => res.json(post));
    }
  }
);

// @route Delete api/trips/:id
// @desc Delete trip by id
// @access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.isAgency) {
      AgencyProfile.findOne({ agency: req.user.id }).then((profile) => {
        Trip.findById(req.params.id)
          .then((trip) => {
            if (trip.agency.toString() === req.user.id) {
              trip.remove().then(() => res.json({ success: true }));
            } else {
              return res
                .status(401)
                .json({ notaurthorized: "user not authorized" });
            }
          })
          .catch((err) =>
            res.status(404).json({ triptnotfound: "No trip found" })
          );
      });
    }
  }
);

// @route Trip api/trips/join/:id
// @desc Join Trip
// @access Private

router.post(
  "/join/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.isUser) {
      UserProfile.findOne({ user: req.user.id }).then((profile) => {
        Trip.findById(req.params.id)

          .then((trip) => {
            if (
              trip.tourists.filter(
                (tourist) =>
                  tourist.user + "" === req.user.id ||
                  tourist.user + "" === req.user.id
              ).length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyjoined: "user already joined" });
            }
            trip.tourists.unshift({ user: req.user.id });

            const newNotification = new Notification({
              agency: trip.agency,
              notification: {
                likedBy: req.user.id,
                link: trip._id,
                message: `${req.user.firstName} ${req.user.lastName} has joined your trip`,
              },
            });
            newNotification
              .save()
              .then((notification) => res.status(200))
              .catch((err) => console.log(err));

            trip.save().then((trip) => res.json(trip));
          })
          .catch((err) =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      });
    } else {
      res.status(401).json({ unauthorised: "user not valid" });
    }
    //else if(req.user.isAgency){
    //     AgencyProfile.findOne({ agency: req.user.id })
    //         .then(profile =>{
    //             Trip.findById(req.params.id)
    //                 .then(trip => {
    //                     if(trip.tourists.filter(tourist => tourist.agency+"" === req.user.id || tourist.user+"" === req.user.id).length>0){

    //                         trip.tourists.shift({agency:req.user.id})

    //                         //return res.status(400).json({alreadyliked:'user already liked'})
    //                     }else{

    //                     trip.tourists.unshift({ agency: req.user.id })
    //                     }

    //                     trip.save().then(trip => res.json(trip))

    //                 })
    //                 .catch(err =>
    //                      // res.status(404).json({ postnotfound: 'No trip found'})
    //                 console.log(err)
    //                     )
    //         })
    //     }
  }
);

module.exports = router;
