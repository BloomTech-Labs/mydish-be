exports.up = function(knex) {
  return ( knex.schema.createTable('users', tbl => {
    tbl.increments('user_id'),
    tbl.text('username', 150),
    tbl.text('password', 150),
    tbl.text('first_name', 150),
    tbl.text('last_name', 150),
    tbl.text('email', 255),
    tbl.text('avatar_url', 255);
}).createTable('recipes', tbl => {
    tbl.increments('recipe_id'),
    tbl.text('title', 255).notNull(),
    //tbl.integer('forked_from_id')
    //tbl.integer('parent_id')
    tbl.integer('owner_id').references('user_id').inTable('users').notNull().onUpdate('CASCADE').onDelete('set null'),
    tbl.text('prepTime'),
    tbl.text('cookTime'),
    tbl.text('desc', 255)
}).createTable('instructions', tbl => {
    tbl.increments(),
    tbl.integer('recipe_id').references('recipe_id').inTable('recipes').notNull().onUpdate('CASCADE').onDelete('set null'),
    tbl.integer('step_number'),
    tbl.text('desc', 255)
}).createTable('ingredients', tbl => {
    tbl.increments(),
    tbl.text('name', 255),
    tbl.text('desc', 255)
}).createTable('units', tbl => {
    tbl.increments(),
    tbl.text('name', 255).notNull(),
    tbl.text('abbreviation', 5)
}).createTable('ingredient_list', tbl => {
    tbl.increments(),
    tbl.integer('recipe_id').references('recipe_id').inTable('recipes').notNull().onUpdate('CASCADE').onDelete('set null'),
    tbl.integer('ingredient_id').references('id').inTable('ingredients').notNull().onUpdate('CASCADE').onDelete('set null'),
    tbl.integer('unit_id').references('id').inTable('units').notNull().onUpdate('CASCADE').onDelete('set null')
})
  );
}

exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('users')
      .dropTableIfExists('recipes')
      .dropTableIfExists('instructions')
      .dropTableIfExists('ingredients')
      .dropTableIfExists('units')
      .dropTableIfExists('ingredient_list');
  };