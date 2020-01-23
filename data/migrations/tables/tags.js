module.exports = tbl => {
    tbl.increments('id')
    tbl.text('name')
        .notNullable()
}