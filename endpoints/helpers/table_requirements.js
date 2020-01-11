const db = require('../../data/dbConfig')

module.exports = async table => {
    const schema = await db(table).columnInfo()
    let required = []
    for(let key in schema) if(!schema[key].nullable) required.push(key)
    return required.filter(key => key != 'id')
}