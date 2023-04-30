const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js')

module.exports = db.sequelize.define(
  'users',
  {
    UUid: {
      type: Sequelize.UUID,
      primaryKey: true,
    
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    },
    firstname: {
      type: Sequelize.STRING,
     
    },
    lastname: {
        type: Sequelize.STRING,
   
      },
    email: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    phone: {
        type: Sequelize.INTEGER,
       
    }, 
    image: {
        type: Sequelize.STRING,
    },
    passport: {
        type: Sequelize.STRING,
    },
    
    role: {
        type: Sequelize.INTEGER,
        defaultValue:"user",
    },
 
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
        
  
    },
},
{
  timestamps: false
}
)

//module.exports = User;
