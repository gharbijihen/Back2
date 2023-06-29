const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js')
const user =require ('./users.js');

const Colis = db.sequelize.define('colisinfo',{
   id:{
    type: Sequelize.UUID,
    primaryKey: true,
    
    defaultValue:DataTypes.UUIDV4,
    allowNull:false,
    validate:{
      notEmpty:true
    }
    },
    from:{
        type: Sequelize.STRING
    },
    to:{
        type: Sequelize.STRING
    },
    date1:{
        type: Sequelize.DATE
    },
    date2:{
        type: Sequelize.DATE
    },
    poidDispo:{
        type: Sequelize.INTEGER
    },
    description:{
        type: Sequelize.STRING
    },
    price:{
        type: Sequelize.DOUBLE
    },
     etat:{
        type: Sequelize.STRING
    },
    favoris:{
        type: Sequelize.STRING
    },
    userId:{
       type: Sequelize.STRING
   },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },    
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
   

},{
    freezeTableName: true
});
user.hasMany(Colis);
Colis.belongsTo(user,{foreignKey:'userId'});
module.exports = Colis 
