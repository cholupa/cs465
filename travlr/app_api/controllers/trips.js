const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

//GET trips list
const tripList = async(req,res) =>{
    const q =  await Model
        .find({}) // find all
        .exec();
        //console.log(q);
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
        //console.log(q);
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

//POST trips added
const tripsAddTrip = async(req,res) =>{
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

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

// PUT
const updateTrip = async(req,res) => {
    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            { 'code' :req.params.tripCode},
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            {new: true}
        )
        .exec();

    if(!q){
        return res
        .status(404)
        .json(err);
    } else{
        return res
            .status(200)
            .json(q);
    }
}

module.exports = {
    tripList,
    tripsByCode,
    tripsAddTrip,
    updateTrip
};