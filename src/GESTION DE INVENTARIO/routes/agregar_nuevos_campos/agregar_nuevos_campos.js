const express = require("express");
const router = express.Router();
const {
  insertItem,
  insertMarca,
  insertModelo,
} = require("../../mysql-querys/agregar_nuevos_datos/enviar_nuevos_datos"); // ruta correcta

router.post("/registrar_nuevos_datos", async (req, res) => {
  try {
    console.log("Datos nuevos recibidos para su registro en la bd:", req.body);

    if (req.body.txt_nuevo_objeto && req.body.agregar_categoria_objeto) {
      await insertItem(req.body);

    }
    if (req.body.txt_nueva_marca && req.body.agregar_categoria_marca) {
      await insertMarca(req.body);
    }

    if (req.body.txt_nuevo_modelo && req.body.agregar_categoria_modelo) {
      await insertModelo(req.body);
    }

    res.json({
      ok: true,
      message: "elemento regestrado corectamente",
      datos: req.body,
    });
  } catch (error) {
    console.error("Error al insertar:", error);
    res.status(500).json({
      ok: false,
      message: "Error al registrar el elemento",
      error: error.message,
    });
  }
});

module.exports = router;
