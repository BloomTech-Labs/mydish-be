
exports.up = function(knex) {
  return knex.schema
  //creates recipes table and necessary columns 
  .createTable('recipes', tbl => {
    tbl.increments('id'); 
    tbl.text('title', 128).unique().notNullable();
    tbl.integer('minutes').notNullable();
    tbl.text('notes', 2000);
  })
  //creates ingredients table referrencing the recipe id as a foreign key
  .createTable('ingredients', tbl => {
    tbl.integer('recipe_id').unsigned().notNullable().references('id').inTable('recipes');
    tbl.text('name', 128).primary().unique().notNullable();
    tbl.text('unit', 128).notNullable();
    tbl.float('quantity');
  })
  //creates steps table also referrencing the recipe id as a foreign key
  .createTable('steps', tbl => {
    tbl.integer('recipe_id').unsigned().notNullable().references('id').inTable('recipes');
    tbl.decimal('ordinal').unique().notNullable();
    tbl.text('body', 1000).notNullable();
  })
  //creates a catagories table, each catagory can reference multiple recipe IDs as foreign keys
  .createTable('catagories', tbl => {
    tbl.integer('recipe_id').unsigned().notNullable().references('id').inTable('recipes');
    tbl.text('name', 128).primary().unique().notNullable();
  })
  //cooks table is basically a user table
  .createTable('cooks', tbl => {
    tbl.increments('id');
    tbl.text('username', 128).unique().notNullable();
    tbl.text('password', 256).notNullable();
  })
  //edits table for later functionality, will be used to track edits in future migrations
  .createTable('edits', tbl => {
    tbl.increments('id');
    tbl.integer('old_recipe').unsigned().notNullable().references('id').inTable('recipes');
    tbl.integer('new_recipe').unsigned().notNullable().references('id').inTable('recipes');
    tbl.integer('cook_id').references('id').inTable('cooks').notNullable();
  })
  //likes table to track which user has liked which recipes
  .createTable('likes', tbl => {
    tbl.integer('cook_id').unsigned().notNullable().references('id').inTable('cooks');
    tbl.integer('recipe_id').unsigned().notNullable().references('id').inTable('recipes');
  })
  //saves table to track which recipes are saved to which user's cookbook
  .createTable('saves', tbl => {
    tbl.integer('cook_id').unsigned().notNullable().references('id').inTable('cooks');
    tbl.integer('recipe_id').unsigned().notNullable().references('id').inTable('recipes');
  })
};

//for dropping all tables
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('saves')
        .dropTableIfExists('likes')
        .dropTableIfExists('edits')
        .dropTableIfExists('cooks')
        .dropTableIfExists('catagories')
        .dropTableIfExists('steps')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipes');
};
