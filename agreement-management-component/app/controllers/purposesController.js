const DataType = require("./../models/DataType.model");
const Purpose = require("./../models/Purpose.model");
const Service = require("./../models/Service.model");

exports.all = async (req, res, next) => {
    try {
        const purposes = await Purpose.find({service: req.service});

        return res.status(200).json({purposes});
    } catch (error) {
        return res.status(500).json({error: "internal-server-error"});
    }
}

exports.one = async (req, res, next) => {
    try {
        const purpose = await Purpose.findById(req.params.id);

        if(!purpose)
            return res.status(404).json({error: "not-found-error", message: "Purpose not found."});

        return res.status(200).json({purpose});
    } catch (error) {
        return res.status(500).json({error: "internal-server-error"});
    }
}

exports.create = async (req, res, next) => {
    try {
        if(!req.body.name || !req.body.description)
            return res.status(400).json({error: "missing-required-parameters-error", message: "Missing name or description from request body."});

        const name = req.body.name;
        const description = req.body.description;

        let purpose = new Purpose();

        purpose.name = name;
        purpose.description = description;
        purpose.service = req.service;

        await purpose.save();

        const service = await Service.findById(req.service);

        service.purposes.push(purpose.id);

        await service.save();

        return res.status(201).json({message: "Purpose successfully created", purpose});

    } catch (error) {
        return res.status(500).json({error: "internal-server-error"});
    }
}

exports.delete = async (req, res, next) => {
    try {
        
        if(!req.body.purposeId)
            return res.status(400).json({error: "missing-parameter-error", message: "Missing purposeId from request body"});

        await Purpose.findByIdAndRemove(req.body.purposeId);

        let service = await Service.findById(req.service);

        const index = service.purposes.findIndex(id => id === req.body.purposeId);
        if(index != -1) {
            service.purposes.splice(index, 1);
            await service.save();
        }

        return res.status(200).json({message: "Successfully deleted Purpose"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "internal-server-error"});
    }
}

exports.update = async (req, res, next) => {
    try {
        
        if(!req.body.purposeId)
            return res.status(400).json({error: "missing-parameter-error", message: "Missing purposeId from request body"});

        let purpose = await Purpose.findById(req.body.purposeId);

        purpose.name = req.body.name || purpose.name;
        purpose.description = req.body.description || purpose.description;

        await purpose.save();

        return res.status(200).json({message: "Successfully updated Purpose"});

    } catch (error) {
        return res.status(500).json({error: "internal-server-error"});
    }
}