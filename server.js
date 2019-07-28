// const favicon = require("serve-favicon");
const path = require('path');
const express = require("express");
const app = express();
app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(express.static(__dirname + "/dist"));
// app.use("/assets/data", express.static(__dirname + '/assets/data'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



