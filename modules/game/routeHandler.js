const controller             = require('./controller');
const constants              = require('../../constants');

const startGame = async (req, res) => {
    try {
        req.body.loggingDetails = {
            event: "game"
        };
        
        let result = await controller.startGame(req.body)
        return res.send(JSON.stringify({
            "message": constants.responseMessages.ACTION_COMPLETE,
            "status": constants.responseFlags.ACTION_COMPLETE,
            "data": result
        }));
    }
    catch (err) {
        return res.send(JSON.stringify({
            "message": err.error_message || err,
            "status": err.status_code || constants.responseFlags.BAD_REQUEST,
            "data": {}
        }));
    }
}

const endGame = async (req, res) => {
    try {
        req.body.loggingDetails = {
            event: "evaluate cards"
        };
        
        let result = await controller.endGame(req.body)
        return res.send(JSON.stringify({
            "message": constants.responseMessages.ACTION_COMPLETE,
            "status": constants.responseFlags.ACTION_COMPLETE,
            "data": result
        }));
    }
    catch (err) {
        return res.send(JSON.stringify({
            "message": err.error_message || err,
            "status": err.status_code || constants.responseFlags.BAD_REQUEST,
            "data": {}
        }));
    }
}

const getNewCard = async (req, res) => {
    try {
        req.body.loggingDetails = {
            event: "get new card"
        };
        
        let result = await controller.getNewCard(req.query)
        return res.send(JSON.stringify({
            "message": constants.responseMessages.ACTION_COMPLETE,
            "status": constants.responseFlags.ACTION_COMPLETE,
            "data": result
        }));
    }
    catch (err) {
        return res.send(JSON.stringify({
            "message": err.error_message || err,
            "status": err.status_code || constants.responseFlags.BAD_REQUEST,
            "data": {}
        }));
    }
}

exports.startGame = startGame;
exports.endGame = endGame;
exports.getNewCard = getNewCard;