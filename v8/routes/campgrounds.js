var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var Campground = require("../models/campground");

router.get("/campgrounds", function(req, res){
//Get all campgrounds on DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});



//CREATE - add new campground to DB
router.post("/campgrounds", function(req, res){
    //Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
    //Redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW
router.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

router.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user});
        }
    });
});

module.exports = router;
