let ObjectID = require('mongodb').ObjectID;
const database = require('../database_services/mongo')
let model = "user";

const signUp = async (api_reference, payload) => {
    payload.dataToInsert = {
        email: payload.email, password: payload.password, name: payload.name,
        chips: 2000, accessToken: payload.accessToken
    };
    payload.model = model;
    return database.insertData(api_reference, payload)
}

const userDetails = async (api_reference, payload) => {
    if(payload.email){
        payload.criteria = { email: payload.email };
    }else{
        payload.criteria = { accessToken: payload.accessToken };
    }
    payload.projection = {};
    payload.model = model;
    return database.getData(api_reference, payload)
}

const history = async (api_reference, payload) => {
    payload.criteria = { usersInGame: {$in: [payload._id]} };
    payload.projection = {projection: {deck:0, dealerHand:0}};
    payload.model = "game";
    return database.getAllData(api_reference, payload)
}

exports.signUp = signUp;
exports.userDetails = userDetails;
exports.history = history;