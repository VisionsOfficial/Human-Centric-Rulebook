const DataType = require("./../models/DataType.model");
const Purpose = require("./../models/Purpose.model");
const DataSharingContract = require("./../models/DataSharingContract.model");
const Service = require("./../models/Service.model");
const Dataset = require("./../models/Dataset.model");
const TermsOfUse = require("./../models/TermsOfUse.model");

exports.home = async (req, res, next) => {
    res.render("home");
}

/**
 * Renders the contract signing example view
 */
exports.signContract = async (req, res, next) => {

    const contracts = await DataSharingContract.find()
        .populate("serviceImport serviceExport");


    let populatedContracts = []

    let populatedDatatypes = [];
    let populatedConditions = [];

    for (const c of contracts) {
        
        for (const ds of c.dataSharing) {

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

        populatedContracts.push(c)
    }

    res.render("contract-signing", {contracts: populatedContracts})

}

/**
 * Renders the contract generation example view
 */
exports.generateContract = async (req, res, next) => {

    const serviceImport = await Service.findById("611e2d860fa82d2938d3c7bb")
        .select("name id governance purposes");
    const serviceExport = await Service.findById("611e2d6d0fa82d2938d3c7b8")
        .select("name id governance");;

    const purpose = await Purpose.findById(serviceImport.purposes[0])
        .select("name id description");

    const datatypes = await DataType.find({provenance: serviceExport.id})
        .select("name id description");

    const purposes = [purpose]

    res.render("contract-generation", {
        serviceImport,
        serviceExport,
        purposes,
        datatypes
    });
}

/**
 * Renders the contract as text example view
 */
exports.viewContractAsText = async (req, res, next) => {

    const contract = await DataSharingContract.findById(req.params.contractId)
        .populate("serviceImport serviceExport");

    let populatedDatatypes = [];
    let populatedConditions = [];

    for (const ds of contract.dataSharing) {

        for (const dt of ds.datatypes) {

            const datatype = await DataType.findById(dt).select("name id description");
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

    res.render("contract-text", {contract})

}