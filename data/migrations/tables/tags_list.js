module.exports = tbl => {
    tbl.increments('id')
    tbl.integer('recipe_id')
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .notNullable()
    tbl.integer('tag_id')
        .references('id')
        .inTable('tags')
        .onDelete('CASCADE')
        .notNullable()
}