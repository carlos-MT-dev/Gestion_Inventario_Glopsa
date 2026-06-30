const express = require("express");
const buscarIdQuery = require("../../queries/search/search-data-prest");
const router = express.Router()

router.get("/data/buscar/prestamo/:id", async (req, res) => {
  try {
    const idObject = req.params.id;

    if (!idObject) {
      return res
        .status(400)
        .json({ error: "ID no valido o vacio (router search_object_from_bd)" });
    }
    const respuesta = await buscarIdQuery(idObject);
    console.log(respuesta);
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
