const express = require("express")
const router = express.Router()
const reservationCtrl =require('../controllers/reserController')

router.post("/add/:idcolis/:iduser",reservationCtrl.add)
router.get("/getReservationById/:id",reservationCtrl.getReservationById)
router.get("/getReservationByemail/:email",reservationCtrl.getReservationByemail)
router.get("/getReservationColis/:idcolis",reservationCtrl.getReservationByColis)

router.patch("/update/:id",reservationCtrl.updateReservation)
router.patch("/updateEtatcolis/:id",reservationCtrl.updateEtatcolis)
router.delete("/deleteReservation/:id",reservationCtrl.deleteReservation)

module.exports=router