/**
 * --------------------------------------
 * Este script reune todas las tareas automaticas que se añaden mediante tareas del DOM  
 * 
 */



/*
CARGAR DATA A LOS SELECT PARA REGISTRO DE NUEVOS CAMPOS

Esta funcion liista los campos para los select correspondientes del formulario que hace el CRUD de mantenimiento de los nuevos campos
*/


document.addEventListener("DOMContentLoaded", () => {
  cargarCombosParaAgregar();
});

async function cargarCombosParaAgregar() {
  try {
    const res = await fetch("/api/form");
    const data = await res.json();
   
 

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




/*
LISTAR TABLA DE CAMPOS REGISTRADOS (marca, modelo, items)

Esta funcion liista los campos(marca, modelo, items) registrados en la base de datos
*/


document.addEventListener("DOMContentLoaded", async () => {
  // ── Referencias al DOM ───────────────────────────────────────────────────
  const tabla = document.getElementById("tbody_tabla_lista_campos");
  const btnObjeto = document.getElementById("btn_objeto");
  const btnMarca = document.getElementById("btn_marca");
  const btnModelo = document.getElementById("btn_modelo");
  const recuento = document.getElementById("recuento_res_num");
  const nombreCampoLista = document.getElementById("nombre_campo_listado");

  // ── Utilidades de renderizado ────────────────────────────────────────────
  const limpiarTabla = () => {
    tabla.innerHTML = "";
    nombreCampoLista.textContent = "";
    recuento.textContent = "0";
  };

  // CREACION DE BOTONES
  const crearBotonEditar = (
    idCampo,
    nombreCampo,
    categoria,
    estado,
    descripcion,
  ) =>
    `<button
      class="btn_tabla btn_editar"
      data-id="${idCampo}"
      data-nombre="${nombreCampo}"
      data-categoria="${categoria}"
      data-estado="${estado}"
      data-descripcion = "${descripcion}"
      data-accion="editar">
      📝 Editar
   </button>`;

  const crearBotonEliminar = (idCampo, tipoElemento) =>
    `<button 
      class="btn_tabla btn_eliminar"
      data-id="${idCampo}"
      data-accion="eliminar" 
      data-tipo="${tipoElemento}">
       🗑️ Eliminar
     </button>`;

  //FUNCION PARA LISTAR LA TABLA DE MANERA DINAMICA
  const renderizarTabla = ({
    campoList,
    columId,
    colmNombre,
    columCategoria,
    columEstado,
    tablaOrigen,
    idCategoria,
    idEstado,
    descripcion,
  }) => {
    limpiarTabla();

    tabla.innerHTML = campoList
      .map(
        (elementCampo) => `
          <tr>
            <td>${elementCampo[columId]}</td>
            <td>${elementCampo[colmNombre]}</td>
            <td>${elementCampo[columCategoria]}</td>
            <td>${elementCampo[columEstado]}</td>
            <td>${crearBotonEditar(
              elementCampo[columId],
              elementCampo[colmNombre],
              elementCampo[idCategoria],
              elementCampo[idEstado],
              elementCampo[descripcion],
            )}
            </td>
            <td>
            ${crearBotonEliminar(elementCampo[columId], tablaOrigen)}
            </td>
          </tr>
        `,
      )
      .join("");

    recuento.textContent = campoList.length;

    //valida la pluralidad
    if (campoList.length == 1) {
      nombreCampoLista.textContent = tablaOrigen + " " + "registrada";
    } else {
      nombreCampoLista.textContent =
        tablaOrigen + "s" + " " + "resgistradas(os)";
    }
  };
  // -------------------------------------------------------------------
  // variables que almacenan los resulatdos llegados de la API
  let items = [];
  let marcas = [];
  let modelos = [];

  try {
    const response = await fetch("/listar_nuevos_datos");

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    ({
      data: { items, marcas, modelos },
    } = await response.json());
  } catch (error) {
    console.error("Error al cargar datos:", error);

    // renderizar por defecto los campos de objeto
  }

  renderizarTabla({
    campoList: items,
    columId: "ID_item",
    colmNombre: "Item",
    columCategoria: "Categoria",
    columEstado: "Estado",
    tablaOrigen: "item",
    idCategoria: "ID_categoria",
    idEstado: "ID_Estado",
    descripcion: "descripcion",
  });

  // ── Listeners de los botones de filtro ───────────────────────────────────
  btnObjeto.addEventListener("click", () => {
    renderizarTabla({
      campoList: items,
      columId: "ID_item",
      colmNombre: "Item",
      columCategoria: "Categoria",
      columEstado: "Estado",
      tablaOrigen: "item",
      idCategoria: "ID_categoria",
      idEstado: "ID_Estado",
      descripcion: "descripcion",
    });
  });

  btnMarca.addEventListener("click", () => {
    renderizarTabla({
      campoList: marcas,
      columId: "ID_marca",
      colmNombre: "Marca",
      columCategoria: "Categoria",
      columEstado: "Estado",
      tablaOrigen: "marca",
      idCategoria: "ID_categoria",
      idEstado: "ID_Estado",
      descripcion: "descripcion",
    });
  });

  btnModelo.addEventListener("click", () => {
    renderizarTabla({
      campoList: modelos,
      columId: "ID_modelo",
      colmNombre: "modelo",
      columCategoria: "Categoria",
      columEstado: "Estado",
      tablaOrigen: "modelo",
      idCategoria: "ID_categoria",
      idEstado: "ID_Estado",
      descripcion: "descripcion",
    });
  });
});
