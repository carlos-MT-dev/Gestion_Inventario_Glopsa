const conn = require("../../../../shared/database/conexion");


async function validarPreexistencia(columna,tabla, valor) {

let sql = `
SELECT ${columna} FROM ${tabla} WHERE ${columna} = ? 
`;

const [rows] = await conn.query(sql, [valor]);
return rows.length;
}

module.exports = validarPreexistencia;