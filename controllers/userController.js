const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users")
const userCtrl = {

  register: async (req, res) => {
    { /*const characters =
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randomCode = "";
        for (let i =} 0; i < 25; i++) {
          randomCode += characters[Math.floor(Math.random() * characters.length)];
        }*/}
        console.log('sss')
    const today = new Date();
    const userData = {
   
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      //activationCode: randomCode,
      created: today,
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



                res
                  .send({
                    message: "user created successfully...check your inbox",
                  });



              })
              .catch((err) => {
                res.send("error: " + err);
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
    const { password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      const match = await bcrypt.compareSync(password, user.password);
      if (!match) return res.json({ message: "mot de passe incorrect" });
      if (user && user.isVerified === true) {


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
        res.json({ message: "login avec success", accessToken: accessToken, refreshToken: refreshToken, user: user });

      } else {
        res.json({ message: "verifiez votre compte" });
        console.log("bbb");
      }
    } catch (error) {
      res.json({ message: "User does not exist" });
    }
  },


}

module.exports = userCtrl