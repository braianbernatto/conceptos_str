const express = require("express")
const router = express.Router()
const UserController = require("./controllers/userController")
const RubrosController = require("./controllers/rubrosController")
const TipoProgramaController = require("./controllers/tipoProgramaController")
const BeneficiariosController = require("./controllers/beneficiariosController")
const NivelController = require("./controllers/nivelController")

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
router.post("/deleteBeneficiario/:id", BeneficiariosController.deleteBeneficiario)
router.post("/updateBeneficiario/:id", BeneficiariosController.updateBeneficiario)

// nivel related routes
router.post("/addNivel", NivelController.addNivel)
router.post("/deleteNivel/:id", NivelController.deleteNivel)
router.post("/updateNivel", NivelController.updateNivel)

// tipo related routes
router.post("/addTipoPrograma", TipoProgramaController.addTipoPrograma)
router.post("/deleteTipoPrograma/:id/:id2", TipoProgramaController.deleteTipoPrograma)
router.post("/updateTipoPrograma", TipoProgramaController.updateTipoPrograma)

// user related routes
router.post("/logout", UserController.logOut)

module.exports = router
