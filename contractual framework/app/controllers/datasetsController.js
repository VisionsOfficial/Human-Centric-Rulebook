const Service = require("./../models/Service.model");
const DataType = require("./../models/DataType.model");
const Dataset = require("./../models/Dataset.model");
const TermsOfUse = require("./../models/TermsOfUse.model");

/**
 * Returns all Datasets of the service
 */
exports.all = async (req, res, next) => {

    try {

        const datasets = await Dataset.find({dataProvider: req.service});

        if(datasets)
            return res.status(200).json({datasets});

    } catch (error) {
        
        return res.status(500).json({error: "server-error"});

    }
}

/**
 * Creates a dataset for the service
 */
exports.create = async (req, res, next) => {

    try {
        let errors = [];
        
        const service = await Service.findById(req.service);

        const datatypes = req.body.datatypes;
    
        let dataset = new Dataset();
    
        dataset.dataProvider = service.id;
        dataset.termsOfUse = req.body.termsOfUse;
        dataset.description = req.body.description;
        dataset.datatypes = [];

        for(let dt of datatypes) {
            const datatype = await DataType.findById(dt);

            if(datatype) {
                dataset.datatypes.push({
                    datatype: dt,
                    location: service.id,
                    distribution: "",
                })
            } else {
                errors.push('Could not add DataType : ' + dt + ' as it does not exist.')
            }
        }
    
        await dataset.save();
    
        return res.status(200).json({
            message: "Dataset successfully created",
            dataset: dataset,
            errors: errors.length > 0 ? errors : "",
        });

    } catch (error) {
        
        return res.status(500).json({error: "server-error"});

    }

}

/**
* Deletes a dataset with the specified id
*/
exports.delete = async (req, res, next) => {
    try {
        await Dataset.findByIdAndRemove(req.body.datasetId);
        return res.status(201).json({success: "Dataset successfully deleted"});
    } catch (error) {
        return res.status(500).json({error: "server-error"});
    }
}

/**
* Updates a dataset. If a terms of use id is specified, only changes the reference terms of use.
*/
exports.update = async (req, res, next) => {
    const dataset = await Dataset.findById(req.body.datasetId);

    if(req.body.termsOfUseId) {
        const tou = await TermsOfUse.findById(req.body.termsOfUseId);

        if(!tou)
            return res.status(404).json({error: "not-found-error", message: "The terms of use with this id do not exist."});

        dataset.termsOfUse = req.body.termsOfUseId;

        await dataset.save();

        return res.status(200).json({message:"Successfully updated dataset"});
    }

    return res.status(200).json({success: true, message:"DATASET DATATYPES AND DESCRIPTION UPDATE TBD"});
}