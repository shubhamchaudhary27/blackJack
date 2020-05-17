let schema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["deck"],
        properties: {
            deck: {
                bsonType: "array",
                description: "must be a array and is required"
            },
            usersInGame: {
                bsonType: "array",
                description: "must be a array"
            },
            userHand: {
                bsonType: "array",
                description: "must be a array"
            },
            dealerHand: {
                bsonType: "array",
                description: "must be a array"
            },
            winnerUserType: {
                bsonType: "int",
                description: "must be a array"
            }
        }
    }
};

db.createCollection("game", {
    validator: schema
})