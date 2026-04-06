const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

//GET trips list
const tripList = async(req,res) =>{
    const q =  await Model
        .find({}) // find all
        .exec();
        console.log(q);
    if(!q){
        return res
            .status(404)
            .json(err);
    } else{
        return res
            .status(200)
            .json(q);
    }
    
};

//GET trip by code
const tripsByCode = async(req,res) =>{
    const q =  await Model
        .find({'code': req.params.tripCode}) // find single
        .exec();
        console.log(q);
    if(!q){
        return res
            .status(404)
            .json(err);
    } else{
        return res
            .status(200)
            .json(q);
    }
    
};

module.exports = {
    tripList,
    tripsByCode
};