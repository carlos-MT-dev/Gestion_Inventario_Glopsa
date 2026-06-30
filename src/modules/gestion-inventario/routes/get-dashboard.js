const express = require("express");
const path = require('path')
const router = express.Router();

// Dashboard protegido
router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "registro.ejs"));
});

module.exports = router; 