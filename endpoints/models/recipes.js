const db = require('../../data/dbConfig')
const tbl = 'recipes'
const helper = {
    find_matching: require('../helpers/find_matches'),
    can_post: require('../helpers/can_post')
}
// const models = {
//     ingredients: require('./ingredients')
// }
// body = {
//     title,
//     minutes: "(optional number) time to make, adding more types of minutes in the works",
//     img: "(optional string) URL of an image of the food"
//     notes: "(optional string) free-form notes about the recipe",
//     categories: [
//       "(string) category/tag name"
//     ],
//     ingredients: [
//       {
//         name,
//         quantity: "(number)",
//         unit: "(string) example- ml or g or cups"
//       }
//     ],
//     steps: [
//       body: "(string) step 1 blah blah blah"
//     ],
//     ancestor: "(optional number) the ID of the previous version of this recipe"
//   };

//   res = { 
//     message: 'Recipe created',
//     recipe_id
//   };

add_one = async (obj) => {
    //creates a query that looks up every ingredient in the ingredients array
    const ingredient_matches = await helper.find_matching('ingredients', obj.ingredients, ['id', 'name'])
    const {can_post, errors} = await helper.can_post('ingredients', ingredient_matches['non_ingredients'])
    
    if(errors.length) return {ingredient_errors: errors}
    return ingredient_matches

    //multiple .orwheres
    //compare len(ingredients) with results
    //if different, find what's missing, add it to the error
    //else grab ids and add them to ingredient_list db (if no future errors)

    //check ingredients, both by id and name to see if they exist
        //if they don't and name is provided, add it
        //if they or (or have been added) add recipe id and ingredient id to ingredient_list table

    //we know instructions already don't exist, because this is a new recipe
    
    //check categories to see if they exist by either id or name
        //if not and name is provided, add it
        //if they do, add both recipe id and category id to category_list

    //if no error from ^^^ add recipe
    // return (await db(tbl).insert(obj).returning('*'))[0]
}

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
    await db(`${tbl} as r`).where(search_params)
        .join('users', {'r.owner_id': 'users.id'})
        .join('recipe_ingredients as list', {'list.recipe_id': 'r.id'})
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