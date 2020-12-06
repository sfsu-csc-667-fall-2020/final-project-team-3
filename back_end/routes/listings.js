const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

/****************************
 *  listing creation
 ***************************/
router.post('/create', (req, res, next) => {
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
        user: req.user.id
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