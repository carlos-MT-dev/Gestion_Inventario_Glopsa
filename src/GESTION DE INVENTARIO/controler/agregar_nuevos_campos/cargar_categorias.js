document.addEventListener("DOMContentLoaded", () => {
  const btn_agregar_nuevos_campos = document.getElementById(
    "btn_agregar_nuevos_campos",
  );

  btn_agregar_nuevos_campos.addEventListener("click", () => {
    cargarCombosParaAgregar();
  });
});

async function cargarCombosParaAgregar() {
  try {
    const res = await fetch("/api/form");
    const data = await res.json();
    console.log(data.categoria)
    llenarSelect(
      "agregar_categoria_objeto",
      data.categoria,
      "categoria",
      "ID_categoria",
    );
    llenarSelect(
      "agregar_categoria_modelo",
      data.categoria,
      "categoria",
      "ID_categoria",
    );
    llenarSelect(
      "agregar_categoria_marca",
      data.categoria,
      "categoria",
      "ID_categoria",
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
