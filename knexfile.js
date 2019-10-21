// Update with your config settings.

  module.exports = {
    development: {
      client: "pg",
      connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
      },
      useNullAsDefault: true,
      pool: {
        afterCreate: (conn, done) => {
          //runs after connecting to postgreSQL
          conn.run('PRAGMA foreign_keys = ON', done) // turn on foreign key enforcement
        },
      },
      migrations: {
        directory: "./data/migrations"
      },
      seeds: {
        directory: "./data/seeds"
      }
    },
    production: {
      client: "pg",
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: "./data/migrations"
      },
      seeds: {
        directory: "./data/seeds"
      }
    }
  };
