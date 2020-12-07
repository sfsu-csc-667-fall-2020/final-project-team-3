const express = require("express");
const router = express.Router();
const redis = require('redis');
const inquiryClient = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });
//mongoose models
const Inquiry = require("../models/Inquiry");
const Listing = require("../models/Listing");


router.post("/inquiry/postInquiry", (req, res) => {
    console.log(req.body);
    Inquiry.collection('test').insertOne({data: req.body.message })
        .then(() => console.log('db insert worked'))
        .catch((e) => console.log(e));
    inquiryClient.publish('inquiries', req.body.message);
    res.send('ok');
});

router.get("/inquiry/")

router.get("/inquiry/getInquiries", async (req, res) => {
    const listing = Listing.findById(req.listing._id)
})