const pool = require("../db");
const validator = require("validator");
const sanitizeHTML = require("sanitize-html");

let Nivel = function (data, params) {
  this.data = data;
  this.params = params;
  this.errors = [];
};

Nivel.prototype.cleanUp = function () {
  if (typeof this.data.nivelNro != "string") {
    this.data.nivelNro = "";
  }
  if (typeof this.data.nivelDescri != "string") {
    this.data.nivelDescri = "";
  }

  // get rid of any bogus properties
  this.data = {
    nivelNro: sanitizeHTML(this.data.nivelNro.trim(), {
      allowedTags: [],
      allowedAttributes: [],
    }),
    nivelDescri: sanitizeHTML(this.data.nivelDescri.trim().toUpperCase(), {
      allowedTags: [],
      allowedAttributes: [],
    }),
  };
};

Nivel.prototype.validate = function () {
  this.data.val = true;
  if (this.data.nivelNro == "") {
    this.errors.push("Te faltó cargar el nivel");
    this.data.val = false;
  }
  if (this.data.nivelNro != "" && !validator.isInt(this.data.nivelNro)) {
    this.errors.push("El nivel solo acepta datos numéricos");
    this.data.val = false;
  }
  if (this.data.nivelDescri == "") {
    this.errors.push("Te faltó cargar la descripción del nivel");
  }
};

Nivel.prototype.isUnique = function (action) {
  if (this.data.val) {
    return new Promise(async (resolve, reject) => {
      try {
        let count = "";
        if (action == "add") {
          count = await pool.query(
            `select count(nivel_cod) from niveles where nivel_cod = ${this.data.nivelNro}`
          );
        }

        if (action == "update") {
          count = await pool.query(
            `select count(nivel_cod) from niveles where nivel_descri = '${this.data.nivelDescri}'`
          );
        }
        if (count[0].count != "0") {
          this.errors.push("Ya existe este nivel");
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

Nivel.deleteNivel = function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      await pool.query(`delete from niveles where nivel_cod = ${id}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

Nivel.prototype.addNivel = function () {
  let nivel;
  return new Promise(async (resolve, reject) => {
    // first clean and validate data
    this.cleanUp();
    this.validate();
    await this.isUnique("add");
    // only if there are no errors proceedo to save into the database
    if (!this.errors.length) {
      try {
        nivel = await pool.query(
          `insert into niveles (nivel_cod, nivel_descri) values (
                    ${this.data.nivelNro},'${this.data.nivelDescri}')`
        );
        resolve(nivel);
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

Nivel.prototype.updateNivel = function () {
  return new Promise(async (resolve, reject) => {
    // first clean and validate data
    this.cleanUp();
    this.validate();
    await this.isUnique("update");

    // only if there are no errors proceedo to save into the database
    if (!this.errors.length) {
      try {
        let nivel = await pool.query(
          `update niveles set nivel_descri = '${this.data.nivelDescri}' 
          where nivel_cod = ${this.data.nivelNro}`
        );
        resolve(nivel);
      } catch {
        this.errors.push("Please try again later :)");
        reject(this.errors);
      }
    } else {
      reject(this.errors);
    }
  });
};

module.exports = Nivel;
