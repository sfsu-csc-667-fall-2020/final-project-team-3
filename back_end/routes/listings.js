const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {v4: uuidv4} = require('uuid');

// multer storage config
let storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});
const upload = multer({storage: storage});


const Listing = require('../models/Listing');

/****************************
 *  view listings
 *  - /api/listings for all listings
 *  - /api/listings?listingId=id for one listing if exists
 *  - /api/listings?listingType=type for all listings with that type
 *  - TODO:
 *    - if listingId is not a objectId the function hangs
 *    - but thats too bad you suppose to be here LOL
 ***************************/
router.get('/', upload.none(), (req, res, next) => {
  console.log(req.query);
  // if query contains listingid send that listing if exists
  if (req.query['listingId']) {
    Listing.findById((req.query['listingId']))
      .then(listing => {
        res.json(listing);
      })
      .catch(err => console.log(err));
    // if query contains type send all listings with that type
  } else if (req.query['type']) {
    Listing.find({type: req.query['type']}, (err, listings) => {
      if (err) throw err;
      res.json(listings);
    })
    //else send all listings
  } else {
    Listing.find().then(
      listings => {
        res.json(listings);
      }
    ).catch();
  }
})
;

/****************************
 *  listing creation
 ***************************/
router.post('/create', upload.array('photos', 10), (req, res, next) => {
  // only logged in use can submit listings
  if (!req.user) {
    res.json({error: "please login"})
  } else {
    const {title, description, price, type} = req.body;
    if (!title || !price || !type) {
      res.json({error: 'please fill in requried fields'});
    } else {
      // if user uploaded images:
      let images = [];
      if (req.files) {
        images = req.files.map(file => file.filename);
      }

      const listing = new Listing({
        title,
        description,
        price,
        type,
        user: req.user.id,
        images,
      });

      listing.save()
        .then(
          res.json(listing)
        )
        .catch(err => console.log(err));
    }
  }
});

module.exports = router;