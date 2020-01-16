const db = require('../../data/dbConfig')
const models = {
    ingredients: require('./ingredients'),
    units: require('./units'),
    tags: require('./tags'),
}
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

/**
 * Adds a Recipe, and any linking instructions/ingredients/notes, to the database.
 * 
 * This model function affects multiple tables in the database. Please read and
 * refactor carefully, if necessary.
 * 
 */
const add_one = async new_recipe => {
    // Determines success at the end of this function.
    // If successful, will hold the id of our added recipe.
    // If unsuccessful, will hold our error.
    let success;
    try {

        //======================PREPPING INGREDIENTS AND UNITS=============================//

        //creates a query that looks up every ingredient in the ingredients array
        const { non_ingredients } = await helper.find_matching('ingredients', new_recipe.ingredients, ['id', 'name'])
        
        let ingredients_to_be_added = []
        // Any ingredients that aren't already in our db?
        if (non_ingredients.length) {

            // Do they have the props necessary to add to the db? If not, throw an error!
            const {errors} = await helper.can_post('ingredients', non_ingredients)
            if(errors.length) throw {userError: true, ingredient_errors: errors}

            // If yes, prep them to be added to the db!
            ingredients_to_be_added = non_ingredients.map(ing => {
                return { name: ing.name, category: ing.category || null}
            })
        }

        await db.transaction(async trx => {

            //===========================ADDING INGREDIENTS===========================//
            
            // If we have ingredients that need to be added into the database,
            //     We add them now:
            if (ingredients_to_be_added.length) await trx('ingredients').insert(ingredients_to_be_added)

            //=====================ADDING MAIN RECIPE INFO===========================//
            // Create our recipe object . . .
            const recipe_info = {
                title: new_recipe.title,
                img: new_recipe.img || null,
                forked_from: new_recipe.forked_from || null,
                owner_id: new_recipe.owner_id,
                prep_time: new_recipe.prep_time || null,
                cook_time: new_recipe.cook_time || null,
                description: new_recipe.description || null,
            }
            const added_recipe_id = await trx('recipes').insert(recipe_info).returning('id')
        
            //==========================ADDING RECIPE_TAGS=============================//

            // Query the db to get the IDs of each tag we want to add.
            // Map through the array of ids to create an array of objects
            //     to match the schema { recipe_id, tag_id },
            //     and then add to the database.
            const tag_ids = await db('tags').whereIn('name', new_recipe.tags).select('id');
            const recipe_tags_to_be_added = tag_ids.map(tag => ({ recipe_id:added_recipe_id[0], tag_id:tag.id }))
            await trx('recipe_tags').insert(recipe_tags_to_be_added)

            //======================ADDING RECIPE_INGREDIENTS=========================//
            
            // Map through the array of ingredients we have, changing our ingredient object
            //     to match the schema { recipe_id, ingredient_id, unit_id, quantity },
            //     and then add to the database.
            const recipe_ingredients_to_be_added = await Promise.all(new_recipe.ingredients.map(async ingredient => {
                const ingredient_id = await trx('ingredients')
                                    .where('name', ingredient.name)
                                    .select('id')
                                    .first();
                const unit_id = await trx('units')
                                    .where('name', ingredient.unit)
                                    .orWhere('abbreviation', ingredient.unit)
                                    .select('id')
                                    .first();
                return {
                    recipe_id: added_recipe_id[0], 
                    ingredient_id: ingredient_id.id, 
                    unit_id: unit_id.id, 
                    quantity: ingredient.quantity
                }
            }))
            await trx('recipe_ingredients').insert(recipe_ingredients_to_be_added)
            
            //===========================ADDING INSTRUCTIONS============================//
            
            // Assuming we have an array of objects like { step_number, description },
            //     we add the recipe_id to each object and add the array to the database.
            const instructions_to_be_added = new_recipe.instructions.map(instruction => 
                ({ ...instruction, recipe_id: added_recipe_id[0] }))
            
            //==============================ADDING NOTES===============================//

            // Assuming we have an array of only strings, we map through the array 
            //     to create an array of objects to match the schema { recipe_id, description },
            //     and then add it to the database.
            if (new_recipe.notes && new_recipe.notes.length) {
                const notes_to_be_added = new_recipe.notes.map(note => 
                    ({ recipe_id: added_recipe_id[0], description: note }))
                await trx('notes').insert(notes_to_be_added)
            }
            
            success = added_recipe_id[0]
        })
    } catch (e) {
        success = e
    } finally {
        if (isNaN(success)) throw success
        else return success
    }
}

function get_one(search_params) {
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
            'r.prep_time',
            'r.cook_time',
            'r.img',
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

const get_all = title => {
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

const update_one = (id, obj) => db(tbl).where({id}).update(obj).returning('*')[0]

const remove_one = (id) => db(tbl).where({id}).delete().returning('*')[0]

const remove_all = () => db(tbl).delete()

module.exports = {
    add_one,
    get_one,
    get_all,
    update_one,
    remove_one,
    remove_all
}