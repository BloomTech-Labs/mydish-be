const db = require('../../data/dbConfig')
const tbl = 'ingredients_list'

add_one = async (obj) => 
    (await db(tbl).insert(obj).returning('*'))[0]

get_one = async (search_params) => 
    await db(`${tbl} as list`)
        .where('list.id', '=', search_params.id)
        .join('ingredients', {'list.ingredient_id': 'ingredients.id'})
        .join('units', {'list.unit_id': 'units.id'})
        .select(
            'list.recipe_id',
            'ingredients.name as ingredient',
            'units.name as unit',
            'units.abbreviation as unit_short',
            'list.quantity'
        )
        .first()

get_all = async (search_params = {}) =>
    await db(`${tbl} as list`)
        .join('ingredients', {'list.ingredient_id': 'ingredients.id'})
        .join('units', {'list.unit_id': 'units.id'})
        .select(
            'list.recipe_id',
            'ingredients.name as ingredient',
            'units.name as unit',
            'units.abbreviation as unit_short',
            'list.quantity'
        )

update_one = async (id, obj) =>
    (await db(tbl).where({id}).update(obj).returning('*'))[0]

remove_one = async (id) =>
    (await db(tbl).where({id}).delete().returning('*'))[0]

remove_all = async () =>
    await db(tbl).delete()

module.exports = {
    add_one,
    get_one,
    get_all,
    update_one,
    remove_one,
    remove_all
}