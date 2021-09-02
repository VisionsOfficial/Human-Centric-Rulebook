const axios = require("axios");

const auth = require("../config/token");
const DataSharingContractModel = require("../models/DataSharingContract.model");

// const ENDPOINT = "https://fdodmap3zh.execute-api.eu-central-1.amazonaws.com/test";
const ENDPOINT = "https://y5u9ap15bi.execute-api.us-east-1.amazonaws.com/test";

/**
 * Gets a paginated list of contracts
 */
exports.getContracts = async (req, res, next) => {
	axios({
		method: "GET",
		url: ENDPOINT + "/contracts",
		headers: { "Content-Type": "application/json; charset=utf-8" },
	})
		.then((data) => {
			return res.status(data.status).json(data);
		})
		.catch((err) => {
			return res.json(err);
		});
};

/**
 * Uploads a client's signature
 */
exports.uploadClientSignature = async (req, res, next) => {
	const contractId = req.params.contractId;
	// [Required] a string representing a message to be signed
	const hash = req.body.hash;
	// [Required] a string representing a signature of the signed message
	const signature = req.body.signature;
	// Ethereum wallet address of the signing party
	const address = req.body.address;

	const token = auth.generateBlockchainToken(address, contractId, true);

	const contract = await DataSharingContractModel.findById(contractId);

	if (!contract) {
		return res
			.status(404)
			.json({ error: "not-found-error", message: "Contract ID not found" });
	}

	axios({
		method: "POST",
		url: ENDPOINT + "/contracts/" + contractId + "/sign/client",
		data: {
			hash,
			signature,
		},
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			Authorization: token,
		},
	})
		.then(async (response) => {
			console.log(response.data);

			// Update DSA with user signature
			contract.dataUserSignature = {
				signed: true,
				timestamp: Date.now(),
			};

			await contract.save();

			console.log(contract);

			return res.status(200).json({
				blokchainResponse: response.data,
				message: "Data user signature successfully saved.",
				contract: contract,
			});
		})
		.catch((err) => {
			console.log(err.response.data.errors);
			return res.status(400).json(err.response.data.errors);
		});
};

/**
 * Uploads a provider's signature
 */
exports.uploadProviderSignature = async (req, res, next) => {
	const contractId = req.params.contractId;
	// [Required] a string representing a message to be signed
	const hash = req.body.hash;
	// [Required] a string representing a signature of the signed message
	const signature = req.body.signature;
	// Ethereum wallet address of the signing party
	const address = req.body.address;

	const contract = await DataSharingContractModel.findById(contractId);

	if (!contract) {
		return res
			.status(404)
			.json({ error: "not-found-error", message: "Contract ID not found" });
	}

	const token = auth.generateBlockchainToken(address, contractId, false);

	axios({
		method: "POST",
		url: ENDPOINT + "/contracts/" + contractId + "/sign/provider",
		data: {
			hash,
			signature,
		},
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			Authorization: token,
		},
	})
		.then(async (response) => {
			console.log(response.data);

			// Update DSA with provider signature
			contract.dataProviderSignature = {
				signed: true,
				timestamp: Date.now(),
			};

			await contract.save();

			console.log(contract);

			return res.status(200).json({
				blokchainResponse: response.data,
				message: "Data provider signature successfully saved.",
				contract: contract,
			});
		})
		.catch((err) => {
			return res.json(err);
		});
};

exports.verify = async (req, res, next) => {
	try {
		const contractId = req.body.contractId;

		// const token = auth.generateBlockchainToken(address, contractId, false);

		axios({
			method: "GET",
			url: ENDPOINT + "/contracts/" + contractId + "/verify",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		})
			.then((response) => {
				console.log(response.data.data);
				return res.status(response.status).json(response.data);
			})
			.catch((err) => {
				return res.json(err);
			});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "internal-server-error" });
	}
};