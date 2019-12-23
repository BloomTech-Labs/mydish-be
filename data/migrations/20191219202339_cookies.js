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
            tbl.text('description')
        }),
        knex.schema.createTable('ingredients', tbl => {
            tbl.increments('id')
            tbl.text('name')
                .notNullable()
            tbl.text('category')
                .notNullable()
            tbl.text('description')
        }),
        knex.schema.createTable('units', tbl => {
            tbl.increments('id')
            tbl.text('name')
                .notNullable()
            tbl.text('type')
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
        knex.schema.dropTable('ingredients_list', true),
        knex.schema.dropTable('ingredients', true),
        knex.schema.dropTable('units', true),
        knex.schema.dropTable('instructions', true),
        knex.schema.dropTable('recipes', true),
        knex.schema.dropTable('users', true),
    ])
}
