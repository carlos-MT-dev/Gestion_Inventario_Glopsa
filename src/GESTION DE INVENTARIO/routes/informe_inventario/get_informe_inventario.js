const express = require("express");
const path = require("path");
const router = express.Router();

// Dashboard protegido
router.get("/informe_inventario", (req, res) => {
  const mostrar_cuerpo_informe = true;

  res.render(path.join(__dirname, "../../views/informe_inventario.ejs"), {
    mostrar_cuerpo_informe,
    pagina: "informe_inventario",
  });
});

module.exports = router;
