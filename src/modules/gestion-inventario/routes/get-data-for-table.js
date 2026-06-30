const express = require("express");
const router = express.Router();
const cargarProductos = require("../queries/select-products");

router.get("/api/data", async (req, res) => {
    try {
        const data = await cargarProductos();
        // console.log("Datos recibidos para la tabla:", data);
        res.json(data);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error obteniendo datos" });
    }
});

module.exports = router;
