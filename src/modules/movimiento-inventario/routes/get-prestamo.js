const express = require("express");
const path = require('path')
const router = express.Router();
// const ruta = require("../views/prestamo.html")

// redireccion al apartado de prestamos
router.get('/prestamo', (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "../views/prestamo.html",
      ),
    );
});

module.exports = router;