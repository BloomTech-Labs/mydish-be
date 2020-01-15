module.exports = tbl => {
    tbl.increments('id')
    tbl.integer('recipe_id')
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
    tbl.text('changes')
    tbl.datetime('date_modified').defaultTo(knex.fn.now())
    tbl.integer('revision_number')
}