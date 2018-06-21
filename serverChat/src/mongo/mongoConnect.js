const mongoose = require('mongoose');

class MongoConnect {
    constructor(config){
        this.config = config;
    }
    getMongoUrl(){
        return this.config.MONGODB_URI;
    }
    connect(){
        return mongoose.connect(this.getMongoUrl())
    }
}
module.exports = { MongoConnect };