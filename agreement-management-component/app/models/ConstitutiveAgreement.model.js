const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    operator: {
        type: Schema.ObjectId,
        ref: "Service"
    },

    qualifiedMajority: [{
        type: Schema.ObjectId,
        ref: "Service"
    }],

    representatives: [{
        type: Schema.ObjectId,
        ref: "Service"
    }],

    secretary: {
        type: Schema.ObjectId,
        ref: "Service"
    },

    /**
     * Reference to the dataNetwork
     */
    dataNetwork: {type: Schema.ObjectId, ref: "DataNetwork"},

    /**
     * List of founding members of the data network
     */
    parties: [{type: Schema.ObjectId, ref: "Service"}],

    /**
     * The goal of the establishment of the Data Network
     */
    backgroundAndPurpose: String,

    /**
     * Description of the data network
     */
    dataNetworkDescription: String,

    /**
     * General terms and conditions
     */
    termsAndConditions: String,

    /**
     * List of members and Contact details
     */
    members: [{type: Schema.ObjectId, ref: "Service"}],

    /**
     * Governance Model
     */
    governanceModel: {type: Schema.ObjectId, ref: "GovernanceModel"},

    /**
     * Termination and validity
     */
    terminationAndValidity : {
        effectiveDate: { type: Date, default: Date.now},
        terminationPeriod: Date,
    },

    /**
     * Limitation of Liability
     */
    limitationOfLiability: {
        annualTotalLiability: Number,
        aggregateFees: Number
    },
     
    /**
     * Counterparts
     */
    counterParts: {
        /**
         * Number of identical counterparts executed
         * one for each party and one for the steering committee
         */
        executions: Number,

        /**
         * Where the contract was created
         */
        in: String,

        /**
         * When the contract was created
         */
        on: {type: Date, default: Date.now}
    },

    /**
     * Created at
     */
     createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("ConstitutiveAgreement", schema);
