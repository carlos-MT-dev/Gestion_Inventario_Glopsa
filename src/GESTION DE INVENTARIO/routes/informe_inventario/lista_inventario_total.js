const express = require("express");
const router = express.Router();

const {
  listaInventarioTotal,
} = require("../../mysql-querys/informe_inventario/consultas");

router.get("/listar_inventario_total", async (req, res) => {
  try {
    const lista = await listaInventarioTotal();

    res.status(200).json({
      success: true,
      data: lista,
    });

  
   
  } catch (error) {
    console.error("Error obteniendo listas:", error);

    res.status(500).json({
      success: false,
      message: "Error al obtener los datos para el inventario general",
      error: error.message,
    });
  }
});

module.exports = router;
