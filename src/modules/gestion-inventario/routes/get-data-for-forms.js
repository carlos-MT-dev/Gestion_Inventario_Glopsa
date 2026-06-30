const express = require("express");
const router = express.Router();
const selectInfoForm = require("../queries/select-info-form");

router.get("/api/form", async (req, res) => {
  try {
    const data = {
      area: await selectInfoForm.getAreaList(),
      sede: await selectInfoForm.getSedeList(),
      marca: await selectInfoForm.getMarcaList(),
      item: await selectInfoForm.getItemList(),
      categoria: await selectInfoForm.getCategoriaList(),
      modelo: await selectInfoForm.getModeloList(),
      medida: await selectInfoForm.getMedidaList(),
      estadoObj: await selectInfoForm.getEstadoObjList(),
      disponibilidad: await selectInfoForm.getDisponibilidadList(),
      condicion: await selectInfoForm.getCondicionList(),
      seccion: await selectInfoForm.getSeccionList()
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error obteniendo datos para el formulario" });
  }
});

module.exports = router;
