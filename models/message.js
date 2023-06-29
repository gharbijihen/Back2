// const {Sequelize, DataTypes} = require('sequelize')
// const db = require('../config/db.js')
// const user =require ('./users.js');

// const Message = db.sequelize.define('messages',{
//    id:{
//     type: Sequelize.UUID,
//     primaryKey: true,
    
//     defaultValue:DataTypes.UUIDV4,
//     allowNull:false,
//     validate:{
//       notEmpty:true
//     }
//     },
//     reponse:{
//         type: Sequelize.STRING
//     },
//     message:{
//         type: Sequelize.STRING
//     },
 
//     createdAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//     },    
//     destinateur:{
//         type: Sequelize.STRING
//     },
//     writedBy:{
//         type: Sequelize.STRING
//     },
//     updatedAt: {
//     type: Sequelize.DATE,
//     defaultValue: Sequelize.NOW
// },
   

// },{
//     freezeTableName: true
// });
// user.hasMany(Message);

// Message.belongsTo(user,{foreignKey:'destinateur'});
// Message.belongsTo(user,{foreignKey:'writedby'});
// module.exports = Message 
