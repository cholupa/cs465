const express = require("express");
const router = express.Router();

const tripsController = require('../controllers/trips');
router
    .route('/trips')
    .get(tripsController.tripList);
// Route via tripsByCode - Param:tripCode
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsByCode);

module.exports = router;