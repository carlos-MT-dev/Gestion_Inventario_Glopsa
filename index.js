// ...existing code...
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

/* ===========================================
   1. CONFIGURACIONES
=========================================== */
app.set("port", 3000);
app.set("case sensitive routing", false);
app.set("view engine", "ejs");

/* ===========================================
   2. MIDDLEWARES GLOBALES
=========================================== */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "cambiar_este_secret_en_produccion",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  }),
);

function noCache(req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private",
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
}

// archivos públicos
app.use(express.static(path.join(__dirname, "src")));

/* ===========================================
   3. RUTAS
=========================================== */

const getLoginRoutes = require("./src/USUARIOS/routes/login/get_login");
const getAuthenticateLoginRoutes = require("./src/USUARIOS/routes/login/get_authenticate");
const validateSession = require("./src/GESTION DE INVENTARIO/middlewares/session");
const getdashboard = require("./src/GESTION DE INVENTARIO/routes/get_dashboard");
const getRegister = require("./src/USUARIOS/routes/login/get_register");
const getPrestamos = require("./src/MOVIMIENTO_INVENTARIO/routes/get_prestamo")
const getLogout = require("./src/USUARIOS/routes/login/get_logout");
const getDataForTable = require("./src/GESTION DE INVENTARIO/routes/get_data_for_table");
const getDataForForms = require("./src/GESTION DE INVENTARIO/routes/get_data_for_forms");
const postDataObjetoBD = require("./src/GESTION DE INVENTARIO/routes/post_data_objeto_bd");
const deleteObjectFromBD = require("./src/GESTION DE INVENTARIO/routes/delete/delete_object_from_bd");
const updateObjectFromBD = require("./src/GESTION DE INVENTARIO/routes/update/update_object_from_bd");
const buscarEquipo = require("./src/GESTION DE INVENTARIO/routes/search/search_object_from_bd");
const getDataForFormsMovimiento = require("./src/MOVIMIENTO_INVENTARIO/routes/get_data_for_forms")
const postDataPrestamoBD = require("./src/MOVIMIENTO_INVENTARIO/routes/post_data_prestamo_bd");
const getDataForTablePrestamo = require("./src/MOVIMIENTO_INVENTARIO/routes/get_data_for_table")
const deleteItemPrestamo = require("./src/MOVIMIENTO_INVENTARIO/routes/delete/delete-prestamo");
const actualizarPrestamo = require("./src/MOVIMIENTO_INVENTARIO/routes/actualizar/actualizar-data");
const buscarPrestamo =  require("./src/MOVIMIENTO_INVENTARIO/routes/search/search_prestamo")
const agregarNuevosCamposRoutes = require("./src/GESTION DE INVENTARIO/routes/agregar_nuevos_campos/agregar_nuevos_campos")


// Inicio
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/USUARIOS/view/index.html"));
});

// Rutas públicas
app.use(getLoginRoutes);
app.use(getAuthenticateLoginRoutes);

//  Rutas protegidas 
app.use(noCache, validateSession);
// app.use(getdashboard);
app.use(getRegister);
app.use(getPrestamos);
app.use(getDataForTable);
app.use(getDataForForms);
app.use(getLogout);
app.use(postDataObjetoBD);
app.use(deleteObjectFromBD);
app.use(updateObjectFromBD);
app.use(getDataForFormsMovimiento);
app.use(postDataPrestamoBD);
app.use(buscarEquipo);
app.use(postDataPrestamoBD);
app.use(getDataForTablePrestamo);
app.use(deleteItemPrestamo);
app.use(actualizarPrestamo);
app.use(buscarPrestamo);
app.use(agregarNuevosCamposRoutes);
  
/* ===========================================
   4. SERVIDOR
=========================================== */
app.listen(app.get("port"), "0.0.0.0", () => {
  console.log("Server running on http://lcoalhost:" + app.get("port"));
});
