const db = require('../../data/dbConfig')

const create_matcher_query = (array, keys) => {
    let query = ''
    array.forEach(item => {
        let temp_query = ''
        keys.forEach(key => {
            if(temp_query && item.hasOwnProperty(key)) temp_query += ' and '
            if(item.hasOwnProperty(key)) temp_query += `${key} = '${item[key]}'`
        })
        if(query && temp_query) query += ' or '
        if(temp_query) query += temp_query
    })
    return query
}

/**
 * Checks each object in the array_to_check to see if it exists in the given table.
 * Returns an array of matches and if there are any, an array of non-matches.
 *
 * @param {string}              table - Name of table you want a list of unique fields form.
 * @param {array}               array_to_check - A submitted array with objects that need to be checked.
 * @param {array}               keys_to_check - An array of key names you want to check in array_to_check.
 */
module.exports = async (table, array_to_check = [], keys_to_check = []) => {
    //check every item the given array and see if any records match in the given table
    const query = create_matcher_query(array_to_check, keys_to_check)
    const matches = await db(table).whereRaw(query)

    //compare given array and matches and return items that dont match
    const non_matches = array_to_check.filter(item => 
        !matches.reduce((item_is_match, match) =>
            item_is_match || Object.keys(item).reduce((item_is_match, key) =>
                match[key] == item[key] || item_is_match, false),false))
    
    //return matches; if there are non_matches return them too
    if(non_matches) return {[table]: matches, [`non_${table}`]: non_matches}
    return {[table]: matches}
}