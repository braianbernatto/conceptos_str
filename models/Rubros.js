const pool = require("../db")
const validator = require("validator")

let Rubros = function (data) {
  this.data = data
  this.errors = []
}

Rubros.prototype.cleanUp = function () {
  if(typeof(this.data.addRubroNro) != "string"){this.data.addRubroNro = ""}
  if(typeof(this.data.addRubroDescri) != "string"){this.data.addRubroDescri = ""}
  if(typeof(this.data.addRubroNivel) != "string"){this.data.addRubroNivel = ""}

  // get rid of any bogus properties
  this.data = {
    addRubroNro: this.data.addRubroNro.trim(),
    addRubroDescri: this.data.addRubroDescri.trim().toUpperCase(),
    addRubroNivel: this.data.addRubroNivel.trim()
  }
}

Rubros.prototype.validate = function () {
  this.data.val = true
  if (this.data.addRubroNro == "") {this.errors.push("Te faltó cargar el rubro")
    this.data.val = false}
  if (this.data.addRubroNro != "" && !validator.isInt(this.data.addRubroNro)) {
    this.errors.push("El rubro solo acepta datos numéricos")
    this.data.val = false}
  if (this.data.addRubroDescri == "") {this.errors.push("Te faltó cargar la descripción del rubro")}
  if (this.data.addRubroNivel == "") {this.errors.push("Te faltó cargar el nivel")}
  if (this.data.addRubroNivel != "" && !validator.isInt(this.data.addRubroNivel)) {this.errors.push("El nivel solo acepta datos numéricos")}
}

Rubros.prototype.isUnique = function () {
  if (this.data.val){
  return new Promise(async (resolve, reject) => {
      try {    
        let count = await pool.query(
          `select count(rub_cod) from rubros where rub_cod = ${this.data.addRubroNro} and rub_descri =
           '${this.data.addRubroDescri}'`
        )
        if (count[0].count != "0") {
          this.errors.push("Ya existe esta descripción en el mismo rubro")
          resolve(false)
        }else{
          resolve(true)
        }
      } catch {
        this.errors.push("Please try again later")
        reject(this.errors)
      }    
  })
}
}


Rubros.prototype.addRubro = function () {
  return new Promise(async (resolve, reject) => {
    // first clean and validate data
    this.cleanUp()
    this.validate()
    await this.isUnique()

    // only if there are no errors proceedo to save into the database
      if (!this.errors.length) {
        try {
          let rubro = await pool.query(
            `insert into rubros (rub_cod, rub_cod2, rub_descri, nivel_cod) values (
              ${this.data.addRubroNro}, (select max(rub_cod2)+1 as new from rubros where rub_cod = ${this.data.addRubroNro}) , 
              '${this.data.addRubroDescri}', ${this.data.addRubroNivel})`
              )
              resolve(rubro)
            } catch {
              this.errors.push("Please try again later :)")
              reject(this.errors)
      }
    }else{
      reject(this.errors)
    }

    })
}
  

Rubros.getRubrosByNro = function (nro) {
  return new Promise(async (resolve, reject) => {
    try {
      let rubro = await pool.query(
        `select * from rubros where rub_cod = ${nro}`
      )
      resolve(rubro)
    } catch {
      reject()
    }
  })
}

Rubros.getNivel = function (nro) {
  return new Promise(async (resolve, reject) => {
    try {
      let nivel = await pool.query(
        `select * from niveles where nivel_cod = ${nro}`
      )
      resolve(nivel)
    } catch {
      reject()
    }
  })
}

module.exports = Rubros
