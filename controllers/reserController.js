const { Model } = require('sequelize');
const Reservation = require('../models/reservation');
const Colis = require('../models/Colis');
const user= require('../models/users');
const reservation = require('../models/reservation');

const reservationCtrl = {

  add: async (req, res) => {
    const today = new Date();
  
    console.log("aaaa")
    try {
      const colisinfo = await Colis.findOne({
        include: [{
          model: user,
          attributes: ['firstname', 'lastname', 'email', 'url1', 'image']
        }],
        where: {
          id: req.params.idcolis
        }
      });
  
      console.log(colisinfo, "colisinfo");
  
      const reserData = {
        iduser: req.params.iduser,
        idcolis: req.params.idcolis,
        emailconnect: colisinfo.user.email
      };
  
      console.log("data=>>>>>>>>>>", reserData);
  
      const newreservation = await Reservation.create(reserData);
      console.log(newreservation).then(
        res.json({
          "message": "reservation created"
        })
      )
     
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  
  getReservationByemail: async (req, res) => {

    try {
      await Reservation.findAll({
        where: {
          emailconnect: req.params.email,
          accept: true,
        },
        include: [{
          model: Colis,
          attributes: ['from', 'to', "date1", "date2", "userId"]
        }, {
          model: user,
          attributes: ['firstname', 'lastname', 'url1', 'image']
        }]

      }
      )
        .then(result => {
          console.log(result);
          res.json(result);
        })
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  updateEtatcolis: async (req, res) => {
    const check = req.body.etat
    console.log(check)
    try {
        reservation.findOne({
            where: {
              id : req.params.id
          }
        }).then((Colis)=>{
           
            if(check=== 'en cours'){
                reservation.update({
                    etat : "en cours"},{where:{id:req.params.id}}
                )
            }else{
                reservation.update({
                    etat : "livrer"},{where:{id:req.params.id}}
                )
            }
        })
            .then(result => {
                console.log(result,"aaaaa");
                res.json(result);
            })
    } catch (error) {
        res.json({ message: error.message });
    }
},
  getReservationById: async (req, res) => {

    try {
      await Reservation.findAll({
        where: {
          iduser: req.params.id,
          accept: true,
        },
        include: [{
          model: Colis,
          attributes: ['id','from', 'to', "date1", "date2", "userId",'etat','userId',"poidDispo","price"],
          include :[{
            model: user,
            attributes: ['firstname', 'lastname', 'url1', 'image','email','phone',"uuid"]
          },]
        }, {
          model: user,
          attributes: ['firstname', 'lastname', 'url1', 'image','email','phone']
        }, ]

      }
      )
        .then(result => {
          console.log(result);
          res.json(result);
        })
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  getReservationByColis: async (req, res) => {

    try {
      await Reservation.findAll({
        where: {
          idcolis: req.params.idcolis,
          accept:false,
        },
        include: [{
          model: Colis,
          attributes: ['id','from', 'to', "date1", "date2", "userId",'etat','userId',"poidDispo","price"],
          include :[{
            model: user,
            attributes: ['firstname', 'lastname', 'url1', 'image','email','phone',"uuid"]
          },]
        }, {
          model: user,
          attributes: ['firstname', 'lastname', 'url1', 'image','email','phone']
        }, ]

      }
      )
        .then(result => {
          console.log(result);
          res.json(result);
        })
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  deleteReservation: async (req, res) => {
    const today = new Date();

    try {
        await reservation.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Reservation Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
},

  updateReservation: async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
      const reservation = await Reservation.findOne({
        where: {
          id: id,
        },
      });

      if (!reservation) {
        return res.status(404).json({ message: 'Réservation introuvable' });
      }

      await Reservation.update(
        { accepte: 1 },
        {
          where: {
            id: id,
          },
        }
      );

      return res.json({ message: 'Réservation mise à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réservation :', error);
      return res.status(500).json({ message: 'Erreur lors de la mise à jour de la réservation' });
    }
  }
};

module.exports = reservationCtrl;