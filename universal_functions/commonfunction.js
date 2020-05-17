let constants = require('./../constants');
let Joi = require('joi');
let bcrypt = require('bcryptjs');


function cryptData(stringToCrypt) {
  let hash = bcrypt.hashSync(stringToCrypt, 10);
  return hash;
};

function compareCryptedData(stringToCompare, CryptedString) {
  let res = bcrypt.compareSync(stringToCompare, CryptedString);
  return res;
};

function generateRandomStringAndNumbers() {
  let text = "";
  let possible = "bcdfghjklmnpqrstvwxyz0123456789";
  for (let i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

function validateFields(req, res, schema) {
  const validation = Joi.validate(req, schema);
  if (validation.error) {
    let errorName = validation.error.name;
    let errorReason =
      validation.error.details !== undefined
        ? validation.error.details[0].message
        : 'Parameter missing or parameter type is wrong';
    let response = {
      "message": constants.responseMessages.PARAMETER_MISSING,
      "status": constants.responseFlags.PARAMETER_MISSING,
      "data": { error: validation.error.details[0].message }
    };

    res.send(JSON.stringify(response));
    return false;
  }
  return true;
};

function createDeck() {
  let deck = [];
  let suits = constants.gameConstants.suits;
  let values = constants.gameConstants.values;
  let suits_updated = [];
  for (let i = 0; i < suits.length; i++) {
    repeatArray(suits_updated, suits[i], constants.gameConstants.pack)
  }
  for (let i = 0; i < suits_updated.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { value: values[x], suit: suits_updated[i] };
      deck.push(card);
    }
  }
  return deck;
}

function repeatArray(array, value, count) {
  for (let i=0; i<count; i++) {
    array.push(value)
  }
  return array;
}

function shuffle(deck){
    for (let i = 0; i < 1000; i++)
    {
      let location1 = Math.floor((Math.random() * deck.length));
      let location2 = Math.floor((Math.random() * deck.length));
      let tmp = deck[location1];
  
      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }
    return deck;
}

exports.validateFields = validateFields;
exports.cryptData = cryptData;
exports.compareCryptedData = compareCryptedData;
exports.generateRandomStringAndNumbers = generateRandomStringAndNumbers;
exports.createDeck = createDeck;
exports.shuffle = shuffle;


