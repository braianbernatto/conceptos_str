const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "5353",
    host: "localhost",
    port: 5432,
    database: "conceptos_str"

});

module.exports = pool;
