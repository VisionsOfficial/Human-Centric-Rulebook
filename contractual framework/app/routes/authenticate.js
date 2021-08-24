const express = require('express');

const Service = require("./../models/Service.model");

const auth = require("./../config/token");

const router = express.Router();


/**
 * Returns JWT access token to authenticate to the API
 */
router.post("/token", async (req, res, next) => {
    if(!req.body.serviceKey) {
        return res.status(400).json({error: "missing-parameter-error", message: "Missing serviceKey parameter from request body."});
    }

    if(!req.body.secretKey) {
        return res.status(400).json({error: "missing-parameter-error", message: "Missing secretKey from request body."});
    }

    const service = await Service.findOne({ $and: [
        {serviceKey: req.body.serviceKey},
        {serviceSecretKey: req.body.secretKey}
    ]});

    if(!service)
        return res.status(401).json({error: "authorization-error", message: "No service was found using these credentials"});

    const token = auth.generateToken(req.body.serviceKey, req.body.secretKey);

    return res.status(200).json({message: "Successfully authenticated.", token: token});
});

module.exports = router;