const bcrypt = require("bcryptjs")
const pool = require("../db")
const md5 = require("md5")

let User = function (data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function () {
    if(typeof(this.data.username) != "string"){this.data.username = ""}
    if(typeof(this.data.password) != "string"){this.data.password = ""}

// get rid of any bogus properties
    this.data = {
        username: this.data.username.trim(),
        password: this.data.password
    }
}

User.prototype.login = async function(){
    return new Promise( async(resolve, reject)=>{
    this.cleanUp()
    try {
    let user = await pool.query(`select * from usuarios where usu_nombre = '${this.data.username}'`)  
    if (user && bcrypt.compareSync(this.data.password, user[0].usu_clave)) {
        resolve(user)
        }else{
        reject("Usuario o contraseña incorrectos")
        }    
   } catch (error) {
       console.log(error)
       reject("Usuario o contraseña incorrectos")
   }
    })
}



module.exports = User