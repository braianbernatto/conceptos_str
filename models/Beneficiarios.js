const pool = require("../db");
const sanitizeHTML = require("sanitize-html");

let Beneficiario = function (data, params) {
  this.data = data;
  this.params = params;
  this.errors = [];
};

Beneficiario.prototype.cleanUp = function () {
  if (typeof this.data.BenefDescri != "string") {
    this.data.BenefDescri = "";
  }
  // get rid of any bogus properties
  this.data = {
    BenefDescri: sanitizeHTML(this.data.BenefDescri.trim().toUpperCase(), {
      allowedTags: [],
      allowedAttributes: [],
    }),
  };
};

Beneficiario.prototype.validate = function () {
  if (this.data.BenefDescri == "") {
    this.errors.push("Te faltó cargar la descripción del beneficiario");
  }
};

Beneficiario.prototype.isUnique = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let count = "";
      count = await pool.query(
        `select count(desc_cod) from descuentos where desc_beneficiario = '${this.data.BenefDescri}'`
      );
      if (count[0].count != "0") {
        this.errors.push("Ya existe este beneficiario");
        resolve(false);
      } else {
        resolve(true);
      }
    } catch {
      this.errors.push("Please try again later");
      reject(this.errors);
    }
  });
};

Beneficiario.prototype.addBeneficiario = function () {
  let beneficiario;
  return new Promise(async (resolve, reject) => {
    // first clean and validate data
    this.cleanUp();
    this.validate();
    await this.isUnique();
    // only if there are no errors proceedo to save into the database
    if (!this.errors.length) {
      try {
        beneficiario = await pool.query(
          `insert into descuentos (desc_cod, desc_beneficiario) values ((select max(desc_cod)+1 as new from descuentos), '${this.data.BenefDescri}')`
        );
        resolve(beneficiario);
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

Beneficiario.deleteBeneficiario = function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      await pool.query(`delete from descuentos where desc_cod =  ${id}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

Beneficiario.prototype.updateBeneficiario = function () {
  return new Promise(async (resolve, reject) => {
    // first clean and validate data
    this.cleanUp();
    this.validate();
    await this.isUnique();

    // only if there are no errors proceedo to save into the database
    if (!this.errors.length) {
      try {
        let beneficiario = await pool.query(
          `update descuentos set desc_beneficiario = '${this.data.BenefDescri}'
            where desc_cod = ${this.params.id}`
        );
        resolve(beneficiario);
      } catch {
        this.errors.push("Please try again later :)");
        reject(this.errors);
      }
    } else {
      reject(this.errors);
    }
  });
};

module.exports = Beneficiario;
