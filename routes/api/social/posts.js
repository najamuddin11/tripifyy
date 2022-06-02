const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post Model
const Post = require("../../../model/Posts");

// UserProfile Model
const UserProfile = require("../../../model/UserProfile");
const AgencyProfile = require("../../../model/AgencyProfile");

const Notification = require("../../../model/Notification");

// Post Validation
const validatePostInput = require("../../../validation/post");

// @route GET api/posts/test
// @desc Test post route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Post works" }));

// @route GET api/posts
// @desc Get all Post
// @access Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json(err));
});

// @route GET api/posts/:id
// @desc Get Post by id
// @access Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json(err));
});

router.get("/user/:id", (req, res) => {
  Post.find({ user: req.params.id })
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json(err));
});

// @route POST api/posts
// @desc Create Post
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    console.log(req.user);
    if (req.user.isUser) {
      const newPost = new Post({
        text: req.body.text,
        name: `${req.user.firstName} ${req.user.lastName}`,
        image: req.body.image,
        avatar: req.user.avatar,
        user: req.user.id,
        title: req.body.title,
        email: req.user.email,
      });
      newPost.save().then((post) => res.json(post));
    } else if (req.user.isAgency) {
      const newPost = new Post({
        text: req.body.text,
        name: `${req.user.firstName} ${req.user.lastName}`,
        avatar: req.user.avatar,
        image: req.body.image,
        agency: req.user.id,
        title: req.body.title,
        email: req.user.email,
      });
      newPost.save().then((post) => res.json(post));
    }
  }
);

// @route Delete api/posts/:id
// @desc Delete post by id
// @access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.isUser) {
      UserProfile.findOne({ user: req.user.id }).then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notaurthorized: "user not authorized" });
            }

            post.remove().then(() => res.json({ success: true }));
          })
          .catch((err) =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      });
    } else if (req.user.isAgency) {
      AgencyProfile.findOne({ agency: req.user.id }).then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            if (post.agency.toString() === req.user.id) {
              post.remove().then(() => res.json({ success: true }));
            } else {
              return res
                .status(401)
                .json({ notaurthorized: "user not authorized" });
            }
          })
          .catch((err) =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      });
    }
  }
);

// @route Post api/posts/like/:id
// @desc Like Post
// @access Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.isUser) {
      UserProfile.findOne({ user: req.user.id }).then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            if (
              post.likes.filter(
                (like) =>
                  like.user + "" === req.user.id ||
                  like.user + "" === req.user.id
              ).length > 0
            ) {
              post.likes.shift({ user: req.user.id });

              //return res.status(400).json({alreadyliked:'user already liked'})
            } else {
              post.likes.unshift({ user: req.user.id });

              const newNotification = new Notification({
                user: post.user,
                agency: post.agency,
                notification: {
                  likedBy: req.user.id,
                  link: post._id,
                  message: `${req.user.firstName} ${req.user.lastName} has liked your post`,
                },
              });
              newNotification
                .save()
                .then((notification) => res.status(200))
                .catch((err) => console.log(err));
            }
            post
              .save()
              .then((post) => res.json(post))
              .catch((err) => console.log(err));
          })
          .catch((err) =>
            // res.status(404).json({ postnotfound: 'No post found'})
            console.log(err)
          );
      });
    } else if (req.user.isAgency) {
      AgencyProfile.findOne({ agency: req.user.id }).then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            if (
              post.likes.filter(
                (like) =>
                  like.agency + "" === req.user.id ||
                  like.user + "" === req.user.id
              ).length > 0
            ) {
              post.likes.shift({ agency: req.user.id });

              //return res.status(400).json({alreadyliked:'user already liked'})
            } else {
              post.likes.unshift({ agency: req.user.id });
              const newNotification = new Notification({
                user: post.user,
                agency: post.agency,
                notification: {
                  likedBy: req.user.id,
                  link: post._id,
                  message: `${req.user.firstName} ${req.user.lastName} has liked your post`,
                },
              });
              newNotification
                .save()
                .then((notification) => res.status(200))
                .catch((err) => console.log(err));
            }

            post.save().then((post) => res.json(post));
          })
          .catch((err) =>
            // res.status(404).json({ postnotfound: 'No post found'})
            console.log(err)
          );
      });
    }
  }
);

// @route Post api/posts/comment/:id
// @desc Comment on post
// @access Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.isUser) {
      Post.findById(req.params.id)
        .then((post) => {
          const newComment = {
            text: req.body.text,
            name: `${req.user.firstName} ${req.user.lastName}`,
            avatar: req.user.avatar,
            user: req.user.id,
          };
          post.comments.unshift(newComment);

          post.save().then((post) => res.json(post));
          const newNotification = new Notification({
            user: post.user,
            agency: post.agency,
            notification: {
              likedBy: req.user.id,
              link: post._id,
              message: `${req.user.firstName} ${req.user.lastName} has commented on your post`,
            },
          });
          newNotification
            .save()
            .then((notification) => res.status(200))
            .catch((err) => console.log(err));
        })
        .catch((err) => res.status(404).json({ err }));
    } else if (req.user.isAgency) {
      Post.findById(req.params.id)
        .then((post) => {
          const newComment = {
            text: req.body.text,
            name: `${req.user.firstName} ${req.user.lastName}`,
            avatar: req.user.avatar,
            agency: req.user.id,
          };
          post.comments.unshift(newComment);

          post.save().then((post) => res.json(post));
          const newNotification = new Notification({
            user: post.user,
            agency: post.agency,
            notification: {
              likedBy: req.user.id,
              link: post._id,
              message: `${req.user.firstName} ${req.user.lastName} has commented on your post`,
            },
          });
          newNotification
            .save()
            .then((notification) => res.status(200))
            .catch((err) => console.log(err));
        })
        .catch((err) => res.status(404).json({ err }));
    }
  }
);

// @route Post api/posts/comment/:id/:comment_id
// @desc Comment on post
// @access Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.isUser) {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.comments.filter(
              (comment) => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotexists: "comment not exists" });
          }
          post.comments.shift({ user: req.user.id });
          post
            .save()
            .then((post) => res.json(post))
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json({ err }));
    } else if (req.user.isAgency) {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.comments.filter(
              (comment) => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotexists: "comment not exists" });
          }

          post.comments.shift({ agency: req.user.id });
          post
            .save()
            .then((post) => res.json(post))
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json({ err }));
    }
  }
);

module.exports = router;
