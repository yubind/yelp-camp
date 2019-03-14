
var express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser"),
    app = express(),
    mongoose = require("mongoose");

//create yelp camp database inside mongodb
mongoose.connect("mongodb://localhost/yelp_camp");

//SchemaSetup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});
//Make Model that uses the Schema
var Campground = mongoose.model("campground", campgroundSchema);



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function(req, res){
   res.render("landing");
});


app.get("/campgrounds", function(req, res){
//Get all campgrounds on DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });
});




app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
//Create a new campground and Save to the DB
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
            res.redirect("/campgrounds");
       }
    });
});



app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.get("/campgorunds/:id", function(req, res) {
   res.send("SHOW PAGE"); 
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server Has Started!"); 
});
