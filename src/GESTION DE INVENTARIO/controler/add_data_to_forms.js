document.addEventListener("DOMContentLoaded", cargarCombos);

async function cargarCombos() {
  try {
    const res = await fetch("/api/form");
    const data = await res.json();
    // console.log("Datos para combos:", data);
    // CAMPOS EXACTOS SEGÚN TU API
    llenarSelectEspeciales("ID_area", data.area, "Area", "ID_area");
    llenarSelectEspeciales("ID_sede", data.sede, "Sede", "ID_sede");
    llenarSelectEspeciales(
      "ID_marca",
      data.marca,
      "Marca",
      "ID_marca",
      "ID_categoria",
    );
    llenarSelectEspeciales(
      "ID_objeto",
      data.item,
      "Item",
      "ID_item",
      "ID_categoria",
    );
    llenarSelectEspeciales("ID_categoria", data.categoria, "categoria", "ID_categoria");
    llenarSelectEspeciales(
      "ID_modelo",
      data.modelo,
      "modelo",
      "ID_modelo",
      "ID_categoria",
    );
    llenarSelectEspeciales("ID_medida", data.medida, "Medida", "ID_medida");
    llenarSelectEspeciales("ID_Estado", data.estadoObj, "estado", "ID_Estado");
    llenarSelectEspeciales(
      "ID_Disponibilidad",
      data.disponibilidad,
      "Disponibilidad",
      "ID_DisponibilidadObj",
    );
    llenarSelectEspeciales(
      "ID_Condicion",
      data.condicion,
      "Condicion",
      "ID_CondicionObj",
    );
    llenarSelectEspeciales("ID_seccion", data.seccion, "Seccion", "ID_seccion");
  } catch (error) {
    console.error("Error al cargar combos:", error);
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

  // Limpiar
  select.innerHTML = `<option value="">SELECCIONAR</option>`;

  // Llenar opciones
  lista.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item[id];
    opt.textContent = item[campo];
    select.appendChild(opt);
  });

  // 🔥 Inicializar Select2 UNA SOLA VEZ
  $(`#${idSelect}`).select2({
    placeholder: "Buscar...",
    allowClear: true,
    width: "100%",
  });
}

//FUNCION LLENAR SELECT CAMPOS ESPECIALES
function llenarSelectEspeciales(idSelect, lista, campo, id, categoria) {
  const select = document.getElementById(idSelect);

  if (!select) {
    console.warn(`Elemento #${idSelect} no encontrado`);
    return;
  }

  // Limpiar
  select.innerHTML = `<option value="">SELECCIONAR</option>`;

  // Llenar opciones
  lista.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item[id];
    opt.textContent = item[campo];

    if (item[categoria]) {
      opt.setAttribute("data-categoria", item[categoria]);
    }

    select.appendChild(opt);
  });

  // 🔥 Inicializar Select2 UNA SOLA VEZ
  $(`#${idSelect}`).select2({
    placeholder: "Buscar...",
    allowClear: true,
    width: "100%",
  });
}
