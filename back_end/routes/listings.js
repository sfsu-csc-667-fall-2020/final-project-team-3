const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const ResponseDTO = require('../helper/responseDTO');
const {forwardAuthenticated} = require("../config/auth");


/*****************************
 *           kafka           *
 *****************************/
const KafkaProducer = require("../kafka/KafkaProducer");
const kafkaProducer = new KafkaProducer("images");
kafkaProducer.connect(() => console.log('Kafka Producer Connected'));

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
  // if query contains listingid send that listing if exists
  if (req.query['listingId']) {
    Listing.findById((req.query['listingId']))
      .then(listing => {
        res.json(new ResponseDTO(listing));
      })
      .catch(err => console.log(err));
    // if query contains type send all listings with that type
  } else if (req.query['type']) {
    Listing.find({type: req.query['type']}, (err, listings) => {
      if (err) throw err;
      res.json(new ResponseDTO(listings));
    })
    //else send all listings
  } else {
    Listing.find().then(
      listings => {
        res.json(new ResponseDTO(listings));
      }
    ).catch();
  }
})
;

/****************************
 *  create listing
 *  -/api/listings/create (POST)
 *  {
 *    title : String
 *    description : String
 *    price : Number
 *    type: String
 *    images: <input id="photos" name="photos" type="file" multiple accept="image/*">
 *       up to 10 images, be sure to add enctype="multipart/form-data" in <form> tag
 *  }
 ***************************/
router.post('/create', upload.array('photos', 10), (req, res, next) => {
  // only logged in use can submit listings
  if (!req.user) {
    res.json(new ResponseDTO().setStatusCode(401).pushError('Please log in before submitting listing'));
  } else {
    const {title, description, price, type} = req.body;
    if (!title || !price || !type) {
      res.json(new ResponseDTO().pushError('Please fill in required fields'));
    } else {
      // if user uploaded images:
      let images = [];
      if (req.files) {
        // create a list of file name to store in listing.images
        images = req.files.map(file => file.filename);
        // send out image info for kafka to process
        req.files.forEach(file => {
          kafkaProducer.send(file);
        })
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
          res.json(new ResponseDTO(listing))
        )
        .catch(err => console.log(err));
    }
  }
});

/****************************
 *  update listing
 *  - /api/listings/update?listingId=<id>
 ***************************/
router.post('/update', upload.none(), (req, res, next) => {
    if (!req.user) {
      res.json(new ResponseDTO().setStatusCode(401).pushError('Please log in to update listing'));
    } else {
      Listing.findById(req.query['listingId'], null, null, (err, listing) => {
        if (err) {
          console.log(err);
        }
        if (listing) {
          // check if user editing the listing is the creator of the listing
          if (req.user._id.toString() !== listing.user._id.toString()) {
            res.json(new ResponseDTO().setStatusCode(401).pushError(`You are not authorzied to edit this listing.`));
          } else {
            const {title, description, price, type} = req.body;
            Listing.findOneAndUpdate({_id: req.query['listingId']}, {
              title,
              description,
              price,
              type,
              modified: Date.now()
            }, {new: true})
              .then((newListing) => {
                  res.json(new ResponseDTO(newListing))
                }
              )
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          res.json(new ResponseDTO().setStatusCode(404).pushError('listing not found'))
        }

      });
    }
  }
);


/****************************
 *  update listing images
 *  - /api/listings/addImage?listingId=<id>
 *  - req.files:
 ***************************/
router.post('/addImage', upload.array('photos', 10), (req, res, next) => {
  if (!req.user) {
    return res.json(new ResponseDTO().setStatusCode(401).pushError('Please log in to update listing'));
  } else {
    Listing.findById(req.query['listingId'], null, null, (err, listing) => {
      if (err) {
        console.log(err);
      }
      if (listing) {
        let images = listing.images;
        if (req.files) {
          req.files.forEach(file => {
            images.push(file.filename);
          });
        }
        if (listing.user._id.toString() === req.user._id.toString()) {
          Listing.findOneAndUpdate({_id: req.query['listingId']}, {images}, {new: true}, (err, listing) => {
            if (err) {
              console.log(err);
            }
            return res.json(new ResponseDTO(listing));
          })
        } else {
          return res.json(new ResponseDTO().setStatusCode(401).pushError('you dont have permission to edit this listing'));
        }
      } else {
        return res.json(new ResponseDTO().setStatusCode(404).pushError('listing not found'));
      }
    })
  }
});

module.exports = router;