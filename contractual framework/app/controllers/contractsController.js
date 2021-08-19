const Service = require("./../models/Service.model");
const Purpose = require("./../models/Purpose.model");
const DataSharingContract = require("./../models/DataSharingContract.model");

const contracts = require("./../utils/contracts");

exports.createDataSharingContract = async (req, res, next) => {

    try {
        
        if(!req.body.serviceImportId)
            return res.status(400).json({error: "missing-parameter-error", message: "Missing serviceImportId from request body"});
        if(!req.body.serviceExportId)
            return res.status(400).json({error: "missing-parameter-error", message: "Missing serviceExportId from request body"});
        if(!req.body.purposeId)
            return res.status(400).json({error: "missing-parameter-error", message: "Missing purposeId from request body"});
        if(!req.body.datatypes)
            return res.status(400).json({error: "missing-parameter-error", message: "Missing datatypes from request body"});

        const contract = contracts.createDataSharingContract(req.body.serviceImportId, req.body.serviceExportId, req.body.purposeId, req.body.datatypes);

        if(contract)
            return res.status(200).json({message: "Contract successfully created", contract});
        else {
            throw new Error("Failed to create contract");
        }

    } catch (error) {
        
        return res.status(500).json({error: "server-error", details: error});

    }

}