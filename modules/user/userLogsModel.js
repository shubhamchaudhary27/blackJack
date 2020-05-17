let schema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["gameID", "userId"],
        properties: {
            gameId: {
                bsonType: "objectId",
                description: "must be a game id and is required"
            },
            userId: {
                bsonType: "objectId",
                description: "must be a user id and is required"
            },
            logs: {
                bsonType: "array",
                description: "must be a array"
            }
        }
    }
};

db.createCollection("userHistory", {
    validator: schema
})