const colis = require("../models/Colis")
const user = require('../models/users')
const moduleColis = {
    getAllcolis: async (req, res) => {
        try {
            await colis.findAll({
                attribuet: ['id', 'from', 'to', 'date1', 'date2', 'time', 'price', 'poidDispo', 'description'],
                include: [{
                    model: user,
                    attributes: ['firstname', 'lastname','url1','image']
                }],
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
    getAllFavoris: async (req, res) => {
        try {
            await colis.findAll({
                where:{
                    favoris : 'red'
                },
                include: [{
                    model: user,
                    attributes: ['firstname', 'lastname','url1','image']

                }],
            }
            )
                .then(result => {
                    console.log(result,"res=>>>>>>>>>");
                    res.json(result);
                })
        } catch (error) {
            res.json({ message: error.message });
        }
    },
    getAllcolisbyid: async (req, res) => {

        try {
            await colis.findAll({
                
                where: {
                    userId: req.params.id
                },
                
                include: [{
                    model: user,
                    attributes: ['firstname', 'lastname']
                }],

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
    getcolibyid: async (req, res) => {
        console.log(req.params,'reqqq');
        try {
            await colis.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: user
                }],

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
    createcolis: async (req, res) => {
        const today = new Date();
        const colisData = {
            from: req.body.from,
            to: req.body.to,
            price: req.body.price,
            poidDispo: req.body.poidDispo,
            description: req.body.description,
            date1: req.body.date1,
            date2: req.body.date2,
            userId: req.body.userId,
            createdAt: today
        }
        console.log(colisData);
        try {
            user.findOne({
                where : {
                    uuid : req.body.userId
                }
            }).then(user=>{
                console.log(user)
                if(user.passport){
                    colis.create(colisData)
                    .then(result => {
                        console.log(result);
                    })
                res.json({
                    "message": "colis Created"
                });
                }
                else{
                    res.json({
                        "message": "passport dosn't exist"
                    });
                }
            })
            
        } catch (error) {
            res.json({ message: error.message });
        }
    },
   
    addFarovis: async (req, res) => {
        console.log(req.params,'reqqq');
        try {
            colis.findOne({
                where: {
                  id : req.params.id
              }
            }).then(Colis=>{
                console.log(Colis.id);
                if(Colis.favoris === 'red'){
                    colis.update({
                        favoris : ""},{where:{id:req.params.id}}
                    )
                }else{
                    colis.update({
                        favoris : "red"},{where:{id:req.params.id}}
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
  

    deletecolis: async (req, res) => {
        const today = new Date();

        try {
            await colis.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json({
                "message": "colis Deleted"
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    },
    getColisBySearch: async (req, res) => {
        console.log("____serch___")
        try {
            await colis.findAll({
                where: {
                    from: req.params.from,
                    to: req.params.to,
                    // price:req.params.price,
                    // poidDispo:req.params.poidDispo,

                },
                include: [{
                    model: user,
                }],
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
}
// export const updatecolis = async (req, res) => {
//     try {
//         await colis.update(req.body, {
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.json({
//             "message": "colis Updated"
//         });
//     } catch (error) {
//         res.json({ message: error.message });
//     }  
// }
module.exports = moduleColis