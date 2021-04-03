const express = require("express")
const router = express.Router()
const UserController = require("./controllers/userController")
const RubrosController = require("./controllers/rubrosController")

// user related routes
router.get("/", UserController.home)
router.post("/rubrosByNro", RubrosController.byNro)
router.post("/nivelById", RubrosController.nivel)
router.post("/tipoPrograma", RubrosController.tipoPrograma)

module.exports = router
