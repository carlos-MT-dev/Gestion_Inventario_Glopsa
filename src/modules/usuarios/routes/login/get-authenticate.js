const express = require("express");
const router = express.Router();
const validateCredencials = require("../../queries/login/call-user");

router.post("/login", async (req, res) => {
  const { usuario, contrasena } = req.body;

  const data = await validateCredencials(usuario, contrasena);
  
  if (data.status === true) {
    req.session.user = { username: usuario };

    return req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ ok: false });
      }

      return res.json({ ok: true });
    });
  }

  return res.status(401).json({ ok: false });
});

module.exports = router;
