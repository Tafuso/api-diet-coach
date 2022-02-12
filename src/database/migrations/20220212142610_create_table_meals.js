/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = knex => knex.schema.createTable('meals', table => {
  table.increments('id').primary()
  table.integer('user_id').unsigned()
  table.foreign('user_id').references('users.id')
  table.string('type_meals').notNullable()
  table.date('date').notNullable()
  table.string('protein')
  table.integer('protein_qtd')
  table.string('carbohydrate')
  table.integer('carbohydrate_qtd')
  table.string('vegetable')
  table.integer('vegetable_qtd')
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('meals')

