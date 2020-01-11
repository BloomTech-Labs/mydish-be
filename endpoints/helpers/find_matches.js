const db = require('../../data/dbConfig')
const table_requirements = require('./table_requirements')
create_matcher_query = (array, keys) => {
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

//takes a table, user submitted array of objects, and keys to be checked in each object
//checks each object to see if it exists in the given table and returns the complete record
//if there are objects that can't be found in the given table...
//...an array of non-matching objects will also be returned along with any missing fields needed to create a new record
module.exports = async (table, array_to_check = [], keys_to_check = []) => {
    //check every item the given array and see if any records match in the given table
    const query = create_matcher_query(array_to_check, keys_to_check)
    const matches = await db(table).whereRaw(query)

    //compare given array and matches and return items that dont match
    const non_matches = array_to_check.filter(item => 
        !matches.reduce((item_is_match, match) =>
            item_is_match || Object.keys(item).reduce((item_is_match, key) =>
                match[key] == item[key] || item_is_match, false),false))
    
    //IF there are non-matches
    //check all non-matches to see requirements are met to create a new record in the given table
    if(non_matches) {
        const required_keys = await table_requirements(table)
        non_matches.forEach(item => {
            required_keys.forEach(key => {
                if(!item.hasOwnProperty(key) && !item.hasOwnProperty('missing_fields')) item['missing_fields'] = [key]
                else if(!item.hasOwnProperty(key)) item.missing_fields.push(key)
            })
        })
    }
    //return matches; if there are non_matches return them too
    if(non_matches) return {[table]: matches, [`non_${table}`]: non_matches}
    return {[table]: matches}
}