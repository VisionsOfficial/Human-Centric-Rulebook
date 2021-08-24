const Service = require("./../models/Service.model");

exports.getServiceInfo = async (req, res, next) => {
    try {
        const service = await Service.findById(req.service);
        return res.status(200).json({service});
    } catch (err) {
        return res.status(500).json({error: "internal-server-error", details: err});
    }
}

/**
 * Registers a new service
 */
exports.register = async (req, res, next) => {
    const { serviceName, password } = req.body;

    if(!serviceName || !password)
        return res.status(400).json({
            error: "missing-parameter-error", 
            message: "Missing body parameter."
        });

    const existingService = await Service.findOne({name: serviceName});

    if(existingService)
        return res.status(400).json({
            error: "existing-service-error", 
            message: "This service already exists."
        });

    let service = new Service();

    service.name = serviceName;
    service.password = service.generateHash(password);

    service.serviceKey = generateId();
    service.serviceSecretKey = generateId(15);

    await service.save();

    return res.status(201).json({
        message: "Service successfully created. Please save the serviceKey and serviceSecretKey for authentication to the API.",
        serviceKey: service.serviceKey,
        serviceSecretKey: service.serviceSecretKey,
    });
}

function generateId(length = 100) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}