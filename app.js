const express = require("express");
const user = require('./routes/user')
// TODO: Update this
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('./database-mysql');
// var items = require('./database-mongo');

const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000


app.use("/users", user);

app.listen(3000,()=> {
  console.log("listening on port 3000!");
});



