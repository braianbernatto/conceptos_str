const pool = require("../db");
const validator = require("validator");
const sanitizeHTML = require("sanitize-html")

let TipoPrograma = function (data, params) {
  this.data = data;
  this.params = params;
  this.errors = [];
};

TipoPrograma.getTipoPrograma = function (tipo, programa) {
  return new Promise(async (resolve, reject) => {
    try {
      let tipoPrograma = await pool.query(
        `select * from tipo_programa where tipo = ${tipo} and programa = ${programa}`
      );
      resolve(tipoPrograma);
    } catch {
      reject();
    }
  });
};

TipoPrograma.prototype.cleanUp = function () {
  if (typeof this.data.tipoNro != "string") {
    this.data.tipoNro = "";
  }
  if (typeof this.data.programaNro != "string") {
    this.data.programaNro = "";
  }
  if (typeof this.data.programaDescri != "string") {
    this.data.programaDescri = "";
  }

  // get rid of any bogus properties
  this.data = {
    tipoNro: sanitizeHTML(this.data.tipoNro.trim(), {allowedTags: [],allowedAttributes: [],}),
    programaNro: sanitizeHTML(this.data.programaNro.trim(), {allowedTags: [],allowedAttributes: [],}),
    programaDescri: sanitizeHTML(this.data.programaDescri.trim().toUpperCase(), {allowedTags: [],allowedAttributes: [],}),
  };
};

TipoPrograma.prototype.validate = function (action) {
  this.data.val = true;
  if (this.data.tipoNro == "") {
    this.errors.push("Te faltó cargar tipo");
    this.data.val = false;
  }
  if (this.data.tipoNro != "" && !validator.isInt(this.data.tipoNro)) {
    this.errors.push("Tipo solo acepta datos numéricos");
    this.data.val = false;
  }
  if (this.data.programaNro == "") {
    this.errors.push("Te faltó cargar programa");
  }
  if (this.data.programaNro != "" && !validator.isInt(this.data.programaNro)) {
    this.errors.push("Programa solo acepta datos numéricos");
  }
  if (this.data.rubroDescri == "") {
    this.errors.push("Te faltó cargar la descripción del rubro");
  }
};

TipoPrograma.prototype.isUnique = function () {
  if (this.data.val) {
    return new Promise(async (resolve, reject) => {
      try {
        let count = "";

          count = await pool.query(
            `select count(prog_descri) from tipo_programa where prog_descri = '${this.data.programaDescri}'`
          );
    
        if (count[0].count != "0") {
          this.errors.push("Ya existe este tipo programa");
          resolve(false);
        } else {
          resolve(true);
        }
      } catch {
        this.errors.push("Please try again later");
        reject(this.errors);
      }
    });
  }
};

TipoPrograma.deleteTipoPrograma = function (id, id2) {
  return new Promise(async (resolve, reject) => {
    try {
      await pool.query(
        `delete from tipo_programa where tipo = ${id} and programa = ${id2}`
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

TipoPrograma.prototype.addTipoPrograma = function () {
  let tipo;
  return new Promise(async (resolve, reject) => {
    // first clean and validate data
    this.cleanUp();
    this.validate();
    await this.isUnique();
    // only if there are no errors proceedo to save into the database
    if (!this.errors.length) {
      try {

        tipo = await pool.query(
            `insert into tipo_programa (tipo, programa, prog_descri) values (
                      ${this.data.tipoNro}, ${this.data.programaNro}, 
                      '${this.data.programaDescri}')`
          );

        resolve(tipo);
      } catch (e) {
        this.errors.push("Please try again later :)");
        console.log(e.message);
        reject(this.errors);
      }
    } else {
      reject(this.errors);
    }
  });
};

TipoPrograma.prototype.updateTipoPrograma = function () {
  return new Promise(async (resolve, reject) => {
    // first clean and validate data
    this.cleanUp();
    this.validate();
    await this.isUnique();

    // only if there are no errors proceedo to save into the database
    if (!this.errors.length) {
      try {
        let tipo = await pool.query(
          `update tipo_programa set prog_descri = '${this.data.programaDescri}' 
          where tipo =  ${this.data.tipoNro} and programa = ${this.data.programaNro}`
        );
        resolve(tipo);
      } catch {
        this.errors.push("Please try again later :)");
        reject(this.errors);
      }
    } else {
      reject(this.errors);
    }
  });
};

module.exports = TipoPrograma;
