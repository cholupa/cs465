const Mongoose = require('./db');
const Trip = require('./travlr');

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf-8'));

const seeDB = async() => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
}

seeDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});