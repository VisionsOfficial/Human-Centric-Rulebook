const express = require('express');

const auth = require("./../middlewares/auth");
const ctrl = require('./../controllers/webappController');

const router = express.Router();

router.get("/", ctrl.generateContract);
router.get("/contracts/generate", ctrl.generateContract);
router.get("/contracts/sign", ctrl.signContract);

module.exports = router;