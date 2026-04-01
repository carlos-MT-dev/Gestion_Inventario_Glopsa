const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: "localhost",       // ← ahora es local
    user: "root",            // ← en la mayoría de PCs el usuario es "root"
    password: "",            // ← la contraseña suele estar vacía en XAMPP/WAMP
    database: "actelope_almacen_2"  // ← tu BD importada localmente
});

connection.then(() => {
    console.log("Conexión exitosa a MySQL");
}).catch((err) => {
    console.error("Error en la conexión a la base de datos:", err);
});

module.exports = connection;
