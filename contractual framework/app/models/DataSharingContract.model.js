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
    }]
});

module.exports = mongoose.model("DataSharingContract", schema);