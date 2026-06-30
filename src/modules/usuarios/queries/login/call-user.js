const conn = require("../../../../shared/database/conexion");


async function getCredentials(usuario, contrasena) {
  try {
    const query = `
      SELECT ID_usuario, Usuario, Contrasena
      FROM usuario
      WHERE usuario = ? AND contrasena = ?
      LIMIT 1
    `;

    const [rows] = await conn.execute(query, [usuario, contrasena]);

    if (rows.length === 0) {
      return { status: false };
    } else {
      const user = rows[0];
      return {
        status: true,
        user: {
          id: user.id_usuario,
          nombre: user.nombre,
        },
      };
    }


  } catch (error) {
    console.error("Error validando credenciales:", error);
    return { status: false };
  }
}

module.exports = getCredentials;
