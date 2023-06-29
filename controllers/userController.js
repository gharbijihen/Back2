const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const { UUID } = require("sequelize");
const path = require("path");
const fs = require("fs");
const nodemailer = require ("nodemailer")


const userCtrl = {

  register: async (req, res) => {
    { /*const characters =
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randomCode = "";
        for (let i =} 0; i < 25; i++) {
          randomCode += characters[Math.floor(Math.random() * characters.length)];
        }*/}
    const today = new Date();
    const userData = {

      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      //activationCode: randomCode,
      createdAt: today,
    };
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      //TODO bcrypt
      .then((user) => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash;

            User.create(userData)
              .then(function (user) {
                /* const token =  jwt.sign({ id: user.dataValues.uuid}, process.env.SECRET_KEY, {
                   expiresIn: 14400,
                 });
                 const refreshtoken =  jwt.sign({ id: user.dataValues.uuid }, process.env.SECRET_KEY, {
                   expiresIn: 14400,
                 });
                 userData.refreshtoken = refreshtoken;
                 userData.token = token;*/
                // const refreshtoken = createRefreshToken({ email });



                res.send({
                    message: "user created successfully...check your inbox",
                  })
                  var transport = nodemailer.createTransport({
                    /*host: 'smtp.gmail.com',
                   port: 465,
                  secure: true,*/
                    service: "Gmail",
                    auth: {
                      user: "gestioncolis2023@gmail.com",
                      pass: "58978570",
                    },
                  });
                  var mailOptions = {
                    from: "UVCT-Training",
                    to: req.body.email,
                    subject: "activer votre compte",
                    html: `
                   <div>
                    <h1>Email d'activation du compte </h1>
                      <h2>Bonjour </h2>
                    <p>Veuillez confirmer votre email en cliquant sur le lien suivant
                    <a href=http://localhost:3000/activationpage/${userData.activationCode}>Cliquez ici</a>                              
                     </div>`,
                  };
                  transport.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("Mail sent successfully:-", info.response);
                    }
                  });
                })
                .catch((err) => {
                  res.json("error: " + err);
                });
          });
        } else {
          res.send({ message: "User already exist" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  },
  login: async (req, res) => {
    console.log('hyeeeeeeeeeeeeeeee')
    console.log(req.body);
    const password = req.body.password;

    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        const match = await bcrypt.compareSync(password, user.password);
        if (!match) return res.json({ message: "mot de passe incorrect" });


        //const userId = user.dataValues.uuid;console.log(userId)
        //   const name = user.name;console.log(name)
        //   const email = user.email;console.log(email)
        //   const accessToken = jwt.sign({ name, email,role }, process.env.ACCESS_TOKEN_SECRET,{
        //       expiresIn: '20s'
        //   });

        //   const refreshToken = jwt.sign({ name, email}, process.env.REFRESH_TOKEN_SECRET,{
        //       expiresIn: '1d'
        //   });console.log(refreshToken)
        //   await User.update({refresh_token: refreshToken},{
        //       where:{
        //         email: email
        //       }
        //   });

        //   res.cookie('refreshToken', refreshToken,{
        //       httpOnly: true,
        //       maxAge: 24 * 60 * 60 * 1000
        //   });
        res.json({ message: "login avec success", user: user });

      } else {
        res.json({ message: "Email or password are wrong, please try again." });
        console.log("bbb");
      }
    } catch (error) {
      console.log(error)
      res.json({ message: "User does not exist" });
    }
  },
  getUserById: async (req, res) => {
    const today = new Date();

    try {
      const user = await User.findOne({
        attribuet: ['uuid', 'firstname', 'lastname', 'email', 'password', 'phone', 'image', 'url1', 'passport', "role", "createdAt", "isVerified"],
        where: {
          uuid: req.params.id
        }
      });

      console.log(user);
      res.json(user);
    } catch (error) {
      res.json({ message: error.message });
    }
  },

  resetpass: async (req, res) => {
    const { password, confpassword } = req.body;
    const code = req.params.id;
    await bcrypt.hash(password, 10,(err,hash)=>{
      console.log(hash);
      User.update(
        { password: hash },
         {
          where: {
            uuid: code,
          },
        },
      
      ).then(res=>{
        res.json({ message: "mot de passe modifié" });
        console.log("aa")
      })
     .catch (error=>{ 
      res.json(error);
    })
    })
   

     
  },
  updateUserProfil: async (req, res) => {
    const code = req.params.id;
    console.log(code);

    const { firstname, lastname, email, phone } = req.body;


    User.findOne({
      where: {
        uuid: code
      }
    }).then((User) => {
      User.update({ firstname: firstname, lastname: lastname, email: email, phone: phone }, {
        where: {
          uuid: code
        }
      }); return res.json({ message: "profile modifié !", });

    }).catch(() => {
      return res.json({ message: 'erreur' })

    })
  },
  deleteUser: async (req, res) => {

    const code = req.params.id;

    try {
      await User.destroy({
        where: {
          uuid: code
        }
      });
      res.json({
        "message": "User Deleted"
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  },

  updateimage: async (req, res) => {
    try {
      const uuid = req.params.id;
      console.log(uuid);
  
      if (!req.files || !req.files.file) {
        return res.status(400).json({ msg: "No File Uploaded" });
      }
  
      const file = req.files.file;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
      const allowedTypes = ['.png', '.jpg', '.jpeg'];
  
      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Image" });
      }
  
      file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Failed to upload image" });
        }
  
        try {
          await User.update(
            {
              image: fileName,
              url1: url
            },
            {
              where: {
                uuid: uuid
              }
            }
          );
  
          res.status(201).json({ msg: "Image uploaded successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Failed to update user" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }

}

//   update :async(id, params) => {
//     const user = await getUser(id);

//     // validate
//     const usernameChanged = params.username && user.username !== params.username;
//     if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
//         throw 'Username "' + params.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (params.password) {
//         params.passwordHash = await bcrypt.hash(params.password, 10);
//     }

//     // copy params to user and save
//     Object.assign(user, params);
//     await user.save();
// },
// getUserById: async (req, res) => {
//   console.log(uuid)
//   userService.getById(req.params. uuid)
//     .then(user => res.json(user))
//     .catch(err)
//       console.log(error);

// },


module.exports = userCtrl