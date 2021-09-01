const express = require('express');
const router = express.Router();
const auth = require("./../middlewares/auth");

const ctrl = require('./../controllers/contractsController');

router.get("/datasharing", auth.authenticateService, ctrl.all);
router.get("/datasharing/:contractId", auth.authenticateService, ctrl.one);
router.post("/datasharing", ctrl.createDataSharingContract);

module.exports = router;