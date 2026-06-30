const express = require("express");

// const pri = require("../../../gestion-inventario/views/registro.ejs");
const path = require('path')
const router = express.Router();

// Dashboard protegido
router.get('/registro', (req, res) => {
    res.render(
      path.join(
        __dirname,
        "../../../gestion-inventario/views/registro.ejs",
      ),
    );
});

module.exports = router;