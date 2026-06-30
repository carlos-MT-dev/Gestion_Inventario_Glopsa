const express = require('express');
// const exprssess = require("../../../../index.html");
const { link } = require('fs');
const path = require('path');        
const router = express.Router();

// GET /login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/index.html"));
});

module.exports = router;

  