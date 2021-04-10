const pool = require("../db")

let tipoPrograma = function (tipo, programa, descri) {
    this.tipo = tipo
    this.programa = programa
    this.descri = descri
    this.errors = []
}

tipoPrograma.getTipoPrograma = function (tipo, programa) {
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

module.exports = tipoPrograma