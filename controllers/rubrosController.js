const Rubros = require("../models/Rubros")

exports.byNro = async function (req, res) {
  try {
    let rubros = await Rubros.getRubrosByNro(req.body.nro)        
    res.json(rubros)  
      } catch (error) {
        console.log(error)
      }    
}

exports.nivel = async function (req, res) {
  try {
    let nivel = await Rubros.getNivel(req.body.id)        
    res.json(nivel)  
      } catch (error) {
        console.log(error)
      }    
}

exports.tipoPrograma = async function (req, res) {
  try {
    let tipo = await Rubros.getTipoPrograma(req.body.tipo, req.body.programa)        
    res.json(tipo)  
      } catch (error) {
        console.log(error)
      }    
}
