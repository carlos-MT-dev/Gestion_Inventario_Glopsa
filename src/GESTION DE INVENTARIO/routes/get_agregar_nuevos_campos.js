const express = require("express");
const path = require("path");
const router = express.Router();

// Dashboard protegido
router.get("/agregar_nuevos_datos_pagina", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/gestion_nuevos_campos.html"));
});

module.exports = router;
