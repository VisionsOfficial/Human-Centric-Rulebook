const express = require('express');

const auth = require("./../middlewares/auth");
const ctrl = require('./../controllers/datatypesController');

const router = express.Router();

router.get("/", auth.authenticateService, ctrl.all);
router.get("/:id", auth.authenticateService, ctrl.one);
router.post("/", auth.authenticateService, ctrl.create);
router.delete("/", auth.authenticateService, ctrl.delete);
router.put('/', auth.authenticateService, ctrl.update);

module.exports = router;