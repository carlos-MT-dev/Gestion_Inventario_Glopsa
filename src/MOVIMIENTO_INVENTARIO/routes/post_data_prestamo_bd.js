const express = require("express");
const router = express.Router();
const {
  insertarObjeto,
  actualizaSedeObjetoPrestado,
  actualizaEstadoObjetoPrestado

} = require("../querys/send/send-info-from-forms"); // ruta correcta

router.post("/registrar_prestamo", async (req, res) => {
  try {
    console.log(
      "Datos recibidos para enviar desde el modulo prestamo:",
      req.body,
    );

    const result = await insertarObjeto(req.body);

    if (result.insertId && result.affectedRows > 0) {
      await actualizaSedeObjetoPrestado(req.body);
      await actualizaEstadoObjetoPrestado(req.body);
    }

    res.json({
      ok: true,
      message: "Equipo registrado correctamente",
      insertId: result.insertId,
    });
  } catch (error) {
    console.error("Error al insertar:", error);

  }
});

module.exports = router;
