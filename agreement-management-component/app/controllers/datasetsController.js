const Service = require("./../models/Service.model");
const DataType = require("./../models/DataType.model");
const Purpose = require("./../models/Purpose.model");
const Dataset = require("./../models/Dataset.model");
const TermsOfUse = require("./../models/TermsOfUse.model");
const DatasetRequestModel = require("../models/DatasetRequest.model");

/**
 * Returns all Datasets of the service
 */
exports.all = async (req, res, next) => {
	try {
		const datasets = await Dataset.find({ dataProvider: req.service });

		if (datasets) return res.status(200).json({ datasets });
	} catch (error) {
		return res.status(500).json({ error: "server-error" });
	}
};

/**
 * Returns all Datasets of the service
 */
exports.one = async (req, res, next) => {
	try {
		const dataset = await Dataset.findById(req.params.id);

		if (dataset) return res.status(200).json({ dataset });
	} catch (error) {
		return res.status(500).json({ error: "server-error" });
	}
};

/**
 * Creates a dataset for the service
 */
exports.create = async (req, res, next) => {
	try {
		let errors = [];

		if (
			!req.body.datatypes ||
			(req.body.datatypes && req.body.datatypes.length == 0)
		)
			return res.status(400).json({
				error: "missing-parameter-error",
				message: "datatypes missing from request body",
			});

		const datatypes = req.body.datatypes;

		let dataset = new Dataset();

		if (!req.body.termsOfUse)
			return res.status(400).json({
				error: "missing-parameter-error",
				message: "Missing termsOfUse from request body.",
			});

		dataset.dataProvider = req.service;
		dataset.termsOfUse = req.body.termsOfUse;
		dataset.description = req.body.description || "";
		dataset.datatypes = [];

		for (let dt of datatypes) {
			const datatype = await DataType.findById(dt);

			if (datatype) {
				dataset.datatypes.push(dt);
			} else {
				errors.push(
					"Could not add DataType : " + dt + " as it does not exist."
				);
			}
		}

		await dataset.save();

		return res.status(200).json({
			message: "Dataset successfully created",
			dataset: dataset,
			errors: errors.length > 0 ? errors : "",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "server-error" });
	}
};

/**
 * Deletes a dataset with the specified id
 */
exports.delete = async (req, res, next) => {
	try {
		await Dataset.findByIdAndRemove(req.body.datasetId);
		return res.status(201).json({ success: "Dataset successfully deleted" });
	} catch (error) {
		return res.status(500).json({ error: "server-error" });
	}
};

/**
 * Updates a dataset. If a terms of use id is specified, only changes the reference terms of use.
 */
exports.update = async (req, res, next) => {
	try {
		let errors = [];

		const dataset = await Dataset.findById(req.body.datasetId);

		if (req.body.termsOfUseId) {
			const tou = await TermsOfUse.findById(req.body.termsOfUseId);

			if (!tou)
				return res.status(404).json({
					error: "not-found-error",
					message: "The terms of use with this id do not exist.",
				});

			dataset.termsOfUse = req.body.termsOfUseId;
		}

		if (req.body.datatypes && req.body.datatypes.length > 0) {
			const datatypes = req.body.datatypes;

			for (let dt of datatypes) {
				const datatype = await DataType.findById(dt);

				if (datatype) {
					dataset.datatypes.push({
						datatype: dt,
						location: service.id,
						distribution: "",
					});
				} else {
					errors.push(
						"Could not add DataType : " + dt + " as it does not exist."
					);
				}
			}
		}

		if (req.body.description && req.body.description != "")
			dataset.description = req.body.description;

		await dataset.save();

		if (errors.length > 0) {
			return res.status(400).json({ errors: errors });
		}

		return res
			.status(200)
			.json({ message: "Successfully updated dataset", dataset });
	} catch (error) {
		return res.status(500).json({ error: "internal-server-error" });
	}
};

/**
 * Requests access to a services Dataset
 */
exports.request = async (req, res, next) => {
	try {
		if (!req.body.purpose) {
			return res.status(400).json({
				error: "missing-param-error",
				message: "Mising purpose from request body",
			});
		}

		const dataset = await Dataset.findById(req.params.datasetId);
		if (!dataset) {
			return res
				.status(404)
				.json({ error: "not-found-error", message: "Dataset ID not found" });
		}

		if (dataset.dataProvider == req.service) {
			return res.status(400).json({
				error: "bad-request-error",
				message: "Cannot make a request for your own dataset",
			});
		}

		const purpose = await Purpose.findById(req.body.purpose);
		if (!purpose) {
			return res
				.status(404)
				.json({ error: "not-found-error", message: "Purpose ID not found" });
		}

		let exists = await DatasetRequestModel.findOne({
			dataset: dataset.id,
			purpose: purpose.id,
			dataUser: req.service,
		});

		if (exists) {
			return res.status(400).json({
				message: "A request already exists for this dataset.",
				request: exists,
			});
		}

		let datasetRequest = new DatasetRequestModel();
		datasetRequest.dataProvider = dataset.dataProvider;
		datasetRequest.dataUser = req.service;
		datasetRequest.purpose = purpose.id;
		datasetRequest.dataset = dataset.id;

		console.log(req.service);

		await datasetRequest.save();

		return res.status(200).json({
			message: "Successfully created dataset request",
			request: datasetRequest,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({ error: "internal-server-error" });
	}
};

/**
 * Get all incoming dataset requests
 */
exports.incoming = async (req, res, next) => {
	try {
		const requests = await DatasetRequestModel.find({
			dataProvider: req.service,
		});

		return res.status(200).json({ requests });
	} catch (error) {
		return res.status(500).json({ error: "internal-server-error" });
	}
};

/**
 * Get all outgoing dataset requests
 */
exports.outgoing = async (req, res, next) => {
	try {
		const requests = await DatasetRequestModel.find({
			dataUser: req.service,
		});

		return res.status(200).json({ requests });
	} catch (error) {
		return res.status(500).json({ error: "internal-server-error" });
	}
};

/**
 * Get info on one dataset request
 */
exports.oneRequest = async (req, res, next) => {
	try {
		const populateQuery = [
			{ path: "dataProvider", select: "name" },
			{ path: "dataUser", select: "name" },
			{ path: "purpose", select: "name" },
		];

		const request = await DatasetRequestModel.findById(
			req.params.requestId
		).populate(populateQuery);

		if (!request)
			return res
				.status(404)
				.json({ error: "not-found-error", message: "Request ID not found" });

		return res.status(200).json({ request });
	} catch (error) {
		return res.status(500).json({ error: "internal-server-error" });
	}
};

/**
 * Authorize a dataset request
 */
exports.authorize = async (req, res, next) => {
	try {
		const request = await DatasetRequestModel.findById(req.params.requestId);

		if (!request)
			return res.status(404).json({
				error: "not-found-error",
				message: "Request ID not found",
			});

		if (request.dataProvider != req.service)
			return res.status(403).json({
				error: "forbidden-error",
				message:
					"Cannot authorize this dataset request as you are not the owner.",
			});

		request.authorized = true;

		await request.save();

		return res.status(200).json({
			message: "Successfully authorized the dataset request.",
			request,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({ error: "internal-server-error" });
	}
};