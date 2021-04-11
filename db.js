const dotenv = require("dotenv")
dotenv.config()
const Pool = require("pg-promise")({})

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

const pool = Pool({
    connectionString: connectionString
})

module.exports = pool

const app = require("./app")
app.listen(process.env.PORT, function() {
    console.log("Server is running on port " + process.env.PORT)
})



