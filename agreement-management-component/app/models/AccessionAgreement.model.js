const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({

    /**
     * Reference to the constitutiveAgreement (data network)
     */
    constitutiveAgreement: {type: Schema.ObjectId, ref: "ConstitutiveAgreement"},

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
    governanceModel: String,

    /**
     * Code of conduct
     */
    codeOfConduct: String,

    /**
     * When the constitutive agreement was signed
     */
    signedOn: {
        type: Date,
        default: Date.now
    },

    /**
     * Counterparts
     */
    counterParts: {
        /**
         * Number of identical counterparts executed
         * one for each party/acceeding party and one for the steering committee
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
    }
});

module.exports = mongoose.model("AccessionAgreement", schema);
