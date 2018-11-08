// Require knexfile.js
const knexfile = require('../knexfile');
// Require knex, calling the function with the configuration from knexfile.js
const knex = require('knex')(knexfile["development"]);

// Export the module so that we will not have to run the configuration each time. If you need to make queries, require the module created in this file (client.js) 
module.exports = knex;