const pool = require("../db")

exports.home = async function (req, res) {
    try {
        // let caja = await pool.query("select rub_descri from rubros where rub_cod = 0")        
        
        let benef = await pool.query("select desc_beneficiario from descuentos")     

        let mes = await pool.query("select mes_descri from mes")        
        
        res.render("main", {benef: benef, mes: mes})       
                  
      } catch (error) {
        console.log(error)
      }
}
