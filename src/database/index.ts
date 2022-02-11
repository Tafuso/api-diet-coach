import knexfile from '../../knexfile';
const knex = require('knex')(knexfile.development)


module.exports = knex