//server express router para eliminar un elemnto
const express = require("express");
const router = express.Router();
const 
  eliminarRegistro

 = require("../../queries/agregar-nuevos-datos/eliminar-nuevos-campos");

router.delete("/eliminar_nuevos_elementos", async (req, res) => {
  try {
    const vacios = validarReq(req);

    if (vacios.length > 0) {
      if (vacios.length === 1) {
        return res.status(400).json(`El campo ${vacios[0]} está vacío`);
      }

      return res
        .status(400)
        .json(`Los campos ${vacios.join(", ")} están vacíos`);
    }

    const { id, tipo } = req.body;

    const resultado = await eliminarRegistro(id, tipo);

    if (resultado.affectedRows > 1) {
      return res
        .status(200)
        .json(
          "Se recomienda verificar base de datos, ya que se detecto mas de una fila afectada para un solo id",
        );
    } else if (resultado.affectedRows == 1) {
      return res.status(200).json("Elemento eliminado satisfactoriamente");
    }
    return res.status(404).json("No se encontró ningún registro para eliminar");
  } catch (err) {
    console.error(err);

    return res.status(500).json("Error interno del servidor");
  }
});

//creaos la funcion validar req

function validarReq(req) {
  if (!req.body) {
    return ["body"];
  }

  const vacios = [];

  Object.entries(req.body).forEach(([campo, valor]) => {
    if (valor === null || valor === undefined || valor === "") {
      vacios.push(campo);
    }
  });

  return vacios;
}
module.exports = router;
