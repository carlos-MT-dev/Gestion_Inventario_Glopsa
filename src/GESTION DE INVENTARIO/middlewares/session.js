const express = require('express');
const router = express.Router();

// Middleware para proteger rutas
router.use((req, res, next) =>{
    if (req.session && req.session.user) {
        return next();
    }
    
    // Si es una solicitud AJAX/fetch, devuelve JSON
    if (req.xhr || req.headers.accept?.includes('application/json')) {
        return res.status(401).json({
            ok: false,
            message: 'Sesión expirada. Por favor inicie sesión nuevamente'
        });
    }
    
    // Si es una solicitud de navegador, redirige al login
    res.redirect('/login');
})

module.exports = router;