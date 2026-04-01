document.addEventListener("DOMContentLoaded", cargarCombos);


async function cargarCombos(){
    try {
    const res = await fetch(
        "/api/form/prestamo"
    )
    const data = await res.json();
    console.log(data)
//    llenarSelect(idSelect, lista, campo); 

    llenarSelect("ID_movimiento", data.movimiento, "movimiento");
    llenarSelect("ID_area", data.area, "Area");
    llenarSelect("ID_sede_origen", data.sedeOrigen, "Sede");
    llenarSelect("ID_sede_destino", data.sedeDestino, "Sede");
    llenarSelect("ID_encargado_prestamo", data.encargadoPrestamo, "Nombre");
    llenarSelect("Duracion_prestamo", data.duracion, "Duracion");
    llenarSelect("ID_recepcionista", data.recepcionista, "Nombre");
    llenarSelect("ID_area_destino", data.area, "Area");
    llenarSelect("ID_estado", data.estado, "Estado");


    } catch (error) {
        console.error("error al tratar de cargar la lada a los combos correspondientes a la seccion de prestamo", error)
    }
}


// FUNCION GENÉRICA PARA LLENAR SELECT
// ------------------------------
function llenarSelect(idSelect, lista, campo) {
  const select = document.getElementById(idSelect);

  if (!select) {
    console.warn(`Elemento #${idSelect} no encontrado`);
    return;
  }

  // LIMPIAR SELECT
  select.innerHTML = `<option value="">SELECCIONAR</option>`;

  // Insertar las opciones
  lista.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item[campo];
    opt.textContent = item[campo];

    select.appendChild(opt);
  });
}
