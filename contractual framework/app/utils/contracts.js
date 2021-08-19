const Service = require("./../models/Service.model");
const Purpose = require("./../models/Purpose.model");
const DataSharingContract = require("./../models/DataSharingContract.model");

module.exports = {

    /**
     * Creates a data sharing contract between 2 services
     * 
     * @param {string} serviceImportId The id of the service Import
     * @param {string} serviceExportId The id of the service Export
     * @param {string} purposeId The id of the purpose to add to the contract
     * @param {array} datatypes An array of datatype names
     * @returns {DataSharingContract} The created or updated contract
     */
    createDataSharingContract: async (serviceImportId, serviceExportId, purposeId, datatypes) => {
        const serviceImport = await Service.findById(serviceImportId);
        const serviceExport = await Service.findById(serviceExportId);
        const purpose = await Purpose.findById(purposeId);
      
        // Check for existing data sharing contract
        const existingContract = await DataSharingContract.findOne({$and: [
            {"serviceImport.id": serviceImportId},
            {"serviceExport.id": serviceExportId}
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

            } else {

                // Add new purpose / datatypes object
                existingContract.dataSharing.push({
                    purpose: {
                        id: purposeId,
                        name: purpose.name
                    }, 
                    datatypes: datatypes
                });
            }
      
            await existingContract.save();

            return contract;
      
        } else {

            // Create contract
            let contract = new DataSharingContract();
        
            contract.serviceImport = toContract(serviceImport);
            contract.serviceExport = toContract(serviceExport);
    
            contract.dataSharing = [{
                purpose: {
                    id: purposeId,
                    name: purpose.name
                },
                datatypes: datatypes,
            }];
        
            await contract.save();

            return contract;
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
    }
}