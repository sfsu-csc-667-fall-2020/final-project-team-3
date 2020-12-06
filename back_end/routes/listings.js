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
      const listing = new Listing({
        title,
        description,
        price,
        type,
        user: req.user.id,
        images: req.files.map(file => file.filename),
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