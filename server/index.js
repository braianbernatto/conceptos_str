const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/conceptos_str", async (req, res) => {
    try {
    
     const consulta = await pool.query("select rub_descri from rubros");
    res.json(consulta.rows);
    } catch (error) {
        console.error(error.message);
    }
});


app.listen(5000, () => {
    console.log("server listen on port 5000");
});