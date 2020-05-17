var Promise = require('bluebird');
let MongoClient = require('mongodb').MongoClient

MongoClient.connect(config.get('databaseSettings.mongoUri'), { useUnifiedTopology: true })
    .then(function (database) {
        console.log("mongo db connected")
        db = database.db(config.get('databaseSettings.db'));
        require('../user/userModel')
        require('../user/userLogsModel')
        require('../game/gameModel')
    })
    .catch(e => {
        console.log("error in connecting db", e)
    })