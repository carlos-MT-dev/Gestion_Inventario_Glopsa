const express = require("express");

// const pri = require("../../../GESTION DE INVENTARIO/views/registro.html");
const path = require('path')
const router = express.Router();

// Dashboard protegido
router.get('/registro', (req, res) => {
    res.render(
      path.join(
        __dirname,
        "../../../GESTION DE INVENTARIO/views/registro.ejs",
      ),
    );
});

module.exports = router;