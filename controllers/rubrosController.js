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

exports.addRubro = function (req, res) {
  let rubros = new Rubros(req.body) 
  rubros.addRubro().then(()=>{
    req.flash("success","¡Agregado con éxito!")
    req.session.save(()=> res.redirect(`/`))
  }).catch(function(errors){
    errors.forEach(error => req.flash("errors", error))
    req.session.save(()=> res.redirect(`/`))
    console.log(errors)
  })
}