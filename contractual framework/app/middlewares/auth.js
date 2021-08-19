const jwt = require("jsonwebtoken");
const Service = require("./../models/Service.model");

module.exports = {
    /**
     * Using Bearer Auth with JWT
     */
    authenticateService: async (req, res, next) => {
        const authorization = req.header("authorization");

        if(!authorization)
            return res.status(401).json({
                error: "authorization-error", 
                message: "Access denied. No authorization token header found."
            });

        const token = authorization.split(' ')[1];
        let data = token.split(".");

        if(data.length < 3) {
            return res.status(401).json({
                error: "authorization-error", 
                message: `${token} is not a valid authorization token.`
            });
        }

        const buff = Buffer.from(data[1], "base64");
        
        data = JSON.parse(buff.toString());

        if(!data.serviceKey) {
            return res.status(401).json({
                error: "authorization-error", 
                message:"No service key found in token."
            });
        }

        const serviceKey = data.serviceKey;

        const service = await Service.findOne({ serviceKey });

        if(!service)
            return res.status(404).json({
                error: "notfound-error", 
                message: "The serviceKey does not match any existing Service"
            });
        
        try {
            const decoded = jwt.verify(token, service.serviceSecretKey);

            if(!decoded)
                return res.status(401).json({
                    error: "token-decode-error", 
                    message: "Unauthorized resource"
                });
            
            req.serviceKey = serviceKey;
            req.service = service.id;
            return next();
        } catch (err) {
            return res.status(401).json({
                error: err, 
                message: "Unauthorized resource"
            });
        }
    },
}