const express = require("express");
const router = express.Router();
const eliminarFila = require("../../queries/delete/delete-row-selected");

router.delete("/api/delete/prestamo", async (req, res) => {
  try {
    console.log(
      "ID recibido en backend:",
      req.body.id,
      "Tipo:",
      typeof req.body.id,
    );
    const data = await eliminarFila(req.body.id);
    console.log("Resultado de eliminación:", data);
    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ ok: false, message: "Prestamo no encontrado o ya eliminado" });
    }
    res.json({ ok: true, message: "Prestamo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
