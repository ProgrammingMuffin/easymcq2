const express = require('express');
const router = express.Router();




router.get("/", (req, res) => {
    var servertime = parseInt(req.cookies.servertime);
    console.log(servertime);
    res.send(servertime + "");
});


module.exports = router;