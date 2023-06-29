const express = require("express")
const router = express.Router()
const userCtrl =require('../controllers/userController')

router.post("/register",userCtrl.register)
router.post("/login",userCtrl.login)
router.get("/getUserId/:id",userCtrl.getUserById)


router.patch("/update/:id",userCtrl.updateUserProfil)
router.patch("/changepass/:id",userCtrl.resetpass)
router.delete("/delete/:id",userCtrl.deleteUser)
router.post("/upload/:id",userCtrl.updateimage)




module.exports=router