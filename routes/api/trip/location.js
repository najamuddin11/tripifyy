const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


var unirest = require("unirest");


router.get('/',(req,res)=>{
    req = unirest("GET", "https://tripadvisor1.p.rapidapi.com/locations/search");

    req.query({
        "location_id": "1",
        "limit": "30",
        "sort": "relevance",
        "offset": "0",
        "lang": "en_US",
        "currency": "USD",
        "units": "km",
        "query": "pattaya"
    });
    
    req.headers({
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "fca2cf2d13msh7a82b7fe587bf5cp109cbajsn6a959d485a68",
        "useQueryString": true
    });
    
    
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
    
        console.log(res.body);
    });  
})




module.exports = router;
