var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Data = require('./Data.js');

const dbRoute =
    'mongodb+srv://admin:admin@cluster0-rns5x.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// GET -- get all data
router.get('/', function (req, res, next) {
    Data.find(function (err, data) {
        if (err) {
            return res.json({success: false, error:err});
        } else {
            return res.json({success:true, info: data})
        }
    }); 
});

// GET -- search based on title of movie
router.get('/:title', function (req, res, next) {
    // returns results with a title LIKE the input paramater
    var re = new RegExp(req.params.title, "i"); 
    Data.find({title: re}, function (err, data) {
        if (err) {
            return res.json({success: false, error:err});
        } else {
            return res.json({success:true, info: data})
        }
    }); 
});

// POST -- enter an entry
router.post('/', function (req, res, next) {
    let po = new Data();
    po.title = req.body.title;
    po.director = req.body.director;
    po.genres = req.body.genres;
    po.country = req.body.country;
    po.year = req.body.year;
    po.image = req.body.image;
    po.upvotes = req.body.upvotes;

    po.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// DELETE -- delete one entry based on ALL schema properties
router.delete('/', function (req, res, next) {
    Data.findOneAndRemove({title: req.body.title, director: req.body.director,
        genres: req.body.genres, country: req.body.country, year: req.body.year,
        image: req.body.image, upvotes: req.body.upvotes   
        }, (err) => {
     if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
    });
});

// DELETE -- search for and delete one entry based on JUST title, director, year
router.delete('/formDelete', function (req, res, next) {
    Data.findOneAndRemove({title: req.body.title, director: req.body.director, year: req.body.year}, (err, data) => {
     if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, info: data });
    });
});

// PUT -- adds 1 to upvotes of an entry 
router.put('/addUpvote', function(req, res, next) {
    Data.findOneAndUpdate({title: req.body.title, director: req.body.director,
        genres: req.body.genres, country: req.body.country, year: req.body.year,
        image: req.body.image, upvotes: req.body.upvotes   
        },  // search citeria
        {upvotes: req.body.upvotes + 1}, // updates
        (err) => {
            if (err) return res.json({ success: false, error: err });
           return res.json({ success: true });
        });
})

// PUT -- removes 1 to upvotes of an entry 
router.put('/removeUpvote', function(req, res, next) {
    Data.findOneAndUpdate({title: req.body.title, director: req.body.director,
        genres: req.body.genres, country: req.body.country, year: req.body.year,
        image: req.body.image, upvotes: req.body.upvotes   
        },  // search citeria
        {upvotes: req.body.upvotes - 1}, // updates
        (err) => {
            if (err) return res.json({ success: false, error: err });
           return res.json({ success: true });
        });
})


module.exports = router;
