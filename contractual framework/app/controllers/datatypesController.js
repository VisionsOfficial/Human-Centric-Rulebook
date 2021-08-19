const DataType = require("./../models/DataType.model");
const Service = require("./../models/Service.model");

exports.all = async (req, res, next) => {
    try {
        const datatypes = await DataType.find({provenance: req.service});

        return res.status(200).json({datatypes});
    } catch (error) {
        return res.status(500).json({error: "internal-server-error"});
    }
}

exports.one = async (req, res, next) => {
    try {
        const datatype = await DataType.findById(req.params.id);

        if(!datatype)
            return res.status(404).json({error: "not-found-error", message: "Datatype not found."});

        return res.status(200).json({datatype});
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

        let datatype = new DataType();

        datatype.name = name;
        datatype.description = description;
        datatype.provenance = req.service;

        await datatype.save();

        const service = await Service.findById(req.service);

        service.datatypes.push(datatype.id);

        await service.save();

        return res.status(201).json({message: "DataType successfully created", datatype});

    } catch (error) {
        return res.status(500).json({error: "internal-server-error"});
    }
}

exports.delete = async (req, res, next) => {
    try {
        
        if(!req.body.datatypeId)
            return res.status(400).json({error: "missing-parameter-error", message: "Missing datatypeId from request body"});

        await DataType.findByIdAndRemove(req.body.datatypeId);

        let service = await Service.findById(req.service);

        const index = service.datatypes.findIndex(id => id === req.body.datatypeId);
        if(index != -1) {
            service.datatypes.splice(index, 1);
            await service.save();
        }

        return res.status(200).json({message: "Successfully deleted DataType"});

    } catch (error) {
        return res.status(500).json({error: "internal-server-error"});
    }
}

exports.update = async (req, res, next) => {
    try {
        
        if(!req.body.datatypeId)
            return res.status(400).json({error: "missing-parameter-error", message: "Missing datatypeId from request body"});

        let datatype = await DataType.findById(req.body.datatypeId);

        datatype.name = req.body.name || datatype.name;
        datatype.description = req.body.description || datatype.description;

        datatype.conservation.type = req.body.conservationType || datatype.conservation.type;
        datatype.conservation.unit = req.body.conservationUnit || datatype.conservation.unit;
        datatype.conservation.length = req.body.conservationLength || datatype.conservation.length;
        datatype.conservation.description = req.body.conservationDescription || datatype.conservation.description;

        datatype.frequency.unit = req.body.frequencyUnit || datatype.frequency.unit;
        datatype.frequency.value = req.body.frequencyValue || datatype.frequency.value;
        datatype.frequency.repeats = req.body.frequencyRepeats || datatype.frequency.repeats;

        await datatype.save();

        return res.status(200).json({message: "Successfully updated DataType"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "internal-server-error"});
    }
}