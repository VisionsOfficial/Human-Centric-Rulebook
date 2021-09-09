const express = require('express');

const auth = require("./../middlewares/auth");
const ctrl = require('./../controllers/datasetsController');

const router = express.Router();

router.get("/", auth.authenticateService, ctrl.all);
router.get("/:id", auth.authenticateService, ctrl.one);
router.post("/", auth.authenticateService, ctrl.create);
router.delete("/", auth.authenticateService, ctrl.delete);
router.put('/', auth.authenticateService, ctrl.update);

router.get("/request/in", auth.authenticateService, ctrl.incoming);
router.get("/request/out", auth.authenticateService, ctrl.outgoing);

router.get("/request/:requestId", auth.authenticateService, ctrl.oneRequest);
router.post("/request/:datasetId", auth.authenticateService, ctrl.request);
router.post(
	"/request/:requestId/authorize",
	auth.authenticateService,
	ctrl.authorize
);

module.exports = router;