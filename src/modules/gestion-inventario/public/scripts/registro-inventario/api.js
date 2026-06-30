/**
 * --------------------------------------
 * Este script reune las tareas automatizadas 
 */

/** 
 * CARGAR DATOS A LOS SELECT DEL FORMULARIO DEL APARTADO DE REGOSTRO INVENTARIO
 * 
 * este apartado carga los datos de manera automatica dentro del formulario de 
 * regstro de iventario
*/

document.addEventListener("DOMContentLoaded", cargarCombos);

async function cargarCombos() {
  try {
    const res = await fetch("/api/form");
    const data = await res.json();
    
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
    llenarSelectEspeciales(
      "ID_categoria",
      data.categoria,
      "categoria",
      "ID_categoria",
    );
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


/** 
 * CARGAR DATOS A LA TABLA PRINCIPAL
 * 
 * este apartado carga los datos de manera automatica a la tabla del apartado
 * de registro de inventario
*/


document.addEventListener("DOMContentLoaded", () => {
  cargarTabla();
});

async function cargarTabla() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();

    if (!data || data.length === 0) {
      console.log("No hay datos");
      return;
    }

    const tbody = document.getElementById("tbody-objetos");
    tbody.innerHTML = "";

    const fragment = document.createDocumentFragment();

    data.forEach((obj) => {
      const row = document.createElement("tr");
      row.classList.add("row-wrapper");

      row.innerHTML = `
        <td>${obj.Codigo}</td>
        <td>${obj.Area}</td> 
        <td>${obj.Sede}</td>
        <td>${obj.Item ?? "falta  traer"}</td>
        <td>${obj.Categoria ?? "_"}</td>
        <td>${obj.Marca ?? "_"}</td>
        <td>${obj.Modelo ?? "_"}</td>
        <td>${obj.Estado ?? "_"}</td>
        <td>${new Date(obj.fecha_registro).toISOString().split("T")[0] ?? "_"}</td>
        <td>${obj.Disponibilidad ?? "_"}</td>
        <td>${obj.Condicion ?? "_"}</td>
        <td>${obj.Seccion ?? "_"}</td>
        <td>${new Date(obj.Fecha_compra).toISOString().split("T")[0] ?? "_"}</td>
        <td>
          <button 
            class="btn-edit btn buttons select-btn"
            data-codigo="${obj.Codigo}"
            data-id_objeto="${obj.ID_objeto}"
            data-area="${obj.ID_area}"
            data-sede="${obj.ID_sede}"
            data-objeto="${obj.ID_item}"
            data-categoria="${obj.ID_categoria}"
            data-marca="${obj.ID_marca}"
            data-modelo="${obj.ID_modelo}"
            data-estado="${obj.ID_Estado}"
            data-fecha_registro="${new Date(obj.fecha_registro).toISOString().split("T")[0] ?? ""}"
            data-disponibilidad="${obj.ID_DisponibilidadObj}"
            data-condicion="${obj.ID_CondicionObj}"
            data-seccion="${obj.ID_seccion}"
            data-fecha_compra="${obj.Fecha_compra ? new Date(obj.Fecha_compra).toISOString().split("T")[0] : ""}"
            data-descripcion="${obj.Descripcion ?? ""}"
            data-unidad_medida="${obj.ID_medida}"
            data-stock="${obj.Stock}"
          >
              <i class="fa-regular fa-square-check" style="color: rgb(6, 6, 6);"></i>
          </button>
        </td>
        <td>
          <button 
            class="btn-mover btn buttons mover-btn btn-mover-item-class"
            id = "btn-mover-item"
            data-codigo="${obj.Codigo}"
            data-id_objeto="${obj.ID_objeto}"
            data-area="${obj.ID_area}"
            data-sede="${obj.ID_sede}"
            data-objeto="${obj.ID_item}"
            data-categoria="${obj.ID_categoria}"
            data-marca="${obj.ID_marca}"
            data-modelo="${obj.ID_modelo}"
            data-estado="${obj.ID_Estado}"
            data-fecha_registro="${new Date(obj.fecha_registro).toLocaleString() ?? ""}"
            data-disponibilidad="${obj.ID_DisponibilidadObj}"
            data-condicion="${obj.ID_CondicionObj}"
            data-seccion="${obj.ID_seccion}"
            data-fecha_compra="${obj.Fecha_compra ? obj.Fecha_compra.split("T")[0] : ""}"
            data-descripcion="${obj.Descripcion ?? ""}"
            data-unidad_medida="${obj.ID_medida}"
            data-stock="${obj.Stock}"
          >
          <i class="fa-solid fa-circle-arrow-right" style="color: rgb(0, 0, 0);"></i>
          </button>
           <td>
          <button 
            class="btn-codigo btn buttons codigo-btn btn-codigo-item-class"
            id = "btn-codigo-item"
            data-codigo="${obj.Codigo}"
            data-id_objeto="${obj.ID_objeto}"
          >
           
 <i class="fa-solid fa-arrow-up-from-bracket" style="color: rgb(1, 1, 1);"></i>
          </button>
        </td>
      `;

      fragment.appendChild(row);
    });

    tbody.appendChild(fragment);
  } catch (error) {
    console.error("Error al cargar tabla:", error);
  }
}

window.cargarTabla = cargarTabla;


