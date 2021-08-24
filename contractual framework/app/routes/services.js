const express = require('express');

const auth = require("./../middlewares/auth");
const ctrl = require('./../controllers/servicesController');

const router = express.Router();

router.get("/info", auth.authenticateService, ctrl.getServiceInfo);
router.post("/", ctrl.register);

module.exports = router;