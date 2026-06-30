const express = require("express");
const buscarIdQuery = require("../../queries/search/search-product-from-bd");

const router = express.Router();



  //esta es la ruta para hacer la busqueda multicampos del apartado de registro inventario 
router.post("/data/buscar", async (req, res) => {
  try {
    const filtros = req.body;

    if (!filtros || Object.keys(filtros).length === 0) {
      return res.status(400).json({ error: "Debe enviar al menos un filtro" });
    }
  //esta es la funcion para hacer la busqueda multicampos del apartado de registro inventario 
    const respuesta = await buscarIdQuery(filtros);

    res.json(respuesta);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
