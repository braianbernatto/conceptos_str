const TipoPrograma = require("../models/TipoPrograma");

exports.getTipoPrograma = async function (req, res) {
  try {
    let tipo = await TipoPrograma.getTipoPrograma(
      req.body.tipo,
      req.body.programa
    );
    res.json(tipo);
  } catch (error) {
    console.log(error);
  }
};

exports.addTipoPrograma = function (req, res) {
  let tipoprograma = new TipoPrograma(req.body);
  tipoprograma
    .addTipoPrograma()
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

exports.updateTipoPrograma = function (req, res) {
  let tipoprograma = new TipoPrograma(req.body);
  tipoprograma
    .updateTipoPrograma()
    .then(() => {
      req.flash("success", "¡Modificado con éxito!");
      req.session.save(() => res.redirect(`/`));
    })
    .catch(function (errors) {
      errors.forEach((error) => req.flash("errors", error));
      req.session.save(() => res.redirect(`/`));
    });
};

exports.deleteTipoPrograma = function (req, res) {
  TipoPrograma.deleteTipoPrograma(req.params.id, req.params.id2)
    .then(() => {
      req.flash("success", "¡Eliminado con éxito!");
      req.session.save(() => res.redirect(`/`));
    })
    .catch((error) => {
      req.flash("errors", error);
      console.log(error);
      req.session.save(() => res.redirect(`/`));
    });
};
