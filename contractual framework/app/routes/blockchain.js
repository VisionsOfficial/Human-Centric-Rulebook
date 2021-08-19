const express = require("express");

const router = express.Router();

const ctrl = require("../controllers/blockchainController");

router.get("/contracts", ctrl.getContracts);
router.post("/contracts/:contractId/sign/client", ctrl.uploadClientSignature);
router.post("/contracts/:contractId/sign/provider", ctrl.uploadProviderSignature);

module.exports = router;