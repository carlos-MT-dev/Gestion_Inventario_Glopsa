const express = require("express");
const router = express.Router();
const actualizarNuevosCampos  = require("../../mysql-querys/agregar_nuevos_datos/actualizar_nuevos_campos");
// const validarPreexistencia = require("../../mysql-querys/agregar_nuevos_datos/validar_preexistencia_campo");

const columnasPorTabla = {
  item: "Item",
  marca: "Marca",
  modelo: "modelo",
};

router.put("/actualizar_nuevos_datos", async (req, res) => {
  try {
    const { id_campo, tabla, nombre_campo, categoria, estado, descripcion } =
      req.body;

      console.log("los campos enviados para la actualizacion"+req.body);

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

    // const existenciaCampo = await validarPreexistencia(
    //   columnaName,
    //   tabla,
    //   nombre_campo,
    

    // if (existenciaCampo) {
    //   return res.status(409).json({
    //     ok: false,
    //     message: "El campo ya existe en la base de datos",
    //   });
    // }

    await actualizarNuevosCampos(
      id_campo,
      tabla,
      nombre_campo,
      categoria,
      estado,
      descripcion,
    );

    return res.json({
      ok: true,
      message: "Elemento actualizado correctamente",
      datos: req.body,
    });


  } catch (error) {
    console.error("Error al insertar:", error);
    res.status(500).json({
      ok: false,
      message: "Error al actualizar el elemento",
      error: error.message,
    });
  }
});

module.exports = router;
