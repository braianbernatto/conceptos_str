const Nivel = require("../models/Nivel");

exports.addNivel = function (req, res) {
  let nivel = new Nivel(req.body);
  nivel
    .addNivel()
    .then(() => {
      req.flash("success", "¡Agregado con éxito!");
      req.session.save(() => res.redirect(`/`));
    })
    .catch(function (errors) {
      errors.forEach((error) => req.flash("errors", error));
      req.session.save(() => res.redirect(`/`));
      console.log(errors);
    });
};

exports.updateNivel = function (req, res) {
  let nivel = new Nivel(req.body);
  nivel
    .updateNivel()
    .then(() => {
      req.flash("success", "¡Modificado con éxito!");
      req.session.save(() => res.redirect(`/`));
    })
    .catch(function (errors) {
      errors.forEach((error) => req.flash("errors", error));
      req.session.save(() => res.redirect(`/`));
    });
};

exports.deleteNivel = function (req, res) {
  Nivel.deleteNivel(req.params.id)
    .then(() => {
      req.flash("success", "¡Eliminado con éxito!");
      req.session.save(() => res.redirect(`/`));
    })
    .catch((error) => {
      req.flash("errors", error.detail);
      console.log(error);
      req.session.save(() => res.redirect(`/`));
    });
};
