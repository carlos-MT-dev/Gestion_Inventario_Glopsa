// function validarCamposVacios() {
//   const campos = [
//     { id: "Codigo", nombre: "Código" },
//     { id: "ID_area", nombre: "Área" },
//     { id: "ID_sede", nombre: "Sede" },
//     { id: "ID_marca", nombre: "Marca" },
//     { id: "ID_objeto", nombre: "Objeto" },
//     { id: "ID_categoria", nombre: "Categoría" },
//     { id: "ID_modelo", nombre: "Modelo" },
//     { id: "ID_medida", nombre: "Medida" },
//     { id: "Unidad_txt", nombre: "Unidades" },
//     { id: "ID_Estado", nombre: "Estado" },
//     { id: "ID_Disponibilidad", nombre: "Disponibilidad" },
//     { id: "ID_Condicion", nombre: "Condición" },
//     { id: "ID_seccion", nombre: "Sección" },
//     { id: "Fecha_Compra", nombre: "Fecha de compra" },
//     { id: "Descripcion", nombre: "Descripción" },
//   ];

//   let camposVacios = [];

//   for (const campo of campos) {
//     const valor = document.getElementById(campo.id).value.trim();

//     if (valor === "") {
//       camposVacios.push(campo.nombre);
//     }
//   }

//   if (camposVacios.length > 0) {
//     alert(
//       "Por favor complete los siguientes campos:\n- " +
//         camposVacios.join("\n- "),
//     );
//     return false;
//   }else{

//     return true;
//   }

// }



// export { validarCamposVacios };  