const express = require("express");
const router = express.Router();
const ResponseDTO = require('../helper/responseDTO');
//mongoose models
const Inquiry = require("../models/Inquiry");
const Listing = require("../models/Listing");

// other imports
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {forwardAuthenticated} = require("../config/auth");


const KafkaProducer = require("../kafka/KafkaProducer");
const kafkaProducer = new KafkaProducer("inquiries");
kafkaProducer.connect(() => console.log('Kafka Producer Connected'));



router.get('/', async (req, res) => {
    try {
      const inquiries = await Inquiry.find();
      res.json(inquiries);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


router.post("/create", async(req, res) => {
    const {text, listingid} = req.body;
    console.log(req.body.listingId, req.body.listingid);
    let errors = [];
  
    if (!text || !listingid ) {
      errors.push({msg: "Please enter all fields"});
    }

    if (errors.length > 0) {
        res.status(400).send(errors);   
    } else {
        var currentTime = new Date();
        const inquiry = new Inquiry({
            text,
            currentTime,
            listingid
          });
    
          inquiry.save()
            .then(() => {
                res.json(new ResponseDTO(inquiry));
                kafkaProducer.send(inquiry);
              }              
            )
            .catch(err => () => {
              console.log(err);
              res.status(500).send('error creating inquiry');
            });
        
        //inquiryClient.publish('inquiries',inquiry);
      
    }

});

router.get("/listing/:listingid", async (req, res) => {
    try {
        console.log(req.params.listingid);

        const inquiries = await Inquiry.findById(req.params.listingid);
        res.json(inquiries);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Server error');
    }

});


module.exports = router; 