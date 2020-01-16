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



const get_one = search_params => {
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
                'name', ingredients.name,
                'quantity', list.quantity,
                'units', units.name,
                'units_short', units.abbreviation
                )) as ingredients`),
            db.raw(`json_agg(distinct jsonb_build_object(
                'id', instructions.id,
                'step_number', instructions.step_number,
                'description', instructions.description
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

        //creates a query that finds ingredients not already existing in our database
        const { non_ingredients } = await helper.find_matching('ingredients', new_recipe.ingredients, ['id', 'name'])
        
        let ingredients_to_be_added = []
        // Any ingredients that aren't already in our db?
        if (non_ingredients.length) {

            // Do they have the props necessary to add to the db? If not, throw an error!
            const {errors} = await helper.can_post('ingredients', non_ingredients)
            if(errors.length) throw {userError: true, ingredient_errors: errors}

            // If yes, prep them to be added to the db by giving them 
            //     the valid schema { name, category }
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
            // Create our recipe object, and add it to the database
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
            const recipe_tags_to_be_added = tag_ids.map(tag => 
                ({ recipe_id:added_recipe_id[0], tag_id:tag.id }))
            await trx('recipe_tags').insert(recipe_tags_to_be_added)

            //======================ADDING RECIPE_INGREDIENTS=========================//
            
            // Map through the array of ingredients we have, changing each ingredient object
            //     to match the schema { recipe_id, ingredient_id, unit_id, quantity },
            //     and then add to the database.
            const recipe_ingredients_to_be_added = await Promise.all(new_recipe.ingredients.map(async ingredient => {
                const ingredient_id = await trx('ingredients')
                                    .where('name', ingredient.name)
                                    .select('id')
                                    .first();
                const unit_id = await trx('units')
                                    .where('name', ingredient.units)
                                    .orWhere('abbreviation', ingredient.units)
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
            //     we add the recipe_id to each object and add the full array to the database.
            const instructions_to_be_added = new_recipe.instructions.map(instruction => 
                ({ ...instruction, recipe_id: added_recipe_id[0] }))
            
            //==============================ADDING NOTES===============================//

            // Assuming we have an array of only strings, we map through the array 
            //     to create an array of objects to match the schema { recipe_id, description },
            //     and then add the new array to the database.
            if (new_recipe.notes && new_recipe.notes.length) {
                const notes_to_be_added = new_recipe.notes.map(note => 
                    ({ recipe_id: added_recipe_id[0], description: note }))
                await trx('notes').insert(notes_to_be_added)
            }
            
            success = added_recipe_id[0]
        })
    } catch (e) {
        // Catch an error? No success :(
        success = e
    } finally {
        // If our success isn't a number, it must be an error. Let's throw!
        if (isNaN(success)) throw success
        else return success
    }
}

/**
 * Updates a Recipe that already exists in the database.
 * 
 * Lots of repeated code from the add_one function. I am too lazy to 
 * find the common code and refactor. This was faster for me to make.
 * 
 * The key when updating an entire recipe is to work in stages. Find the
 * ingredients you need to update/delete/add, then the instructions you need
 * to update/delete/add, etc etc. Once you get the pattern, it's not too bad.
 * 
 */
const update_one = async (recipe_id, updated_recipe) => {
    // Determines success at the end of this function.
    // If successful, will be the number 1, for true.
    // If unsuccessful, will hold our error.
    let success;
    try {

        //======================PREPPING INGREDIENTS AND UNITS=============================//

        //creates a query that finds ingredients not already existing in our database
        const { non_ingredients } = await helper.find_matching('ingredients', updated_recipe.ingredients, ['id', 'name'])
        
        let new_ingredient_entries = []
        // Any ingredients that aren't already in our db?
        if (non_ingredients.length) {

            // Do they have the props necessary to add to the db? If not, throw an error!
            const {errors} = await helper.can_post('ingredients', non_ingredients)
            if(errors.length) throw {userError: true, ingredient_errors: errors}

            // If yes, prep them to be added to the db by giving them 
            //     the valid schema { name, category }
            new_ingredient_entries = non_ingredients.map(ing => {
                return { name: ing.name, category: ing.category || null}
            })
        }
        await db.transaction(async trx => {


            //===========================ADDING INGREDIENTS===========================//
            
            // If we have ingredients that need to be added into the database,
            //     We add them now:
            if (new_ingredient_entries.length) await trx('ingredients').insert(new_ingredient_entries)

            //=====================UPDATING MAIN RECIPE INFO===========================//
            // Create our recipe object, and add it to the database.
            // We set optional values as undefined to make sure that, if they already 
            //     exist in the database, we don't override them as "null"
            const recipe_info = {
                title: updated_recipe.title,
                img: updated_recipe.img || undefined,
                forked_from: updated_recipe.forked_from || undefined,
                owner_id: updated_recipe.owner_id,
                prep_time: updated_recipe.prep_time || undefined,
                cook_time: updated_recipe.cook_time || undefined,
                description: updated_recipe.description || undefined,
            }
            await trx('recipes').where({ id:recipe_id }).update(recipe_info)
        
            //==========================UPDATING RECIPE_TAGS=============================//
            
            // Currently not implemented.
            
            //=======================UPDATING RECIPE_INSTRUCTIONS===========================//

            const existing_instructions = await trx('instructions').where({recipe_id})

            // If we have any ids from our request, remove them. We will only be comparing step_number.
            const updated_instructions = updated_recipe.instructions.map(
                ({step_number, description}) => ({recipe_id, step_number, description}))
            const instructions_to_be_deleted = [];
            const instructions_to_be_updated = [];
            // We loop through our existing instructions from the database.
            // If any updated_instructions have matching step_numbers,
            //     we set them to be updated.
            // If we have any instructions from the database that don't match any
            //     updated_instructions, those instructions will be deleted.
            existing_instructions.forEach(instruction => {
                const index = updated_instructions.findIndex(
                    check => check.step_number === instruction.step_number
                )
                if (index === -1) instructions_to_be_deleted.push(instruction.step_number)
                else {
                    instructions_to_be_updated.push(
                        updated_instructions.splice(index, 1)[0]
                    )
                }
            })
            // Any instructions leftover in our updated_recipe will be inserted into the database
            const instructions_to_be_added = updated_instructions.map(instruct => {
                if (instruct.id) delete instruct.id // ← JUST to make sure. If we're adding
                return instruct                    // an instruction, it shouldn't have an id.
            })

            if (instructions_to_be_updated.length) {
                // We use .map() here because .forEach() threw a promise error.
                // I think this has to do with the fact that .map() returns an array
                //     and .forEach() returns void '' '
                await Promise.all(instructions_to_be_updated.map(async instruct => {
                    await trx('instructions')
                        .where({recipe_id})
                        .andWhere({step_number: instruct.step_number})
                        .update(instruct)
                }))
            }
            if (instructions_to_be_deleted.length) {
                await trx('instructions')
                    .whereIn('step_number', instructions_to_be_deleted)
                    .andWhere({recipe_id})
                    .del()
            }
            if (instructions_to_be_added.length) {
                await trx('instructions')
                    .insert(instructions_to_be_added)
            }

            //=========================UPDATING RECIPE_INGREDIENTS=======================//

            // Map through the array of ingredients we have, changing each ingredient object
            //     to match the 'recipe_ingredients' schema 
            //     { id, recipe_id, ingredient_id, unit_id, quantity },
            //     including the id, if we have it '' '
            const updated_ingredients = await Promise.all(updated_recipe.ingredients.map(async ingredient => {
                const ingredient_id = await trx('ingredients')
                                    .where('name', ingredient.name)
                                    .select('id')
                                    .first();
                const unit_id = await trx('units')
                                    .where('name', ingredient.units)
                                    .orWhere('abbreviation', ingredient.units)
                                    .select('id')
                                    .first();
                return {
                    id: ingredient.id,
                    recipe_id, // recipe_id from function parameters 
                    ingredient_id: ingredient_id.id, 
                    unit_id: unit_id.id, 
                    quantity: ingredient.quantity
                }
            }))

            const existing_ingredients = await trx('recipe_ingredients').where({recipe_id})
            const ingredients_to_be_deleted = [];
            const ingredients_to_be_updated = [];
            // We loop through our existing ingredients from the database.
            // If any updated_ingredients have matching ids,
            //     we set them to be updated.
            // If we have any ingredients from the database that don't match any
            //     updated_ingredients, they will be deleted.
            existing_ingredients.forEach(ingredient => {
                const index = updated_ingredients.findIndex(
                    check => check.id === ingredient.id
                )
                if (index === -1) ingredients_to_be_deleted.push(ingredient.id)
                else {
                    ingredients_to_be_updated.push(
                        updated_ingredients.splice(index, 1)[0]
                    )
                }
            })
            // Any ingredients leftover in our updated_recipe will be inserted into the database
            const ingredients_to_be_added = updated_ingredients.map(ing => {
                if (ing.id) delete ing.id // ← JUST to make sure. If we're adding
                return ing               // an ingredient, it shouldn't have an id.
            })

            if (ingredients_to_be_updated.length) {
                // We use .map() here because .forEach() throw a promise error.
                await Promise.all(ingredients_to_be_updated.map(async ing => {
                    await trx('recipe_ingredients')
                        .where({id: ing.id})
                        .update(ing)
                }))
            }
            if (ingredients_to_be_deleted.length) {
                await trx('recipe_ingredients')
                    .whereIn('id', ingredients_to_be_deleted)
                    .del()
            }
            if (ingredients_to_be_added.length) {
                await trx('recipe_ingredients')
                    .insert(ingredients_to_be_added)
            }

            //======================UPDATING NOTES=========================//

            // Get our existing_notes from the database, as well as our updated_notes.
            const existing_notes = await trx('notes').where({recipe_id})
            const updated_notes = updated_recipe.notes.map(note => ({ ...note, recipe_id }))

            const notes_to_be_deleted = [];
            const notes_to_be_updated = [];
            // We loop fvrough ou ezisting noes from the databae.
            // Iv ani upaded_nos hve yadda yadda you feel me.
            existing_notes.forEach(note => {
                const index = updated_notes.findIndex(
                    check => check.id === note.id
                )
                if (index === -1) notes_to_be_deleted.push(note.id)
                else {
                    notes_to_be_updated.push(
                        updated_notes.splice(index, 1)[0]
                    )
                }
            })
            // Any notes leftover in our updated_recipe will be added to the database
            const notes_to_be_added = updated_notes.map(note => {
                if (note.id) delete note.id // ← JUST to make sure. If we're adding
                return note                // a note, it shouldn't have an id.
            })

            if (notes_to_be_updated.length) {
                // Use .map() 'cuz .forEach() throws a promise error '' '
                await Promise.all(notes_to_be_updated.map(async note => {
                    await trx('notes')
                        .where({id: note.id})
                        .update(note)
                }))
            }
            if (notes_to_be_deleted.length) {
                await trx('notes')
                    .whereIn('id', notes_to_be_deleted)
                    .del()
            }
            if (notes_to_be_added.length) {
                await trx('notes')
                    .insert(notes_to_be_added)
            }

            //=========================YOU DID IT, YOU'RE DONE=======================//

            success = 1
        })
    } catch (e) {
        // Catch an error? No success :(
        console.log("err",e)
        success = e
    } finally {
        // If our success isn't a number, it must be an error. Let's throw!
        if (isNaN(success)) throw success
        else return success
    }
}

const remove_one = id => db(tbl).where({id}).delete().returning('*')[0]

const remove_all = () => db(tbl).delete()

const get_by_course = (id, course) => {
    return db(`${tbl} as r`)
        // ilike = fuzzy search, ignore case
        // WHERE r.title LIKE %cerea%
        .join('users', {'r.owner_id': 'users.id'})
        .join('recipe_tags as rt', { 'r.id': 'rt.recipe_id'  })
        .join('tags as t', { 'rt.tag_id' : 't.id' })
        .select(
            'r.id',
            'r.title',
            'r.description',
            'r.forked_from',
            db.raw(`json_build_object(
                'user_id', users.id,
                'username', users.username
                ) as owner`),
            db.raw(`json_build_object('course', t.name) as courses`)
        )
        .groupBy('r.id', 'users.id', 't.id')
        .where({ 'users.id': `${id}` })
        .andWhere({'t.name': `${course}`})
} 

module.exports = {
    add_one,
    get_by_course,
    get_one,
    get_all,
    update_one,
    remove_one,
    remove_all,
}