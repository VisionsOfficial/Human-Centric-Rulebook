const express = require('express');
const router = express.Router();

const ctrl = require('./../controllers/contractsController');

router.post("/datasharing", ctrl.createDataSharingContract);

module.exports = router;