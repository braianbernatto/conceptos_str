const pool = require("../db");
const User = require("../models/User");

exports.home = async function (req, res) {
  if (req.session.user) {
    try {
      let benef = await pool.query("select * from descuentos order by 1");
  
      let mes = await pool.query("select * from mes order by 1");
  
      let nivel = await pool.query("select * from niveles order by 1");
  
      let tipo = await pool.query("select * from tipo_programa order by 2");
  
      if (req.session.views) {
        req.session.views++;
      }else{ req.session.views = 1}

      console.log(req.session.views);
     
      res.render("main", {
        benef: benef,
        mes: mes,
        views: req.session.wiews,
        nivel: nivel,
        tipo: tipo,
      });
    } catch (error) {
      console.log(error);
    }
  }else{
    res.redirect("/login");
  }
};

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (user) {
      req.session.user = { user: user[0].usu_nombre };
      let gender = user[0].usu_sexo
      gender = gender.trim() == "m"? "o" : "a"            
      req.flash("success", `Bienvenid${gender} ${user[0].usu_nombre}`);
      req.session.save(function () {
        res.redirect("/");
      });
      
    })
    .catch(function (e) {
      req.flash("errors", e);
      req.session.save();
      res.redirect("/login");
    });
};

exports.logForm = function (req, res) {
  res.render("loginForm");
};

exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect("/login");
  });
};
