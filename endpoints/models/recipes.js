const db = require('../../data/dbConfig')
const tbl = 'recipes'

add_one = async (obj) => 
    (await db(tbl).insert(obj).returning('*'))[0]

get_one = async (search_params) =>
    await db(`${tbl} as r`)
        .where({'r.id': search_params.id})
        .join('ingredients_list as list', {'list.recipe_id': 'r.id'})
        .join('ingredients', {'list.ingredient_id': 'ingredients.id'})
        .join('units', {'list.unit_id': 'units.id'})
        .select(
            'r.id',
            'r.title',
            'r.parent_id',
            'r.forked_from',
            'r.description',
            db.raw(`json_agg(json_build_object(
                'ingredient_list_id', list.id,
                'ingredient', ingredients.name,
                'quantity', list.quantity,
                'units', units.name,
                'units_short', units.abbreviation
                )) as ingredients`)
        )
        .groupBy('r.id')
        .first()

get_all = async (search_params = {}) =>
    await db(`${tbl} as r`)
        .join('ingredients_list as list', {'list.recipe_id': 'r.id'})
        .join('ingredients', {'list.ingredient_id': 'ingredients.id'})
        .join('units', {'list.unit_id': 'units.id'})
        .select(
            'r.id',
            'r.title',
            'r.parent_id',
            'r.forked_from',
            'r.description',
            db.raw(`json_agg(json_build_object(
                'ingredient_list_id', list.id,
                'ingredient', ingredients.name,
                'quantity', list.quantity,
                'units', units.name,
                'units_short', units.abbreviation
                )) as ingredients`)
        )
        .groupBy('r.id')

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