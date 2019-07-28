// const favicon = require("serve-favicon");
const path = require('path');
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
let server = require('http').Server(app);
server.listen(port, () => {
    console.log("App is running on port " + port);
});

app.use(express.static(__dirname + "/dist"));
// app.use("/assets/data", express.static(__dirname + '/assets/data'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



