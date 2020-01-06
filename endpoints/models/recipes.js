const db = require('../../data/dbConfig')
const tbl = 'recipes'

add_one = async (obj) => 
    (await db(tbl).insert(obj).returning('*'))[0]

get_one = async (search_params) =>
    await db(`${tbl} as r`)
        .where({'r.id': search_params.id})
        .join('users', {'r.owner_id': 'users.id'})
        .join('ingredients_list as list', {'list.recipe_id': 'r.id'})
        .join('ingredients', {'list.ingredient_id': 'ingredients.id'})
        .join('units', {'list.unit_id': 'units.id'})
        .join('instructions', {'instructions.recipe_id': 'r.id'})
        .select(
            'r.id',
            'r.title',
            'r.description',
            db.raw(`json_build_object(
                'user_id', users.id,
                'username', users.username
                ) as owner`),
            db.raw(`json_build_object(
                'parent_id', r.parent_id,
                'forked_from', r.forked_from
                ) as history`),
            db.raw(`json_agg(distinct jsonb_build_object(
                'ingredient_list_id', list.id,
                'ingredient', ingredients.name,
                'quantity', list.quantity,
                'units', units.name,
                'units_short', units.abbreviation
                )) as ingredients`),
            db.raw(`json_agg(distinct jsonb_build_object(
                'instruction_id', instructions.id,
                'step', instructions.step_number,
                'instruction', instructions.description
                )) as instructions`)
        )
        .groupBy('r.id', 'users.id')
        .first()

get_all = async (search_params = {}) =>
    await db(`${tbl} as r`)
        .join('users', {'r.owner_id': 'users.id'})
        .join('ingredients_list as list', {'list.recipe_id': 'r.id'})
        .join('ingredients', {'list.ingredient_id': 'ingredients.id'})
        .join('units', {'list.unit_id': 'units.id'})
        .join('instructions', {'instructions.recipe_id': 'r.id'})
        .select(
            'r.id',
            'r.title',
            'r.description',
            db.raw(`json_build_object(
                'user_id', users.id,
                'username', users.username
                ) as owner`),
            db.raw(`json_build_object(
                'parent_id', r.parent_id,
                'forked_from', r.forked_from
                ) as history`),
            db.raw(`json_agg(distinct jsonb_build_object(
                'ingredient_list_id', list.id,
                'ingredient', ingredients.name,
                'quantity', list.quantity,
                'units', units.name,
                'units_short', units.abbreviation
                )) as ingredients`),
            db.raw(`json_agg(distinct jsonb_build_object(
                'instruction_id', instructions.id,
                'step', instructions.step_number,
                'instruction', instructions.description
                )) as instructions`)
        )
        .groupBy('r.id', 'users.id')

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