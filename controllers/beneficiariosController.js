const Beneficiarios = require("../models/Beneficiarios")

exports.addBeneficiario = function (req, res) {
    let beneficiario = new Beneficiarios(req.body) 
    beneficiario.addBeneficiario().then(()=>{
      req.flash("success","¡Agregado con éxito!")
      req.session.save(()=> res.redirect(`/`))
    }).catch(function(errors){
      errors.forEach(error => req.flash("errors", error))
      req.session.save(()=> res.redirect(`/`))
      console.log(errors)
    })
  }
  
//   exports.updateBeneficiario = function (req, res) {
//     let beneficiario = new Beneficiarios(req.body, req.params) 
//     beneficiario.updateBeneficiario().then(()=>{
//       req.flash("success","¡Modificado con éxito!")
//       req.session.save(()=> res.redirect(`/`))
//     }).catch(function(errors){
//       errors.forEach(error => req.flash("errors", error))
//       req.session.save(()=> res.redirect(`/`))
//     })
//   }
  
//   exports.deleteBeneficiario = function (req, res) {
//     Beneficiarios.deleteBeneficiario(req.params.id).then(()=>{
//       req.flash("success","¡Eliminado con éxito!")
//       req.session.save(()=> res.redirect(`/`))
//     }).catch((error)=>{
//       req.flash("errors", error)
//       console.log(error)
//       req.session.save(()=> res.redirect(`/`))
//     })
//   }