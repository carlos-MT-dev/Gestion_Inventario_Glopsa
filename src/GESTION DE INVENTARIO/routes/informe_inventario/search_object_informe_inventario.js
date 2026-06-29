const express = require("express");
const { buscarFiltroMultiple } = require("../../mysql-querys/informe_inventario/consultas");

const router = express.Router();

//esta es la ruta para hacer la busqueda multicampos del apartado de registro inventario
router.post("/data/buscar/multifiltros", async (req, res) => {
  try {
    const filtros = req.body; //destructurar aqui

    if (!filtros || Object.keys(filtros).length === 0) {
      return res.status(400).json({ error: "Debe enviar al menos un filtro" });
    }

    const respuesta = await buscarFiltroMultiple(filtros);

    res.json({ data: respuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
