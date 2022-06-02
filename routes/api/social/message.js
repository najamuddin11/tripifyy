const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Message = require('../../../model/Message');

// router.post(
//     '/',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
  
//       const newMessage = new Message({
//         text: req.body.text,
//         name: req.body.name,
//         avatar: req.body.avatar,
//         sender: req.user.id,
//         receiver:req.body.receiver
//       });
      
//       newMessage.save().then(post => res.json(post));
//     }
//   );

//   router.get('/',
//   passport.authenticate('jwt', { session: false }),
//   (req,res)=>{
//     Message.find()
//         .then(msg => res.json(msg))
//         .catch(err => res.status(404).json(err))
// })

const createRoom = () =>{
  
}


  module.exports = router;
