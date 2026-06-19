document.addEventListener("DOMContentLoaded", () => {
  cargarCombosParaAgregar();
});

async function cargarCombosParaAgregar() {
  try {
    const res = await fetch("/api/form");
    const data = await res.json();
    // console.log(data.categoria)
    //idSelect, lista, campo, id
    llenarSelect(
      "cbb_agregar_area_campos"
      , data.area
      , "Area"
      , "ID_area"
    );
    llenarSelect(
      "cbb_agregar_categoria_campos",
      data.categoria,
      "categoria",
      "ID_categoria",
    );
    llenarSelect(
      "cbb_agregar_estado_campos",
      data.estadoObj,
      "estado",
      "ID_Estado",
    );
  } catch (error) {
    console.error(
      "Error al cargar categorías para agregar nuevos campos:",
      error,
    );
  }
}

// ------------------------------
// FUNCION GENÉRICA PARA LLENAR SELECT
// ------------------------------

// ("ID_area", data.area, "Area", "ID_area");
function llenarSelect(idSelect, lista, campo, id) {
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
    let pos = 0;
    opt.value = item[id];
    opt.textContent = item[campo];
    select.appendChild(opt);
  });
}
//
