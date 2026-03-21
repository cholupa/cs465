// controller for travel page
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync("./data/trips.json"))
const travel = (req,res)=>{
    res.render('travel', {title: 'Travel Page', trips});
}

module.exports = {
    travel
}