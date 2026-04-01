const express = require("express");
const router = express.Router();
const insertarObjeto = require("../mysql-querys/send-info-from-form"); // ruta correcta

router.post("/registrar_equipo", async (req, res) => {
  try {
    // console.log("Datos recibidos para su registro en la bd:", req.body);

    // Validación de campos obligatorios en el servidor
    const camposObligatorios = [
      "ID_area",
      "ID_sede",
      "ID_seccion",
      "ID_objeto",
      "ID_categoria",
      "ID_modelo",
      "ID_medida",
      "ID_Estado",
      "Unidad_txt",
      "Fecha_Compra",
    ];

    const camposFaltantes = camposObligatorios.filter((campo) => !req.body[campo] || req.body[campo].trim() === "");

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        ok: false,
        message: `Campos obligatorios faltantes: ${camposFaltantes.join(", ")}`,
      });
    }

    const result = await insertarObjeto(req.body);

    res.json({
      ok: true,
      message: "Equipo registrado correctamente",
      insertId: result.insertId,
    });
  } catch (error) {
    console.error("Error al insertar:", error);
    res.status(500).json({
      ok: false,
      message: "Error al registrar el equipo",
      error: error.message,
    });
  }
});

module.exports = router;
