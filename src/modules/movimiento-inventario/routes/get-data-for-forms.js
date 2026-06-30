const express = require("express");
const router = express.Router();
const selectInfoForm = require("../queries/select-info-form");

router.get("/api/form/prestamo", async (req, res) => {
  try {
    const data = {
      movimiento: await selectInfoForm.getMovimiento(),
      area: await selectInfoForm.getArea(),
      sedeOrigen: await selectInfoForm.getSedeOrigen(),
      sedeDestino: await selectInfoForm.getSedeDestino(),
      duracion: await selectInfoForm.getDuracion(),
      encargadoPrestamo: await selectInfoForm.getEncargadoPrestamo(),
      recepcionista: await selectInfoForm.getRecepcionista(),
      estado: await selectInfoForm.getEstado(), 
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
