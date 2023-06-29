const express = require("express");
const user = require('./routes/user');
const colis = require('./routes/colis');
const reservation = require('./routes/reservation');
const path = require('path');
const PORT = process.env.PORT || 3000;
const fileUpload = require('express-fileupload');
var flash = require("express-flash");
var bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
// const Message = require("./models/message");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'));

app.use("/users", user);
app.use("/colis", colis);
app.use("/reservation", reservation);

// app.use("/messages",Message)

app.listen(3000, () => {
  console.log("listening on port 3000!");
});


