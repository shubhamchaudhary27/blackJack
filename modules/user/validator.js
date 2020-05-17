const Joi = require('joi');
const commonFunction = require('../../universal_functions/commonfunction');

const api_reference_module = 'user';


const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required()
    });
    
    if (commonFunction.validateFields(req.body, res, schema)) {
        req.body.api_reference = {
            module: api_reference_module,
            api: "signup"
        };
        next();
    }
};

const login = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    if (commonFunction.validateFields(req.body, res, schema)) {
        req.body.api_reference = {
            module: api_reference_module,
            api: "login"
        };
        next();
    }
};

const history = (req, res, next) => {
    const schema = Joi.object().keys({
        accessToken: Joi.string().required(),
        limit: Joi.number().max(100).required(),
        skip: Joi.number().required()
    });
    if (commonFunction.validateFields(req.query, res, schema)) {
        req.body.api_reference = {
            module: api_reference_module,
            api: "history of user"
        };
        next();
    }
};


exports.signup = signup;
exports.login = login;
exports.history = history;