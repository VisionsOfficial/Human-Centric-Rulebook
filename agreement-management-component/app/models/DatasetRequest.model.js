const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema(
	{
		/**
		 * Owner of the dataset
		 */
		dataProvider: { type: Schema.ObjectId, ref: "Service" },

		/**
		 * Service making the request
		 */
		dataUser: { type: Schema.ObjectId, ref: "Service" },

		/**
		 * Dataset on which the request is made
		 */
		dataset: { type: Schema.ObjectId, ref: "Dataset" },

		/**
		 * Purpose for which the request is made
		 */
		purpose: { type: Schema.ObjectId, ref: "Purpose" },

		/**
		 * Authorized by the dataProvider
		 */
		authorized: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("DatasetRequest", schema);
