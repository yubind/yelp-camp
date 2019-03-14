var express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser"),
    app = express(),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment")
    ;


//create yelp camp database inside mongodb
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();



app.get("/", function(req, res){
   res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
//Get all campgrounds on DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});



//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});




// ===============
//  Comment Routes
// ===============

app.get("/campgrounds/:id/comments/new", function(req, res) {
   Campground.findById(req.params.id, function(err, campground){
      if(err){
         console.log(err);
      } else {
         res.render("comments/new", {campground:campground}); 
      }
   });
   
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
    //Create New Comments
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server Has Started!"); 
});
