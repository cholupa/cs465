const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const { route } = require("../../app");

function authenticateJWT(req, res, next){
    console.log("In Middleware");

    const authHeader = req.headers['authorization'];
    if (authHeader == null){
        console.log("Auth header required: NOT PRESENT");
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1){
        console.log("Not enough tokens in Auth header.");
        return res.sendStatus(501);
    }
    const token = authHeader.split(' ')[1];
    console.log("Token: " + token);

    if(token == null){
        console.log("Null Bearer Token");
        return res.sendStatus(401);
    }
    console.log(process.env.JWT_SECRET);

    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err){
            return res.sendStatus(401);
        }
        req.auth = verified;
    });
    next();


}

router
    .route("/register").post(authController.register);
router
    .route("/login")
    .post(authController.login);
router
    .route('/trips')
    .get(tripsController.tripList)
    .post(authenticateJWT,tripsController.tripsAddTrip);
// Route via tripsByCode - Param:tripCode
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsByCode)
    .put(authenticateJWT,tripsController.updateTrip);
module.exports = router;