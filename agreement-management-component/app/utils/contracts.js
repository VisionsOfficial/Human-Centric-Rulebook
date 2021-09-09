const Service = require("./../models/Service.model");
const Purpose = require("./../models/Purpose.model");
const DataType = require("./../models/DataType.model");
const Dataset = require("./../models/Dataset.model");
const TermsOfUse = require("./../models/TermsOfUse.model");
const DataSharingContract = require("./../models/DataSharingContract.model");

module.exports = {

    /**
     * Creates a data sharing contract between 2 services
     * 
     * @param {string} serviceImportId The id of the service Import
     * @param {string} serviceExportId The id of the service Export
     * @param {string} purposeId The id of the purpose to add to the contract
     * @param {string[]} datatypes An array of datatype IDs
     * @returns {DataSharingContract} The created or updated contract
     */
    createDataSharingContract: async (serviceImportId, serviceExportId, purposeId, datatypes) => {
        try {

            // const serviceImport = await Service.findById(serviceImportId);
            // const serviceExport = await Service.findById(serviceExportId);
            const purpose = await Purpose.findById(purposeId);
        
            // Check for existing data sharing contract
            const existingContract = await DataSharingContract.findOne({$and: [
                {"serviceImport": serviceImportId},
                {"serviceExport": serviceExportId}
            ]});
        
            if(existingContract) {
            
                let index = existingContract.dataSharing.findIndex(el => el.purpose.id == purposeId);
        
                if(index > -1) {

                    // Replace with new datatypes or remove the purpose / datatype object if no datatypes are authorized
                    if(datatypes.length > 0) {
                        existingContract.dataSharing[index].datatypes = datatypes;
                    } else {
                        existingContract.dataSharing.splice(index, 1);
                    }

                    for (const datatype of datatypes) {
                        const dt = await DataType.findById(datatype);

                        if(!dt)
                            continue;
                        
                        let dataset = await Dataset.findOne({datatypes: dt.id});

                        if(dataset) {
                            if(!existingContract.dataSharing[index].termsOfUse.includes(dataset.termsOfUse.toString())) {
                                existingContract.dataSharing[index].termsOfUse.push(dataset.termsOfUse.toString());
                            }
                        }
                    }

                } else {

                    // Add new purpose / datatypes object

                    let newDataSharing = {};
                    newDataSharing.purpose = {id: purposeId, name: purpose.name};
                    newDataSharing.datatypes = datatypes;
                    newDataSharing.termsOfUse = []

                    for (const datatype of datatypes) {
                        const dt = await DataType.findById(datatype);

                        if(!dt)
                            continue;
                        
                        let dataset = await Dataset.findOne({datatypes: dt.id});

                        if(dataset) {
                            if(!newDataSharing.termsOfUse.includes(dataset.termsOfUse.toString())) {
                                newDataSharing.termsOfUse.push(dataset.termsOfUse.toString());
                            }
                        }
                    }

                    existingContract.dataSharing.push(newDataSharing);
                }
        
                await existingContract.save();

                return existingContract;
        
            } else {

                // Create contract
                let contract = new DataSharingContract();
            
                // contract.serviceImport = toContract(serviceImport);
                // contract.serviceExport = toContract(serviceExport);
                contract.serviceImport = serviceImportId;
                contract.serviceExport = serviceExportId;
        
                let newDataSharing = {};
                newDataSharing.purpose = {id: purposeId, name: purpose.name};
                newDataSharing.datatypes = datatypes;
                newDataSharing.termsOfUse = []

                for (const datatype of datatypes) {
                    const dt = await DataType.findById(datatype);

                    if(!dt)
                        continue;
                    
                    let dataset = await Dataset.findOne({datatypes: dt.id});

                    if(dataset) {
                        if(!newDataSharing.termsOfUse.includes(dataset.termsOfUse.toString())) {
                            newDataSharing.termsOfUse.push(dataset.termsOfUse.toString());
                        }
                    }
                }

                contract.dataSharing = [newDataSharing];
            
                await contract.save();

                return contract;
            }
            
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    /**
     * Transforms a service model document into an object that contains only necessary information for the contract
     * @param {Service} service service to adapt
     * @returns {object} The transformed service object
     */
    toContract: (service) => {
        return {
            id: service.id,
            name: service.name,
            logo: service.logo,
            governance: service.governance,
            endpoints: service.endpoints,
        }
    },

    /**
     * Populates a contract with necessary information to show on the frontend
     * @param {string} contractId The contract ID
     * @returns The populated contract
     */
    populateContract: async (contractId) => {
        let populatedContract = await DataSharingContract.findById(contractId)
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

            for(const c of ds.termsOfUse) {
                const termsOfUse = await TermsOfUse.findById(c);
                populatedConditions.push(termsOfUse);
            }
            ds.termsOfUse = populatedConditions;
            populatedConditions = [];
        }

        return populatedContract;
    }
}