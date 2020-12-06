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
 *  - TODO:
 *    - if listingId is not a objectId the function hangs
 *    - but thats too bad you suppose to be here LOL
 ***************************/
router.get('/', upload.none(), (req, res, next) => {
  console.log(req.query);
  if (req.query['listingId']) {
    Listing.findById((req.query['listingId']))
      .then(listing => {
        res.json(listing);
      })
      .catch(err => console.log(err));
  } else {
    Listing.find().then(
      listings => {
        res.json(listings);
      }
    ).catch();
  }
});

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