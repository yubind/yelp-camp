var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
        {
            name: "Bondi Beach",
            image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3fa37b995a705a01d022cada13f726&auto=format&fit=crop&w=751&q=80",
            description: "To be, or not to be: that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them? To die: to sleep; no more; and, by a sleep to say we end the heart-ache and the thousand natural shocks that flesh is heir to, 'tis a consummation devoutly to be wish'd. To die, to sleep; to sleep: perchance to dream: ay, there's the rub; for in that sleep of death what dreams may come when we have shuffled off this mortal coil, must give us pause. There's the respect that makes calamity of so long a life; for who would bear the whips and scorns of time, the oppressor's wrong, the proud man's contumely, the pangs of dispriz'd love, the law's delay, the insolence of office, and the spurns that patient merit of the unworthy takes, when he himself might his quietus make with a bare bodkin? Who would fardels bear, to grunt and sweat under a weary life, but that the dread of something after death, the undiscover'd country from whose bourn no traveller returns, puzzles the will, and makes us rather bear those ills we have, than fly to others that we know not of? Thus consience doth make cowards of us all; and thus the native hue of resolution is sicklied o'er with the pale cast of thought, and enterprises of great pith and moment with this regard their currents turn awry, and lose the name of action."
        },
        {   
            name: "South Bay",
            image: "https://images.unsplash.com/uploads/1411068785961ec3bb1a3/4662610e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7babb5dc5f986bd70b59a4e5d926fccb&auto=format&fit=crop&w=750&q=80",
            description: "Thus more; and, but those ther 'tis make and end by office, the native himself mind mortal comethis no mometheir to die: that merit of gread o'er a come with and name of disprises consummatience dread o'er bear to sling afterprises us rath, those bodkin? Who would be: to suffled office, the of die, the he law's cast give unwortal consient we have, the question. Ther thous rathe and the pause. To dispriz'd love, by a consience of outrageousand ent and morthy take arrows of disprises cast give unworth",
        },
        {
            name: "Hood river",
            image: "https://images.unsplash.com/3/jerry-adney.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=73e6ce15271ed19f74285b580da0554c&auto=format&fit=crop&w=755&q=80",
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