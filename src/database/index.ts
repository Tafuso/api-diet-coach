import knex from "knex"
const connection = knex({
  client: 'pg',
  connection: {
    database: "dietcoach",
    user: "postgres",
    password: "1234"
  },
  migrations: {
    tableName: "knex_migrations",
    directory: `${__dirname}/src/database/migrations`
  }
})



export default connection