const express = require("express");
const router = express.Router();
const { enviarNuevosCampos } = require("../../queries/agregar-nuevos-datos/enviar-nuevos-datos");
const validarPreexistencia = require("../../queries/agregar-nuevos-datos/validar-preexistencia-campo");

const columnasPorTabla = {
  item: "Item",
  marca: "Marca",
  modelo: "modelo",
};

router.post("/registrar_nuevos_datos", async (req, res) => {
  try {
    const { tabla, nombre_campo, categoria, estado, descripcion } = req.body;

    if (!tabla || tabla === "SELECCIONAR" || !nombre_campo) {
      return res.status(400).json({
        ok: false,
        message: "Debe completar la tabla y el nombre del campo",
      });
    }

    const columnaName = columnasPorTabla[tabla];
    if (!columnaName) {
      return res.status(400).json({
        ok: false,
        message: "Tabla seleccionada no es válida",
      });
    }

    const existenciaCampo = await validarPreexistencia(
      columnaName,
      tabla,
      nombre_campo,
    );

    if (existenciaCampo) {
      return res.status(409).json({
        ok: false,
        message: "El campo ya existe en la base de datos",
      });
    }

    await enviarNuevosCampos(tabla, nombre_campo, categoria, estado, descripcion);

    return res.json({
      ok: true,
      message: "Elemento registrado correctamente",
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
