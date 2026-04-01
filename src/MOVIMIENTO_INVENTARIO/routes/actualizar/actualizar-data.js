const express = require("express");
const router = express.Router();
const actualizarPrestamo = require("../../querys/actualizar/actualizar");
const multer = require("multer");

const upload = multer(); // memoria

router.put("/actualizar/prestamo/:id", upload.none(), async (req, res) => {
  try {
    const idPrestamo = req.params.id;
    console.log("ID a actualizar:", idPrestamo);
    console.log("Datos recibidos para actualizar el prestamo xd:", req.body);

    const result = await actualizarPrestamo(req.body, idPrestamo);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró el equipo",
      });
    }

    res.json({
      ok: true,
      message: "pretamo actualizado correctamente en express",
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({
      ok: false,
      message: "prestamo al actualizar equipo en express",
    });
  }
});

module.exports = router;
  