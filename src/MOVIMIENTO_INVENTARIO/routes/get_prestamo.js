const express = require("express");
const path = require('path')
const router = express.Router();
// const ruta = require("../../../src/MOVIMIENTO_INVENTARIO/view/prestamo.html")

// redireccion al apartado de prestamos
router.get('/prestamo', (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "../../../src/MOVIMIENTO_INVENTARIO/view/prestamo.html",
      ),
    );
});

module.exports = router;