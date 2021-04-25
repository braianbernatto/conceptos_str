const pool = require("../db")

exports.home = async function (req, res) {
    try {
        // let caja = await pool.query("select rub_descri from rubros where rub_cod = 0")        
        let benef = await pool.query("select * from descuentos")     

        let mes = await pool.query("select * from mes")   

        let nivel = await pool.query("select * from niveles order by 1")        
        
        let tipo = await pool.query("select * from tipo_programa order by 2")        
        
        if (req.session.views) {
          req.session.views++
          
        }else{
          req.session.views = 1
          
        }
        req.session.save()
        console.log(req.session.views)
        res.render("main", {benef: benef, mes: mes, views: req.session.wiews, nivel: nivel, tipo: tipo})   
        
      } catch (error) {
        console.log(error)
      }
}

exports.logOut = function (req, res) {
  console.log(req.session)   
  req.session.destroy()
  console.log(req.session)   
  res.send("You are now logged out")
}