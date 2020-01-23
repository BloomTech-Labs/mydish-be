require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
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
  },
  testing: {
    client: "pg",
    connection: process.env.DATABASE_TEST_URL || {
      database: process.env.DB_TEST_NAME,
      user: process.env.DB_TEST_USER,
      password: process.env.DB_TEST_PASSWORD
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
