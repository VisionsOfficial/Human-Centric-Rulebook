const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({

    /**
     * Service acting as data user
     */
    serviceImport: {type: Schema.ObjectId, ref: "Service"},

    /**
     * Service acting as data provider
     */
    serviceExport: {type: Schema.ObjectId, ref: "Service"},

    /**
     * Constitutive Agreement
     */
    constitutiveAgreement: {type: Schema.ObjectId, ref: "ConstitutiveAgreement"},

    /**
     * Accession Agreement
     */
    accessionAgreement: {type: Schema.ObjectId, ref: "AccessionAgreement"},

    /**
     * Specifications of the data and conditions involved in this contract
     */
    dataSharing: [{
        purpose: {
            id: {type: Schema.ObjectId, ref: "Purpose"},
            name: String
        },
        datatypes: [{type: Schema.ObjectId, ref: "DataType"}],
        processor: {type: Schema.ObjectId, ref: "Service"},
        conditions: [{type: Schema.ObjectId, ref: "TermsOfUse"}],
    }],

    /**
     * Created at
     */
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("DataSharingContract", schema);