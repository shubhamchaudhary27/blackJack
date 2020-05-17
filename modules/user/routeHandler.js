const controller             = require('./controller');
const constants              = require('../../constants');

const login = async (req, res) => {
    try {
        req.body.loggingDetails = {
            event: "login"
        };
        
        let result = await controller.login(req.body)
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

const signup = async (req, res) => {
    try {
        req.body.loggingDetails = {
            event: "signup"
        };
        let result = await controller.signup(req.body)
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

const history = async (req, res) => {
    try {
        req.body.loggingDetails = {
            event: "history"
        };
        let result = await controller.history(req.query)
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

exports.login = login;
exports.signup = signup;
exports.history = history;