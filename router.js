const express = require("express")
const router = express.Router()
const UserController = require("./controllers/userController")
const RubrosController = require("./controllers/rubrosController")
const TipoProgramaController = require("./controllers/tipoProgramaController")

// rubros related routes
router.get("/", UserController.home)
router.post("/rubrosByNro", RubrosController.byNro)
router.post("/nivelById", RubrosController.nivel)
router.post("/tipoPrograma", TipoProgramaController.getTipoPrograma)
router.post("/addRubro", RubrosController.addRubro)

// user related routes
router.post("/logout", UserController.logOut)

module.exports = router
