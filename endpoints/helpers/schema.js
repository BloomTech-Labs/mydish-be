const db = require('../../data/dbConfig')
//find all fields that are required to be unique in a given table
unique = async table =>
    await db.raw(`select constraint_name from information_schema.table_constraints WHERE table_name='${table}' AND constraint_type='UNIQUE'`)
        .then(constraints => constraints.rows)
        .map(row => row.constraint_name.split('_').filter(word => word !== table && word !== 'unique').join('_'))

//find all required fields in a given table
required = async table => {
    const schema = await db(table).columnInfo()
    let required = []
    for(let key in schema) if(!schema[key].nullable) required.push(key)
    return required.filter(key => key != 'id')
}

module.exports = {
    unique,
    required
}