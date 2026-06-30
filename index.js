// ...existing code...
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

/* ===========================================
   1. CONFIGURACIONES
=========================================== */
app.set("port", 3500);
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

// archivos públicos (solo las carpetas "public" de cada módulo, nunca routes/queries/conexion)
app.use(
  "/modules/gestion-inventario/public",
  express.static(path.join(__dirname, "src/modules/gestion-inventario/public")),
);
app.use(
  "/modules/movimiento-inventario/public",
  express.static(path.join(__dirname, "src/modules/movimiento-inventario/public")),
);
app.use(
  "/modules/usuarios/public",
  express.static(path.join(__dirname, "src/modules/usuarios/public")),
);
app.use(
  "/shared/public",
   express.static(path.join(__dirname, "src/shared/public")));

/* ===========================================
   3. RUTAS
=========================================== */

const getLoginRoutes = require("./src/modules/usuarios/routes/login/get-login");
const getAuthenticateLoginRoutes = require("./src/modules/usuarios/routes/login/get-authenticate");
const validateSession = require("./src/shared/middlewares/session");
const getdashboard = require("./src/modules/gestion-inventario/routes/get-dashboard");
const getRegister = require("./src/modules/usuarios/routes/login/get-register");
const getPrestamos = require("./src/modules/movimiento-inventario/routes/get-prestamo");
const getLogout = require("./src/modules/usuarios/routes/login/get-logout");
const getDataForTable = require("./src/modules/gestion-inventario/routes/get-data-for-table");
const getDataForForms = require("./src/modules/gestion-inventario/routes/get-data-for-forms");
const postDataObjetoBD = require("./src/modules/gestion-inventario/routes/post-data-objeto-bd");
const deleteObjectFromBD = require("./src/modules/gestion-inventario/routes/delete/delete-object-from-bd");
const updateObjectFromBD = require("./src/modules/gestion-inventario/routes/update/update-object-from-bd");
const buscarEquipo = require("./src/modules/gestion-inventario/routes/search/search-object-from-bd");
const getDataForFormsMovimiento = require("./src/modules/movimiento-inventario/routes/get-data-for-forms");
const postDataPrestamoBD = require("./src/modules/movimiento-inventario/routes/post-data-prestamo-bd");
const getDataForTablePrestamo = require("./src/modules/movimiento-inventario/routes/get-data-for-table");
const deleteItemPrestamo = require("./src/modules/movimiento-inventario/routes/delete/delete-prestamo");
const actualizarPrestamo = require("./src/modules/movimiento-inventario/routes/actualizar/actualizar-data");
const buscarPrestamo = require("./src/modules/movimiento-inventario/routes/search/search-prestamo");
const agregarNuevosCamposRoutes = require("./src/modules/gestion-inventario/routes/agregar-nuevos-campos/agregar-nuevos-campos");
const actualizarNuevosCamposRoutes = require("./src/modules/gestion-inventario/routes/agregar-nuevos-campos/actualizar-nuevos-campos");
const ListarCampos = require("./src/modules/gestion-inventario/routes/agregar-nuevos-campos/listar-campos");
const AgregarNuevosCampos = require("./src/modules/gestion-inventario/routes/get-agregar-nuevos-campos");
const EliminarNuevosCampos = require("./src/modules/gestion-inventario/routes/agregar-nuevos-campos/eliminar-nuevos-campos");
const informeInventarioRoutes = require("./src/modules/gestion-inventario/routes/informe-inventario/get-informe-inventario.js");
const listaInventariototal = require("./src/modules/gestion-inventario/routes/informe-inventario/lista-inventario-total.js");
const buscarenelInformeInventario = require("./src/modules/gestion-inventario/routes/informe-inventario/search-object-informe-inventario.js");

// Inicio
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/modules/usuarios/views/index.html"));
});

// Página de mantenimiento / no encontrada
app.get("/pagina-no-encontrada", (req, res) => {
  res.sendFile(path.join(__dirname, "src/shared/views/pagina-no-encontrada.html"));
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
app.use(getDataForTablePrestamo);
app.use(deleteItemPrestamo);
app.use(actualizarPrestamo);
app.use(buscarPrestamo);
app.use(agregarNuevosCamposRoutes);
app.use(actualizarNuevosCamposRoutes);
app.use(AgregarNuevosCampos);
app.use(ListarCampos);
app.use(EliminarNuevosCampos);
app.use(informeInventarioRoutes);
app.use(listaInventariototal);
app.use(buscarenelInformeInventario);
/* ===========================================
   4. SERVIDOR
=========================================== */
app.listen(app.get("port"), "0.0.0.0", () => {
  console.log("Server running on http://localhost:" + app.get("port"));
});
