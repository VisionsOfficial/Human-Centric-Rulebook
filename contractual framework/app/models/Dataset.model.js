const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    /**
     * Data provider
     */
    dataProvider: {type: Schema.ObjectId, ref: "Service"},

    /**
     * Datatypes
     */
    datatypes: [{
        /**
         * Data
         */
        datatype: {type: Schema.ObjectId, ref: "DataType"},
        /**
         * Lcation of the data
         */
        location: {type: Schema.ObjectId, ref: "Service"},
        /**
         * Method of distribution
         */
        distribution: String,
    }],


    /**
     * Description
     */
    description: String,

    /**
     * Reference to the terms of use of this dataset
     */
    termsOfUse: {type: Schema.ObjectId, ref: "TermsOfUse"},

    /**
     * Created at
     */
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Dataset", schema);