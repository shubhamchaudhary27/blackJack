let ObjectID = require('mongodb').ObjectID;
let database = require('../database_services/mongo')
const constants = require('../../constants');
let model = "game";

const addNewGame = async (api_reference, payload) => {
    payload.dataToInsert = {
        deck: payload.deck,
        usersInGame: [payload._id],
        userHand: payload.userHand,
        dealerHand: payload.dealerHand
    };
    payload.model = model;
    return database.insertData(api_reference, payload)
}

const getDeck = async (api_reference, payload) => {
    payload.criteria = {
        _id: new ObjectID(payload.gameId)
    };
    payload.projection = { deck: 1 }
    payload.model = model;
    return database.getData(api_reference, payload)
}

const gameDetails = async (api_reference, payload) => {
    payload.criteria = {
        _id: new ObjectID(payload.gameId)
    };
    payload.projection = {}
    payload.model = model;
    return database.getData(api_reference, payload)
}


const updateDeck = async (api_reference, payload) => {
   if(payload.dataInHand){
    payload.dataToUpdate = {
        "$set": { deck: payload.deck },
        "$push": { userHand: payload.dataInHand } 
    }
   }else{
    payload.dataToUpdate = {
        "$set": { deck: payload.deckData.deck, dealerHand: payload.deckData.dealerHand, winnerUserType: payload.winnerUserType}
    }  
   }
    
    payload.option = { new: true };
    payload.model = model;
    return database.updateData(api_reference, payload)
}

exports.addNewGame = addNewGame;
exports.getDeck = getDeck;
exports.updateDeck = updateDeck;
exports.gameDetails = gameDetails;