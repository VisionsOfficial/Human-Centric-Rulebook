const Service = require("./../models/Service.model");
const Purpose = require("./../models/Purpose.model");
const DataSharingContract = require("./../models/DataSharingContract.model");
const DataType = require("../models/DataType.model");
const TermsOfUse = require("../models/TermsOfUse.model");

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

        const contract = await contracts.createDataSharingContract(req.body.serviceImportId, req.body.serviceExportId, req.body.purposeId, req.body.datatypes);

        if(contract != null) {

            let populatedContract = await DataSharingContract.findById(contract.id)
                .populate("serviceImport serviceExport")

            let populatedDatatypes = [];
            let populatedConditions = [];

            for (const ds of populatedContract.dataSharing) {
                for (const dt of ds.datatypes) {
                    const datatype = await DataType.findById(dt).select("name id");
                    populatedDatatypes.push(datatype);
                }
                ds.datatypes = populatedDatatypes;
                populatedDatatypes = [];

                for(const c of ds.conditions) {
                    const termsOfUse = await TermsOfUse.findById(c);
                    populatedConditions.push(termsOfUse);
                }
                ds.conditions = populatedConditions;
                populatedConditions = [];
            }

            return res.status(200).json({message: "Contract successfully created", contract, populatedContract});
        }
        else {
            throw new Error("Failed to create contract");
        }

    } catch (error) {
        
        return res.status(500).json({error: "server-error", details: error});

    }

}