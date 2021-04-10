const tipoPrograma = require("../models/TipoPrograma")


exports.getTipoPrograma = async function (req, res) {
    try {
      let tipo = await tipoPrograma.getTipoPrograma(req.body.tipo, req.body.programa)        
      res.json(tipo)  
        } catch (error) {
          console.log(error)
        }    
  }
  