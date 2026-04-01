const express = require("express");
const buscarIdQuery = require("../../mysql-querys/search/search-product-from-bd");

const router = express.Router();

router.post("/data/buscar", async (req, res) => {
  try {
    const filtros = req.body;

    if (!filtros || Object.keys(filtros).length === 0) {
      return res.status(400).json({ error: "Debe enviar al menos un filtro" });
    }

    const respuesta = await buscarIdQuery(filtros);

    res.json(respuesta);
    


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
