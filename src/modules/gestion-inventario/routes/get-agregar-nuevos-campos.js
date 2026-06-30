const express = require("express");
const path = require("path");
const router = express.Router();

// Dashboard protegido
router.get("/agregar_nuevos_datos_pagina", (req, res) => {
  res.render(path.join(__dirname, "../views/gestion-nuevos-campos.ejs"), {
    mostrar_cuerpo_informe: true,
    pagina: "gestion_campos",
  });
});

module.exports = router;
