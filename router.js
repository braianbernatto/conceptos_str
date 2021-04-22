const express = require("express")
const router = express.Router()
const UserController = require("./controllers/userController")
const RubrosController = require("./controllers/rubrosController")
const TipoProgramaController = require("./controllers/tipoProgramaController")
const BeneficiariosController = require("./controllers/beneficiariosController")

// rubros related routes
router.get("/", UserController.home)
router.post("/rubrosByNro", RubrosController.byNro)
router.post("/nivelById", RubrosController.nivel)
router.post("/tipoPrograma", TipoProgramaController.getTipoPrograma)
router.post("/addRubro", RubrosController.addRubro)
router.post("/deleteRubro/:id", RubrosController.deleteRubro)
router.post("/updateRubro/:id", RubrosController.updateRubro)

// beneficiarios related routes
router.post("/addBeneficiario", BeneficiariosController.addBeneficiario)

// user related routes
router.post("/logout", UserController.logOut)

module.exports = router
