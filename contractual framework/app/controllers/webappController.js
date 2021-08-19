const DataType = require("./../models/DataType.model");
const Purpose = require("./../models/Purpose.model");
const DataSharingContract = require("./../models/DataSharingContract.model");
// const Service = require("./../models/Service.model");
// const Dataset = require("./../models/Dataset.model");
// const TermsOfUse = require("./../models/TermsOfUse.model");

exports.home = async (req, res, next) => {
    res.render("home");
}

exports.signContract = async (req, res, next) => {

    let contracts = [];

    const sampleDatatype = new DataType({
        name: "Name",
        description: "The name of the user"
    });

    const samplePurpose = new Purpose();
    samplePurpose.name = "Find a job";
    samplePurpose.description = "Process data to help you find a job.";

    const sampleContract = {
        id: "sampleContractId001",
        serviceImport: {
            name: "Import service name",
            governance: {
                registration: "Registration info (Import)",
                registeredOfficeAddress: "Registered address info (Import)",
                legalRepresentative: {
                    name: "Legal representative name (Import)",
                    email: "Legal representative email (Import)",
                    profession: "Legal representative profession (Import)",
                },
                dataProtectionOfficer: {
                    name: "Data protection officer name (Import)",
                    email: "Data protection officer email (Import)",
                }
            }
        },
        serviceExport: {
            name: "Export service name",
            governance: {
                registration: "Registration info (Export)",
                registeredOfficeAddress: "Registered address info (Export)",
                legalRepresentative: {
                    name: "Legal representative name (Export)",
                    email: "Legal representative email (Export)",
                    profession: "Legal representative profession (Export)",
                },
                dataProtectionOfficer: {
                    name: "Data protection officer name (Export)",
                    email: "Data protection officer email (Export)",
                }
            }
        },
        dataSharing: [{
            datatypes: [sampleDatatype],
            purpose: samplePurpose
        }],
    };

    contracts.push(sampleContract);

    res.render("contract-signing", {contracts})

}

exports.generateContract = async (req, res, next) => {
    let purposes = [];

    const samplePurpose = {
        id: "purposeId1",
        name: "Sample purpose name",
        datatypes: [
            {
                name: "Sample datatype name 1",
                id: "datatypeId1"
            },
            {
                name: "Sample datatype name 2",
                id: "datatypeId2"
            }
        ]
    }

    purposes.push(samplePurpose);

    res.render("contract-generation", {
        purposes,
        serviceImport: "Import service name",
        serviceExport: "Export service name",
        serviceImportId: "importServiceId",
        serviceExportId: "exportServiceId",
    });
}