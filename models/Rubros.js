const pool = require("../db");
const validator = require("validator");

let Rubros = function (data, params) {
  this.data = data;
  this.params = params;
  this.errors = [];
};

Rubros.prototype.cleanUp = function (action) {
  
  if (typeof this.data.rubroNro != "string") {
    this.data.rubroNro = "";
  }
  if (typeof this.data.rubroDescri != "string") {
    this.data.rubroDescri = "";
  }
  if (typeof this.data.rubroNivel != "string") {
    this.data.rubroNivel = "";
  }
  
  // get rid of any bogus properties
  this.data = {
    rubroNro: this.data.rubroNro.trim(),
    rubroDescri:  this.data.rubroDescri.trim().toUpperCase(),
    rubroNivel: this.data.rubroNivel.trim(),    
  };
  
  if (action == "update") {
    if (typeof this.params.id2 != "string") {
      this.params.id2 = "";
    }
    this.params = {
      id2: this.params.id2
    }
  }
};

Rubros.prototype.validate = function (action) {
  this.data.val = true;  
  if (this.data.rubroNro == "") {
    this.errors.push("Te faltó cargar el rubro");
    this.data.val = false;
  }
  if (this.data.rubroNro != "" && !validator.isInt(this.data.rubroNro)) {
    this.errors.push("El rubro solo acepta datos numéricos");
    this.data.val = false;
  }
  if (this.data.rubroDescri == "") {
    this.errors.push("Te faltó cargar la descripción del rubro");
  }
  if (this.data.rubroNivel == "") {
    this.errors.push("Te faltó cargar el nivel");
  }
  if (this.data.rubroNivel != "" && !validator.isInt(this.data.rubroNivel)
  ) {
    this.errors.push("El nivel solo acepta datos numéricos");
  }
  
  if (action == "update") {
    if (this.params.id2 == "") {
      this.errors.push("Falta el segundo ID");
    }
    if (this.params.id2 != "" && !validator.isInt(this.params.id2)
    ) {
      this.errors.push("El segundo ID debe ser un número");
    }
  }
};

Rubros.prototype.isUnique = function (action) {
  if (this.data.val) {
    return new Promise(async (resolve, reject) => {
      try {
        let count = ""
        if(action == "add"){
          count = await pool.query(
          `select count(rub_cod) from rubros where rub_cod = ${this.data.rubroNro} and rub_descri =
          '${this.data.rubroDescri}'`
          );
        }

        if(action == "update"){
          count = await pool.query(
          `select count(rub_cod) from rubros where rub_cod = ${this.data.rubroNro} and rub_descri =
          '${this.data.rubroDescri}' and nivel_cod =  ${this.data.rubroNivel}`
          );
        }
          if (count[0].count != "0") {
            this.errors.push("Ya existe esta descripción en el mismo rubro");
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
  
  Rubros.deleteRubro = function (id, id2) {
    return new Promise(async (resolve, reject) => {
      try {
        await pool.query(
          `delete from rubros where rub_cod = ${id} and rub_cod2 = ${id2}`
          );
          resolve();
        } catch(error) {
          reject(error);
        }
      });
    };
    
    Rubros.prototype.addRubro = function () {
      return new Promise(async (resolve, reject) => {
        // first clean and validate data
        this.cleanUp("add");
        this.validate("add");
        await this.isUnique("add");
        // only if there are no errors proceedo to save into the database
        if (!this.errors.length) {
            try {
              let rubro = await pool.query(
                `insert into rubros (rub_cod, rub_cod2, rub_descri, nivel_cod) values (
                  ${this.data.rubroNro}, (select max(rub_cod2)+1 as new from rubros where rub_cod = ${this.data.rubroNro}) , 
              '${this.data.rubroDescri}', ${this.data.rubroNivel})`
        );
        resolve(rubro);
      } catch {
        this.errors.push("Please try again later :)");
        reject(this.errors);
      }
    } else {
      reject(this.errors);
    }
  });
};

Rubros.prototype.updateRubro = function () {
  return new Promise(async (resolve, reject) => {
    // first clean and validate data
    this.cleanUp("update");
    this.validate("update");
    await this.isUnique("update");

    // only if there are no errors proceedo to save into the database
    if (!this.errors.length) {
      try {
        let rubro = await pool.query(
          `update rubros set rub_descri = '${this.data.rubroDescri}', nivel_cod = ${this.data.rubroNivel} 
          where rub_cod =  ${this.data.rubroNro} and rub_cod2 = ${this.params.id2}`
        );
        resolve(rubro);
      } catch {
        this.errors.push("Please try again later :)");
        reject(this.errors);
      }
    } else {
      reject(this.errors);
    }
  });
};

Rubros.getRubrosByNro = function (nro) {
  return new Promise(async (resolve, reject) => {
    try {
      let rubro = await pool.query(
        `select * from rubros where rub_cod = ${nro}`
      );
      resolve(rubro);
    } catch {
      reject();
    }
  });
};

Rubros.getNivel = function (nro) {
  return new Promise(async (resolve, reject) => {
    try {
      let nivel = await pool.query(
        `select * from niveles where nivel_cod = ${nro}`
      );
      resolve(nivel);
    } catch {
      reject();
    }
  });
};

module.exports = Rubros;
