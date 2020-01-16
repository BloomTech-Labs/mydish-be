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

get_one = search_params => {
    return db(`${tbl} as r`)
        .where({'r.id': search_params.id})
        .join('users', {'r.owner_id': 'users.id'})
        .leftJoin('recipe_ingredients as list', {'list.recipe_id': 'r.id'})
        .leftJoin('ingredients', {'list.ingredient_id': 'ingredients.id'})
        .leftJoin('units', {'list.unit_id': 'units.id'})
        .leftJoin('instructions', {'instructions.recipe_id': 'r.id'})
        .leftJoin('recipe_tags as rt', {'rt.recipe_id': 'r.id'})
        .leftJoin('tags', {'rt.tag_id': 'tags.id'})
        .leftJoin('notes', {'notes.recipe_id': 'r.id'})
        .select(
            'r.id',
            'r.title',
            'r.description',
            'r.forked_from',
            db.raw(`json_build_object(
                'user_id', users.id,
                'username', users.username
                ) as owner`),
            db.raw(`json_agg(distinct jsonb_build_object(
                'recipe_ingredients_id', list.id,
                'ingredient', ingredients.name,
                'quantity', list.quantity,
                'units', units.name,
                'units_short', units.abbreviation
                )) as ingredients`),
            db.raw(`json_agg(distinct jsonb_build_object(
                'id', instructions.id,
                'step_number', instructions.step_number,
                'instruction', instructions.description
                )) as instructions`),
            db.raw(`json_agg(distinct jsonb_build_object(
                'id', tags.id, 'name', tags.name
                )) as tags`),
            db.raw(`json_agg(distinct jsonb_build_object(
                'id', notes.id,
                'description', notes.description
                )) as notes`)
        )
        .groupBy('r.id', 'users.id')
        .first()
}

get_all = title => {
    return db(`${tbl} as r`)
        // ilike = fuzzy search, ignore case
        // WHERE r.title LIKE %cerea%
        .where('r.title', 'ilike', `%${title}%`)
        .join('users', {'r.owner_id': 'users.id'})
        .select(
            'r.id',
            'r.title',
            'r.description',
            'r.forked_from',
            db.raw(`json_build_object(
                'user_id', users.id,
                'username', users.username
                ) as owner`),
        )
        .groupBy('r.id', 'users.id')
}

update_one = (id, obj) => db(tbl).where({id}).update(obj).returning('*')[0]

remove_one = (id) => db(tbl).where({id}).delete().returning('*')[0]

remove_all = () => db(tbl).delete()

module.exports = {
    add_one,
    get_one,
    get_all,
    update_one,
    remove_one,
    remove_all
}