const constants = require('../../constants');
const service = require('./service');
const userService = require('./../user/service');
const commonFunc = require('../../universal_functions/commonfunction');


const startGame = async (payload) => {
    try {
        let result = await userService.userDetails(payload.api_reference, payload);
        if (result) {
            let deck = commonFunc.createDeck();
            deck = commonFunc.shuffle(deck);
            payload.userHand = [deck.pop(), deck.pop()];
            payload.dealerHand = [deck.pop(), deck.pop()];
            payload.deck = deck;
            payload = Object.assign(payload, result);
            let insertedData = await service.addNewGame(payload.api_reference, payload);
            let { insertedId } = insertedData;
            return { _id: insertedId, userHand: payload.userHand, dealerHand: payload.dealerHand };
        } else {
            throw { error_message: constants.responseMessages.INVALID_ACCESS_TOKEN, status_code: constants.responseFlags.BAD_REQUEST }
        }

    } catch (err) {
        throw err
    }

}

const endGame = async (payload) => {
    try {
        let result = await userService.userDetails(payload.api_reference, payload);
        if (result) {
            let deckData = await service.gameDetails(payload.api_reference, payload);
            if (deckData) {
                let playerHandValue = calculatePlayerHandValue(deckData.userHand);
                let dealerHandValue = calculateDealerHandValue(deckData);
                let dataToSend = blackjack(playerHandValue, dealerHandValue)
                payload.deckData = deckData;
                payload.winnerUserType = dataToSend.winnerUserType
                await service.updateDeck(payload.api_reference, payload);
                return dataToSend;
            } else {
                throw { error_message: constants.responseMessages.INVALID_GAME, status_code: constants.responseFlags.BAD_REQUEST }
            }

        } else {
            throw { error_message: constants.responseMessages.INVALID_ACCESS_TOKEN, status_code: constants.responseFlags.BAD_REQUEST }
        }

    } catch (err) {
        throw err
    }

}

const getNewCard = async (payload) => {
    try {
        let result = await userService.userDetails(payload.api_reference, payload);
        if (result) {
            let deckData = await service.getDeck(payload.api_reference, payload);
            if (deckData) {
                let dataTosend = [deckData.deck.pop()];
                payload.deck = deckData.deck;
                payload.dataInHand = dataTosend[0];
                await service.updateDeck(payload.api_reference, payload);
                return dataTosend;
            } else {
                throw { error_message: constants.responseMessages.INVALID_GAME, status_code: constants.responseFlags.BAD_REQUEST }
            }

        } else {
            throw { error_message: constants.responseMessages.INVALID_ACCESS_TOKEN, status_code: constants.responseFlags.BAD_REQUEST }
        }

    } catch (err) {
        throw err
    }

}

function calculatePlayerHandValue(deck) {
    let cardValue = 0;
    let ace = false;
    for (let i = 0; i < deck.length; i++) {
        if (deck[i].value == "A") {
            cardValue += 1
            ace = true;
        } else if (deck[i].value == "J" || deck[i].value == "K" || deck[i].value == "Q") {
            cardValue += 10
        } else {
            cardValue += parseInt(deck[i].value)
        }
    }
    if (ace && (cardValue + 10) <= 21) {
        return cardValue + 10;
    }
    return cardValue;
}

function calculateDealerHandValue(deckData) {
    let deck = deckData.deck;
    let dealersDeck = deckData.dealerHand;
    let cardValue = 0;
    for (let i = 0; i < dealersDeck.length; i++) {
        if (dealersDeck[i].value == "A") {
            cardValue += 11;
        } else if (dealersDeck[i].value == "J" || dealersDeck[i].value == "K" || dealersDeck[i].value == "Q") {
            cardValue += 10;
        } else {
            cardValue += dealersDeck[i].value;
        }
    }
    if (cardValue == 21) {
        return cardValue;
    } else {
        let ace = false;
        cardValue = 0;
        deck = deck.concat(dealersDeck);
        deckData.dealerHand = [];
        while (cardValue < 17) {
            let card = deck.pop();
            deckData.dealerHand.push(card);
            if (card.value == "A") {
                cardValue += 1;
            } else if (card.value == "J" || card.value == "K" || card.value == "Q") {
                cardValue += 10;
            } else {
                cardValue += parseInt(card.value);
            }

            if (ace && (cardValue + 10) <= 21) {
                cardValue + 10;
            }
        }
        deckData.deck = deck;
        return cardValue;
    }

}

function blackjack(player, dealer) {
    if (player == 21 && dealer != 21) {
        return { winnerUserType: constants.userType.user, userValue: player, dealerValue: dealer }
    } else if (player > 21) {
        return { winnerUserType: constants.userType.dealer, userValue: player, dealerValue: dealer }
    } else if (dealer > 21) {
        return { winnerUserType: constants.userType.user, userValue: player, dealerValue: dealer }
    } else if (player > dealer) {
        return { winnerUserType: constants.userType.user, userValue: player, dealerValue: dealer }
    } else if (dealer == 21 && player == 21) {
        return { winnerUserType: 0, userValue: player, dealerValue: dealer }
    } else {
        return { winnerUserType: constants.userType.dealer, userValue: player, dealerValue: dealer }
    }
}

exports.startGame = startGame;
exports.endGame = endGame;
exports.getNewCard = getNewCard;