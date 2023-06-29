// const User = require("../models/users");
// const Message=require("../models/message")



// const MessageControlller={
//     addmessage: async(req,res)=>{
//         const {message} = req.body;
//         const code=req.params.id
//         const destinateur=req.params.idDestinateur
//         User.findOne({where:{
//           id:destinataire
            

//         }}).then((instructeur) =>{
            
//             if (!instructeur) {
//             return res.json({message:'instructeur non trouvé'})


//         }else{ try{
            
        
//              Message.create({
//             message:message,
            
//             destinateur:destinateur,
//               writedBy:code
//               });
        
//               res.json({ message: "message envoyé avec succées " });
//             } catch (error) {
//               console.error(error);
//               res.json({ message: "Une erreur est survenue " });
//             }
//         }
    
//            }
        
//         )
       



//     },
//     addreponse:async(req,res)=>{
//         const response=req.body.response
//         const code=req.params.id;console.log(code);
//         await  Message.findOne({
//           uuid : code,
//           where:{uuid : code}
//       }).then((message)=>{
      
//               Message.update({response:response },{
//               where: {
                
//                 uuid : code
//                 }
//                });console.log('bbbb') ; return res.json({message: "reponse ajouté"});
              
            
//             }
//             ).catch((err)=>{console.log('ddd') ; return res.json({message: "publication echouée"});})
//       },

//       getmymessageby :async (req, res) =>{
//         const code=req.params.id;console.log(code);console.log("code");
//         try {
//           let response;
          
//               response = await Message.findAll({
//                   attributes:['uuid','message','objectif','createdAt','response','destinataire'],
//                   include:[{
//                     model: User,
//                     attributes:['name','email']
//                 }],
//                 where: {
//                   writedBy : code,
//               }
                  
//               });
          
//           res.json(response);
//       } catch (error) {
//           res.json({msg: error.message});
//       }
//       },
//       getmymessageamoi :async (req, res) =>{
//         const code=req.params.email;console.log(code);
 
        
//             try {
//                 let response;
                
//                     response = await Message.findAll({
//                         attributes:['uuid','message','objectif','createdAt','response','destinataire','writedBy'],
//                         include:[{
//                           model: User,
//                           attributes:['name','email']
//                       }],
//                       where: {
//                           destinataire : code,
//                     }
                        
//                     });
                
//                 res.json(response);
//            } catch (error) {
//                 res.json({msg: error.message});
//          }



        
//       },
//       getmessagebyid :async (req, res) =>{
//         const code=req.params.id;console.log(code);
//         try {
//           let response;
          
//               response = await Message.findOne({uuid : code,
//                   attributes:['uuid','message','objectif','createdAt','response','destinataire','writedBy'],
//                   include:[{
//                     model: User,
//                     attributes:['name','email']
//                 }],
//                 where: {
//                   uuid : code,
//               }
                  
//               });
          
//           res.json(response);
//       } catch (error) {
//           res.json({msg: error.message});
//       }
//       },
//       deletemessage:async(req,res)=>{
//         const uuid=req.params.id
//         try {
          
             
           
//                 await Message.destroy({
//                     where:{
//                         uuid:uuid
//                     }
//                 });
//                 res.json({message: "message supprimé !"});
//               } catch (error) {
//                   res.status(500).json({msg: error.message});
//               }
    
//     },

// }
// module.exports=MessageControlller