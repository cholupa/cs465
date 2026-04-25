// controller for travel page
const tripsEndPoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept' : 'application/json'
    }
};

//var fs = require('fs');
//var trips = JSON.parse(fs.readFileSync("./data/trips.json"))
// added fetch to endpoint for travel page
// additional checks for empty json to not crash the page
const travel = async function(req,res, next){
    console.log("Travel Controller Begins");
    await fetch(tripsEndPoint, options)
        .then((res) => res.json())
        .then((json) => {
            let message = null;
            if(!(json instanceof Array)){
                message = "API lookup error";
                json = [];
            }
            else{
                if(!json.length){
                    message = "No trips exists in the database!";
                }
            }
            res.render('travel', {title: 'Travel Page', trips: json, message});
        })
        .catch((err) => res.status(500).send(err.message));
};

module.exports = {
    travel,
};