const constants = require('../../constants');
const service = require('./service');
const commonFunc = require('../../universal_functions/commonfunction');


const login = async (payload) => {
    try {
        let result = await service.userDetails(payload.api_reference, payload);
        if (result) {
            let check_password = commonFunc.compareCryptedData(payload.password, result.password)
            if (check_password) {
                let { _id, accessToken } = result;
                return { _id, accessToken }
            } else {
                throw { error_message: constants.responseMessages.INVALID_CREDENTIALS, status_code: constants.responseFlags.BAD_REQUEST }
            }
        } else {
            throw { error_message: constants.responseMessages.INVALID_CREDENTIALS, status_code: constants.responseFlags.BAD_REQUEST }
        }

    } catch (err) {
        throw err
    }

}

const signup = async (payload) => {
    try {
        let userData = await service.userDetails(payload.api_reference, payload);
        if (!userData) {
            payload.password = commonFunc.cryptData(payload.password);
            payload.accessToken = commonFunc.cryptData(payload.password + new Date().getTime() + commonFunc.generateRandomStringAndNumbers());
            await service.signUp(payload.api_reference, payload);
            let { accessToken } = payload;
            return { accessToken }
        } else {
            throw { error_message: constants.responseMessages.EMAIL_ALREADY_EXISTS, status_code: constants.responseFlags.SESSION_EXPIRED }
        }
    } catch (err) {
        throw err
    }
}

const history = async (payload) => {
    try {
        let userData = await service.userDetails(payload.api_reference, payload);
        if (userData) {
            payload._id = userData._id
            let history = await service.history(payload.api_reference, payload);
            return history
        } else {
            throw { error_message: constants.responseMessages.INVALID_ACCESS_TOKEN, status_code: constants.responseFlags.SESSION_EXPIRED }
        }
    } catch (err) {
        throw err
    }
}

exports.login = login;
exports.signup = signup;
exports.history = history;
