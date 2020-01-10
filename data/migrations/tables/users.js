module.exports = tbl => {
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
    }
