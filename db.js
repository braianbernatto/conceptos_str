const dotenv = require("dotenv")
dotenv.config()
const Pool = require("pg-promise")({})
const pgSession = require("connect-pg-simple")

const pool = Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
})

module.exports = pool


