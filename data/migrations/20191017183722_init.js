
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
    tbl.foreign('recipe_id').references('id').inTable('recipes');
    tbl.text('name', 128).primary().unique().notNullable();
    tbl.text('unit', 128).notNullable();
    tbl.float('quantity');
  })
  //creates steps table also referrencing the recipe id as a foreign key
  .createTable('steps', tbl => {
    tbl.foreign('recipe_id').references('id').inTable('recipes');
    tbl.decimal('ordinal').unique().notNullable();
    tbl.text('body', 1000).notNullable();
  })
  //creates a catagories table, each catagory can reference multiple recipe IDs as foreign keys
  .createTable('catagories', tbl => {
    tbl.foreign('recipe_id').references('id').inTable('recipes');
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
    tbl.foreign('old_recipe').references('id').inTable('recipes');
    tbl.foreign('new_recipe').references('id').inTable('recipes').notNullable();
    tbl.foreign('cook_id').references('id').inTable('cooks').notNullable();
  })
  //likes table to track which user has liked which recipes
  .createTable('likes', tbl => {
    tbl.foreign('cook_id').references('id').inTable('cooks');
    tbl.foreign('recipe_id').references('id').inTable('recipes');
  })
  //saves table to track which recipes are saved to which user's cookbook
  .createTable('saves', tbl => {
    tbl.foreign('cook_id').references('id').inTable('cooks');
    tbl.foreign('recipe_id').references('id').inTable('recipes');
  })
};

//for dropping all tables
exports.down = function(knex) {
    const killIt = () => {
        knex.schema.dropTableIfExists('saves');
        knex.schema.dropTableIfExists('ingredients');
        knex.schema.dropTableIfExists('steps');
        knex.schema.dropTableIfExists('catagories');
        knex.schema.dropTableIfExists('cooks');
        knex.schema.dropTableIfExists('edits');
        knex.schema.dropTableIfExists('likes');
        knex.schema.dropTableIfExists('saves');
    }
  return killIt();
};
