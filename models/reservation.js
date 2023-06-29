const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js')
const user =require ('./users.js');
const Colis = require('./Colis.js');

const reservation = db.sequelize.define('reservation',{
   id:{
    type: Sequelize.UUID,
    primaryKey: true,
    
    defaultValue:DataTypes.UUIDV4,
    allowNull:false,
    validate:{
      notEmpty:true
    }
    },
    accept:{
        type: Sequelize.BOOLEAN
    },
    idcolis:{
        type: Sequelize.STRING
    },
  
    iduser:{
       type: Sequelize.STRING
   },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },    
    emailconnect:{
        type: Sequelize.STRING
    },
    etat:{
        type: Sequelize.STRING
    },
    updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
   

},{
    freezeTableName: true
});
user.hasMany(reservation);
Colis.hasMany(reservation)
reservation.belongsTo(user,{foreignKey:'iduser'});
reservation.belongsTo(Colis,{foreignKey:'idcolis'});
module.exports = reservation 
