
const getData = (api_reference, payload) => {
    return db.collection(payload.model).findOne(payload.criteria, payload.projection)
}

const getAllData = (api_reference, payload) => {
    let limit = parseInt(payload.limit);
    let skip = parseInt(payload.skip);
    return db.collection(payload.model).find(payload.criteria, payload.projection).limit(limit).skip(skip).toArray()
}

const insertData = (api_reference, payload) => {
    return db.collection(payload.model).insertOne(payload.dataToInsert)
}

const updateData = (api_reference, payload) => {
    return db.collection(payload.model).updateOne(payload.criteria, payload.dataToUpdate, payload.option)
}

exports.getData = getData;
exports.insertData = insertData;
exports.updateData = updateData;
exports.getAllData = getAllData;