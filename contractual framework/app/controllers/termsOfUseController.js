const Service = require("./../models/Service.model");
const DataType = require("./../models/DataType.model");
const Dataset = require("./../models/Dataset.model");
const TermsOfUse = require("./../models/TermsOfUse.model");

/**
* Get all terms of use of the service
*/
exports.all = async (req, res, next) => {

    try {

        const termsOfUse = await TermsOfUse.find({dataProvider: req.service});

        return res.status(200).json({termsOfUse});

    } catch (error) {

        return res.status(500).json({error: "server-error"});

    }
}

/**
* Get one terms of use
*/
exports.one = async (req, res, next) => {

    try {

        const termsOfUse = await TermsOfUse.findById(req.params.id);

        return res.status(200).json({termsOfUse});

    } catch (error) {

        return res.status(500).json({error: "server-error"});

    }
}

/**
* Creates terms of use
*/
exports.create = async (req, res, next) => {

    try {

        if(!req.body.name || req.body.name == "") {
            return res.status(400).json({error: true, message:"Terms of Use name missing from request body"});
        }

        let tou = new TermsOfUse();

        tou.dataProvider = req.service;

        tou.name = req.body.name || "";
        tou.restrictions = req.body.restrictions || "";
        tou.reporting = req.body.reporting || "";
        tou.audit = req.body.audit || "";
        tou.dataSecurity = req.body.dataSecurity || "";
        tou.dataProtection = req.body.dataProtection || "";
        tou.confidentialInformation = req.body.confidentialInformation || "";
        tou.intellectualPropertyRights = req.body.intellectualPropertyRights || "";
        tou.otherTerms = req.body.otherTerms || "";

        await tou.save();

        return res.status(200).json({message:"Successfully created Terms of Use", termsOfUse: tou});

    } catch (error) {
        return res.status(500).json({error: "internal-server-error"});
    }
}

/**
* Creates terms of use
*/
exports.update = async (req, res, next) => {

    try {

        if(!req.body.termsOfUseId) {
            return res.status(400).json({error: "missing-parameter-error", message: "Missing termsOfUseId from request body"});
        }

        let tou = await TermsOfUse.findById(req.body.termsOfUseId);

        if(!tou)
            return res.status(404).json({error: "not-found-error", message: "Terms of Use with this ID do not exist"});

        tou.name = req.body.name || tou.name;
        tou.restrictions = req.body.restrictions || tou.restrictions;
        tou.reporting = req.body.reporting || tou.reporting;
        tou.audit = req.body.audit || tou.audit;
        tou.dataSecurity = req.body.dataSecurity || tou.dataSecurity;
        tou.dataProtection = req.body.dataProtection || tou.dataProtection;
        tou.confidentialInformation = req.body.confidentialInformation || tou.confidentialInformation;
        tou.intellectualPropertyRights = req.body.intellectualPropertyRights || tou.intellectualPropertyRights;
        tou.otherTerms = req.body.otherTerms || tou.otherTerms;

        await tou.save();

        return res.status(200).json({message:"Successfully updated Terms of Use", termsOfUse: tou});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "internal-server-error"});
    }
}

/**
* Deletes a terms of use with the specified id
*/
exports.delete = async (req, res, next) => {
    try {
        if(req.body.termsOfUseId) {
            const datasets = await Dataset.find({termsOfUse: req.body.termsOfUseId});

            if(datasets.length == 0) {
                await TermsOfUse.findByIdAndRemove(req.body.termsOfUseId);
                return res.status(200).json({message:"Successfully deleted termsOfUse"});
            } else {
                return res.status(400).json({message:"Could not delete terms of use as it is linked to datasets"});
            }
        } else {
            return res.status(400).json({error: "missing-parameter-error", message:"Missing termsOfUseId from request body"});
        }

    } catch (error) {

        return res.status(500).json({error: "internal-server-error"});

    }
}