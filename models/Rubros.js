const pool = require("../db")

let Rubros = function (nro, descri) {
  this.nro = nro
  this.descri = descri
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

  Rubros.getTipoPrograma = function (tipo, programa) {
    return new Promise(async (resolve, reject) => {
      try {
        let tipoPrograma = await pool.query(
          `select * from tipo_programa where tipo = ${tipo} and programa = ${programa}`
        )
        resolve(tipoPrograma)
      } catch {
        reject()
      }
    })
  }

module.exports = Rubros
