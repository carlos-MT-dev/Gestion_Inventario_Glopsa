// ===============================
// 🔹 VARIABLES GLOBALES
// ===============================

let formData = null;
let isLoadingFromButton = false;

// ===============================
// 🔹 CARGAR DATA DEL BACKEND
// ===============================

async function loadFormData() {
  try {
    const res = await fetch("/api/form");
    formData = await res.json();
    console.log("Datos cargados:", formData);
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
}

// ===============================
// 🔹 EVENTO CHANGE CATEGORÍA
// ===============================

function handleCategoryChange() {
  // 🔥 BLOQUEO SI SE ESTÁ CARGANDO DESDE BOTÓN
  if (isLoadingFromButton) return;

  const categoriaID = document.getElementById("ID_categoria").value;

  if (!categoriaID) {
    limpiarSelect("ID_marca");
    limpiarSelect("ID_modelo");
    limpiarSelect("ID_objeto");
    return;
  }

  const objetoFiltradas = formData.item.filter(
    (m) => m.ID_categoria == categoriaID,
  );

  const marcasFiltradas = formData.marca.filter(
    (m) => m.ID_categoria == categoriaID,
  );

  const modelosFiltrados = formData.modelo.filter(
    (m) => m.ID_categoria == categoriaID,
  );

  llenarSelect({
    idSelect: "ID_marca",
    lista: marcasFiltradas,
    label: "Marca",
    value: "ID_marca",
  });

  llenarSelect({
    idSelect: "ID_modelo",
    lista: modelosFiltrados,
    label: "modelo",
    value: "ID_modelo",
  });

  llenarSelect({
    idSelect: "ID_objeto",
    lista: objetoFiltradas,
    label: "Item",
    value: "ID_item",
  });
}

// ===============================
// 🔹 FUNCIÓN GENÉRICA PARA LLENAR SELECT
// ===============================

function llenarSelect({ idSelect, lista, label, value }) {
  const select = document.getElementById(idSelect);

  if (!select) {
    console.warn(`Elemento #${idSelect} no encontrado`);
    return;
  }

  select.innerHTML = `<option value="">SELECCIONAR</option>`;

  lista.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item[value];
    opt.textContent = item[label];
    select.appendChild(opt);
  });
}

// ===============================
// 🔹 LIMPIAR SELECT
// ===============================

function limpiarSelect(idSelect) {
  const select = document.getElementById(idSelect);
  if (select) {
    select.innerHTML = `<option value="">SELECCIONAR</option>`;
  }
}

// ===============================
// 🔹 BOTÓN SELECCIONAR
// ===============================

function cargarFilaEnFormulario(fila) {
  isLoadingFromButton = true; 

  // 1️⃣ Setear categoría
  document.getElementById("ID_categoria").value = fila.ID_categoria;

  // 2️⃣ Cargar dependientes manualmente
  // IMPORTANTE: aquí llamamos directo la función
  handleCategoryChange();

  // 3️⃣ Ahora sí seteamos valores específicos
  document.getElementById("ID_marca").value = fila.ID_marca;
  document.getElementById("ID_modelo").value = fila.ID_modelo;
  document.getElementById("ID_objeto").value = fila.ID_item;

  isLoadingFromButton = false; 
}

// ===============================
// 🔹 INICIALIZACIÓN DEL SISTEMA
// ===============================



document.addEventListener("DOMContentLoaded", async () => {
  await loadFormData();

  // Llenar categorías iniciales
  llenarSelect({
    idSelect: "ID_categoria",
    lista: formData.categoria,
    label: "categoria",
    value: "ID_categoria",
  });

  // Registrar evento UNA sola vez
  document
    .getElementById("ID_categoria")
    .addEventListener("change", handleCategoryChange);
});
