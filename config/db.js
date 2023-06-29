const Sequelize = require('sequelize')

const mysql=require("mysql");


/*const db = new Sequelize('stage', 'root', '', {
  host: "localhost",
  dialect: "mysql"
});
console.log("connect")*/

const db = {}

const sequelize = new Sequelize('gestion', 'root','', {
host: 'localhost',
dialect: 'mysql',
   port:3306,
  
});
console.log("connect")
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password:'',
//   database:"stage"
//   })
//   db.connect( (error) => {
//     if(error) {
//     console.log(error)
//     } else { 
//     console.log("MYSQL Connected...")
//     }
//     })
 try {   sequelize.authenticate();   
        console.log('Connecté à la base de données MySQL!'); 
     } catch (error) { 
         console.error('Impossible de se connecter, erreur suivante :', error);
      }

 db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
