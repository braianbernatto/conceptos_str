const dotenv = require("dotenv")
dotenv.config()
const Pool = require("pg-promise")({})

const connectionString = 
{
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {rejectUnauthorized : false,
    }
  }
//`postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?ssl=true`
const pool = Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: process.env.PGHOST == "localhost" ? false : true
})

module.exports = pool

const app = require("./app")
app.listen(process.env.PORT, function() {
    console.log("Server is running on port " + process.env.PORT)
})



