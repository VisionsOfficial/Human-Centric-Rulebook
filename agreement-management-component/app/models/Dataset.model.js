const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
	/**
	 * URI for the asset collection (ODRL)
	 */
	uid: String,

	/**
	 * Data provider
	 */
	dataProvider: { type: Schema.ObjectId, ref: "Service" },

	/**
	 * Datatypes
	 */
	datatypes: [{ type: Schema.ObjectId, ref: "DataType" }],

	/**
	 * Description
	 */
	description: String,

	/**
	 * Reference to the terms of use of this dataset
	 */
	termsOfUse: { type: Schema.ObjectId, ref: "TermsOfUse" },

	/**
	 * Created at
	 */
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Dataset", schema);