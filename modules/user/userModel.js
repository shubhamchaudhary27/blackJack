let schema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name", "password", "email"],
        properties: {
            name: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            email: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            password: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            chips: {
                bsonType: "int",
                description: "must be a integer and is required"
            }


        }
    }
};

db.createCollection("user", {
    validator: schema
})