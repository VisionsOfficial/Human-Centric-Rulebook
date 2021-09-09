const DataSharingContractModel = require("../models/DataSharingContract.model");
const contracts = require("./../utils/contracts");

exports.all = async (req, res, next) => {
    try {
        
        const dataSharingContracts = await DataSharingContractModel.find({$or: [
            {serviceImport: req.service},
            {serviceExport: req.service}
        ]});

        let result = {
            dataProvider: [],
            dataUser: [],
        }

        for (const contract of dataSharingContracts) {
            if(contract.serviceImport == req.service) {
                result.dataUser.push(contract);
            } else {
                result.dataProvider.push(contract);
            }
        }

        return res.status(200).json({result});

    } catch (error) {
        return res.status(500).json({error: "internal-server-error"});
    }
}

exports.one = async (req, res, next) => {
    try {

        const populateQuery = [
            {path: "serviceImport", select: "name"},
            {path: "serviceExport", select: "name"},
            {path: "dataSharing.datatypes", select: "name"},
            {path: "dataSharing.termsOfUse"}
        ]
        
        const contract = await DataSharingContractModel.findById(req.params.contractId)
            .populate(populateQuery);

        if(contract) {
            return res.status(200).json({contract});
        } else {
            return res.status(404).json({error: "not-found-error", message: "Contract not found"});
        }

    } catch (error) {
        return res.status(500).json({error: "internal-server-error"});
    }
}

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

        const contract = await contracts.createDataSharingContract(req.body.serviceImportId, req.body.serviceExportId, req.body.purposeId, req.body.datatypes);

        if(contract != null) {

            let populatedContract = await contracts.populateContract(contract.id);

            return res.status(200).json({message: "Contract successfully created", contract, populatedContract});
        }
        else {
            throw new Error("Failed to create contract");
        }

    } catch (error) {
        
        return res.status(500).json({error: "server-error", details: error});

    }

}



// * UNUSED. KEPT FOR REFERENCE
/**
exports.sign = async (req, res, next) => {
    try {

        if(!req.body.ethereumWalletAddress)
            return res.status(400).json({error: "missing-parameter-error", message: "Missing ethereumWalletAddress from request body"});
        if(!req.body.contractId)
            return res.status(400).json({error: "missing-parameter-error", message: "Missing contractId from request body"});

        const eth = req.body.ethereumWalletAddress;
        const contractId = req.body.contractId;

        const contract = await DataSharingContractModel.findById(contractId);

        let isProvider = false;

        if(contract.serviceExport == req.service) {
            isProvider = true;
        } else if(contract.serviceImport == req.service) {
            isProvider = false;
        } else {
            return res.status(401).json({error: "unauthorized-ressource-error", message: "The contract you are trying to access does not seem to belong to your service."});
        }

        const endpoint = `https://y5u9ap15bi.execute-api.us-east-1.amazonaws.com/test/contracts/${contractId}/sign`;
        const url = isProvider ? `${endpoint}/provider` : `${endpoint}/client`;
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({error: "internal-server-error"});
    }
} */