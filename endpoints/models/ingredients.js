const db = require('../../data/dbConfig')
const tbl = 'ingredients'

add_array = (arr) =>  db(tbl).insert(arr).returning('*')

add_one = (obj) =>  db(tbl).insert(obj).returning('*')[0]

get_one = (search_params) => db(tbl).where(search_params).first()

get_all = (search_params = {}) => db(tbl).where(search_params)

update_one = (id, obj) => db(tbl).where({id}).update(obj).returning('*')[0]

remove_one = (id) => db(tbl).where({id}).delete().returning('*')[0]

remove_all = () => db(tbl).delete()

module.exports = {
    add_one,
    add_array,
    get_one,
    get_all,
    update_one,
    remove_one,
    remove_all
}