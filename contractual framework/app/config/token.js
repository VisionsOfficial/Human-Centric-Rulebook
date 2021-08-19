const jwt = require("jsonwebtoken");

module.exports = {
    /**
     * Access token for authentication to the API
     * @param {string} serviceKey The service key of the service
     * @param {string} secretKey The secret key of the service
     * @returns {string} The JWT
     */
    generateToken: (serviceKey, secretKey) => {
        let token = jwt.sign(
            {
              serviceKey: serviceKey,
            },
            secretKey,
            { expiresIn: 10 * 60 }
        );
        return token;
    },

    /**
     * Generates a token for blockchain API
     * @param {string} id The unique contract id
     * @param {boolean} isClient If generating for client or provider
     * @returns {string} The JWT
     */
    generateBlockchainToken: (id, isClient) => {
        const secret = process.env.BLOCKCHAIN_API_SECRET;

        const address = isClient ? process.env.ETHEREUM_WALLET_ADDRESS_CLIENT : process.env.ETHEREUM_WALLET_ADDRESS_PROVIDER
    
        const token = jwt.sign(
            {
                address: address, // The ethereum wallet address of the user
                id: id,
            },
            secret,
            {
                subject: 'auth' 
            }
        );
    
        return token;
    }
}