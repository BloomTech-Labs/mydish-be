module.exports = tbl => {
    tbl.increments('id')
    tbl.text('name')
        .unique()
        .notNullable()
    tbl.text('category')
        .notNullable()
    tbl.text('description')
}