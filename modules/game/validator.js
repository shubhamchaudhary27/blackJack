const Joi = require('joi');
const commonFunction = require('../../universal_functions/commonfunction');

const api_reference_module = 'game';


const startGame = (req, res, next) => {
    const schema = Joi.object().keys({
        accessToken: Joi.string().required()
    });

    if (commonFunction.validateFields(req.body, res, schema)) {
        req.body.api_reference = {
            module: api_reference_module,
            api: "start game"
        };
        next();
    }
};

const endGame = (req, res, next) => {
    const schema = Joi.object().keys({
        accessToken: Joi.string().required(),
        gameId: Joi.string().required()
    });

    if (commonFunction.validateFields(req.body, res, schema)) {
        req.body.api_reference = {
            module: api_reference_module,
            api: "evaluate cards"
        };
        next();
    }
};

const getNewCard = (req, res, next) => {
    const schema = Joi.object().keys({
        accessToken: Joi.string().required(),
        gameId: Joi.string().required()
    });

    if (commonFunction.validateFields(req.query, res, schema)) {
        req.body.api_reference = {
            module: api_reference_module,
            api: "get new card"
        };
        next();
    }
};


exports.startGame = startGame;
exports.getNewCard = getNewCard;
exports.endGame = endGame;