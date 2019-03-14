var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();
var campgrounds = [
        {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1516465424220-73ffd455024f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=c27f06c031e602c4a13c32717ac48b4f"},
        {name: "Granite Hill", image:"https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=fcb0e8b40385077628132686234e666c"},
        {name: "Mt Hood", image:"https://images.unsplash.com/photo-1517691966416-ebd8697727c0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=65b77d4374110a71d50acc1f668b4bdf"},
        {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1516465424220-73ffd455024f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=c27f06c031e602c4a13c32717ac48b4f"},
        {name: "Granite Hill", image:"https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=fcb0e8b40385077628132686234e666c"},
        {name: "Mt Hood", image:"https://images.unsplash.com/photo-1517691966416-ebd8697727c0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=65b77d4374110a71d50acc1f668b4bdf"},
        {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1516465424220-73ffd455024f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=c27f06c031e602c4a13c32717ac48b4f"},
        {name: "Granite Hill", image:"https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=fcb0e8b40385077628132686234e666c"}
    ];


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function(req, res){
   res.render("landing");
});


app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server Has Started!"); 
});
