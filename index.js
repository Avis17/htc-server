/* **************************************************************************
 * Copyright (C) KUAT Technologies Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Developed by KUAT Technologies, Research and Innovation
 * SIVA, <pvadivelsiva@gmail.com>, October 2021
 * *************************************************************************/

const express = require("express");
const cors = require("cors");
const mongo = require("./Utils/dao");
var bodyParser = require('body-parser');
const path = require('path');

// const hostname = '127.0.0.1'
const port = process.env.PORT || 4000;
const app = express();

// Express Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ limit: '50mb' }));
app.set('view engine', 'pug');

// API Routers
require('./router.js')(app);

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
  res.sendFile('index.html',{root:__dirname})
});

mongo.connect().then(async (result) => {
  console.log("db connected", result);
});

// mongodb+srv://kuat:<password>@cluster0.bqweb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
var listener = app.listen(port, () => {
  //hostname,
  console.log(`Server running at port http://localhost:${port}/`);
});
