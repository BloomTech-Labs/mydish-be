exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('users', tbl => {
            tbl.increments('id')
            tbl.text('username', 24)
                .unique()
                .notNullable()
            tbl.text('password')
                .notNullable()
            tbl.text('first_name')
            tbl.text('last_name')
            tbl.text('email')
            tbl.text('avatar_url')
        }),
        knex.schema.createTable('recipes', tbl => {
            tbl.increments('id')
            tbl.text('title')
                .notNullable()
            tbl.integer('parent_id')
                .references('id')
                .inTable('recipes')
            tbl.integer('forked_from')
                .references('id')
                .inTable('recipes')
            tbl.integer('owner_id')
                .references('id')
                .inTable('users')
            tbl.integer('prep_time')
            tbl.integer('cook_time')
            tbl.text('description')
        }),
        knex.schema.createTable('instructions', tbl => {
            tbl.increments('id')
            tbl.integer('recipe_id')
                .references('id')
                .inTable('recipes')
                .onUpdate('CASCADE')
                .onDelete('set null')
                .notNullable()
            tbl.integer('step_number')
            tbl.text('desription')
        }),
        knex.schema.createTable('ingredients', tbl => {
            tbl.increments('id')
            tbl.text('name')
            tbl.text('description')
        }),
        knex.schema.createTable('units', tbl => {
            tbl.increments('id')
            tbl.text('name')
                .notNullable()
            tbl.text('abbreviation', 4)
        }),
        knex.schema.createTable('ingredients_list', tbl => {
            tbl.increments('id')
            tbl.integer('recipe_id')
                .references('id')
                .inTable('recipes')
                .onUpdate('CASCADE')
                .onDelete('set null')
                .notNullable()
            tbl.integer('ingredient_id')
                .references('id')
                .inTable('ingredients')
                .onUpdate('CASCADE')
                .onDelete('set null')
                .notNullable()
            tbl.integer('unit_id')
                .references('id')
                .inTable('units')
                .onUpdate('CASCADE')
                .onDelete('set null')
                .notNullable()
        })
    ])
}

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('users'),
        knex.schema.dropTableIfExists('recipes'),
        knex.schema.dropTableIfExists('instructions'),
        knex.schema.dropTableIfExists('ingredients'),
        knex.schema.dropTableIfExists('units'),
        knex.schema.dropTableIfExists('ingedient_list')
    ])
}
