const express = require("express");
const router = express.Router();

const {
  getListaNuevosItems,
  getListaNuevosMarca,
  getListaNuevosModelo,
} = require("../../queries/agregar-nuevos-datos/lista-campos");

router.get("/listar_nuevos_datos", async (req, res) => {
  try {
    const [items, marcas, modelos] = await Promise.all([
      getListaNuevosItems(),
      getListaNuevosMarca(),
      getListaNuevosModelo(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        items,
        marcas,
        modelos,
      },
    });
  } catch (error) {
    console.error("Error obteniendo listas:", error);

    res.status(500).json({
      success: false,
      message: "Error al obtener los datos",
      error: error.message,
    });
  }
});

module.exports = router;
