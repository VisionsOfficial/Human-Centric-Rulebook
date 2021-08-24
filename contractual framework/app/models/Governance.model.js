const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    
    constitutiveAgreement: {
        type: Schema.ObjectId,
        ref: "ConstitutiveAgreement"
    },

    chair: {type: Schema.ObjectId, ref: "Service"},

    secretary: {type: Schema.ObjectId, ref: "Service"},

    representatives: [{type: Schema.ObjectId, ref: "Service"}],

    /**
     * Created at
     */
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Governance", schema);