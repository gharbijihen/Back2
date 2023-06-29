const express = require("express")
const router = express.Router()
const colis =require('../controllers/colisController')

router.post("/add",colis.createcolis)
router.get("/all",colis.getAllcolis)
router.get("/search/:from/:to",colis.getColisBySearch)
router.get("/getcolibyid/:id",colis.getcolibyid)
router.get("/getallcolibyid/:id",colis.getAllcolisbyid)
router.get("/getAllFavoris",colis.getAllFavoris)
router.put("/addFarovis/:id",colis.addFarovis)


router.delete("/delete/:id",colis.deletecolis)
module.exports=router
