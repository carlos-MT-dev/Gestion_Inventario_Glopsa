const express = require("express");
const router = express.Router();
const actualizarObjeto = require("../../mysql-querys/update/update-object-from-db");
const multer = require("multer");

const upload = multer(); // memoria

router.put("/actualizar/equipo/:id", upload.none(), async (req, res) => {
  try {
    const idObjeto = req.params.id;
    console.log("ID a actualizar:", idObjeto);
    console.log("Datos recibidos para la actualizacion:", req.body);

    const result = await actualizarObjeto(req.body, idObjeto);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró el equipo",
      });
    }

    res.json({
      ok: true,
      message: "Equipo actualizado correctamente",
      resultado: result,
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({
      ok: false,
      message: "Error al actualizar equipo",
    });
  }
});

module.exports = router;
