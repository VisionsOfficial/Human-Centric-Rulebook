const axios = require('axios');

const auth = require("./../config/token");

// const ENDPOINT = "https://fdodmap3zh.execute-api.eu-central-1.amazonaws.com/test";
const ENDPOINT = "https://y5u9ap15bi.execute-api.us-east-1.amazonaws.com/test";

/**
* Gets a paginated list of contracts
*/
exports.getContracts = async (req, res, next) => {
    axios({
        method: 'GET',
        url: ENDPOINT + "/contracts",
        headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
    .then(data => {
        return res.status(data.status).json(data)
    })
    .catch(err => {
        return res.json(err)
    })
}

/**
* Uploads a client's signature
*/
exports.uploadClientSignature = async (req, res, next) => {
    
    const contractId = req.params.contractId;
    // [Required] a string representing a message to be signed
    const hash = req.body.hash;
    // [Required] a string representing a signature of the signed message
    const signature = req.body.signature;

    const token = auth.generateBlockchainToken(contractId, true);

    axios({
        method: 'POST',
        url: ENDPOINT + "/contracts/"+contractId+"/sign/client",
        data: {
            hash,
            signature,
        },
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': token,
        }
    })
    .then(data => {
        console.log(data.data);
        return res.status(data.status).json(data.data);
    })
    .catch(err => {
        console.log(err.response.data.errors);
        return res.status(400).json(err.response.data.errors);
    })
}

/**
* Uploads a provider's signature
*/
exports.uploadProviderSignature = async (req, res, next) => {

    const contractId = req.params.contractId;
    // [Required] a string representing a message to be signed
    const hash = req.body.hash;
    // [Required] a string representing a signature of the signed message
    const signature = req.body.signature;

    const token = auth.generateBlockchainToken(contractId, false);

    axios({
        method: 'POST',
        url: ENDPOINT + "/contracts/"+contractId+"/sign/provider",
        data: {
            hash,
            signature,
        },
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': token,
        }
    })
    .then(data => {
        console.log(data.data);
        return res.status(data.status).json(data.data);
    })
    .catch(err => {
        return res.json(err);
    })
}