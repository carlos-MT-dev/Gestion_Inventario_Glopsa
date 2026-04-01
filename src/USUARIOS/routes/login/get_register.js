const express = require("express");

// const pri = require("../../../GESTION DE INVENTARIO/views/registro.html");
const path = require('path')
const router = express.Router();

// Dashboard protegido
router.get('/registro', (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "../../../GESTION DE INVENTARIO/views/registro.html",
      ),
    );
});

module.exports = router;