// const favicon = require("serve-favicon");
const path = require('path');
const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// let _favicon = favicon(path.join(__dirname, 'public', 'favicon.ico'))
app.use(express.static(__dirname + "/dist"));
// app.use("/assets/data", express.static(__dirname + '/assets/data'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.listen(port, () => { console.log(`Server is running on port ${port}`) });
