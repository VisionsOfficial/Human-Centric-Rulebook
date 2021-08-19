const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    /**
     * Datatype name
     */
    name: String,

    /**
    * Datatype name on the service's side
    */
    nameInService: String,
    
    /**
    * Reference to the data collection inside of which the datatype is stored
    */
    dataTypeField: {
        type: Schema.ObjectId,
        ref: "DataTypeField"
    },
    
    /**
    * Datatype description
    */
    description: String,
    
    /**
    * The service from where the datatype comes
    */
    provenance: {
        type: Schema.ObjectId,
        ref: "Service",
    },
    
    /**
    * Timestamp of when the datatype was created?
    */
    time: {
        type: Date,
        default: Date.now,
    },
    
    /**
    * Information about data conservation
    */
    conservation: {
        type: String,
        unit: String,
        length: String,
        description: String,
    },
    
    
    /**
    * Data access frequency
    */
    frequency:{
        unit: String, // DAILY|MONTHLY|YEARLY
        value: String, // 20
        repeats:{
            type:Boolean,
            default: false
        }
    },
});

module.exports = mongoose.model("DataType", schema);
