var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
        {
            name: "Bondi Beach",
            image: "https://images.unsplash.com/photo-1519740588306-ffbb1214223a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=350&h=350&fit=crop&s=d788a2168e920eec6e8f0c7c7597b9cf",
            description: "To be, or not to be: that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them? To die: to sleep; no more; and, by a sleep to say we end the heart-ache and the thousand natural shocks that flesh is heir to, 'tis a consummation devoutly to be wish'd. To die, to sleep; to sleep: perchance to dream: ay, there's the rub; for in that sleep of death what dreams may come when we have shuffled off this mortal coil, must give us pause. There's the respect that makes calamity of so long a life; for who would bear the whips and scorns of time, the oppressor's wrong, the proud man's contumely, the pangs of dispriz'd love, the law's delay, the insolence of office, and the spurns that patient merit of the unworthy takes, when he himself might his quietus make with a bare bodkin? Who would fardels bear, to grunt and sweat under a weary life, but that the dread of something after death, the undiscover'd country from whose bourn no traveller returns, puzzles the will, and makes us rather bear those ills we have, than fly to others that we know not of? Thus consience doth make cowards of us all; and thus the native hue of resolution is sicklied o'er with the pale cast of thought, and enterprises of great pith and moment with this regard their currents turn awry, and lose the name of action."
        },
        {   
            name: "South Bay",
            image: "data:image/jpeg;base64,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",
            description: "Thus more; and, but those ther 'tis make and end by office, the native himself mind mortal comethis no mometheir to die: that merit of gread o'er a come with and name of disprises consummatience dread o'er bear to sling afterprises us rath, those bodkin? Who would be: to suffled office, the of die, the he law's cast give unwortal consient we have, the question. Ther thous rathe and the pause. To dispriz'd love, by a consience of outrageousand ent and morthy take arrows of disprises cast give unworth"
        },
        {
            name: "Champagne",
            image: "http://photos.orlandoweekly.com/wp-content/uploads/2017/02/St.Joseph_inbodysupyogaretreat_insta.png",
            description: "People is fundaments that effectivity. Integrity and flexibility, teamwork, cost effective a set of people have changed, the competence and market. A company. Human resource systems and customers' needs, and management based on our competitiveness. A companies have found new meaning. To become a set of our customer satisfactices are a set of the importance of our competence on our future. We recognized the market. A world-class company without the importance and it world-class company. Human resource"
        }
    ];
    
    
    
    
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}
    




module.exports = seedDB;