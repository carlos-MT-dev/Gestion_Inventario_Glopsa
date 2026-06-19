document.addEventListener("DOMContentLoaded", async () => {
  // ── Referencias al DOM ───────────────────────────────────────────────────
  const tabla = document.getElementById("tbody_tabla_lista_campos");
  const btnObjeto = document.getElementById("btn_objeto");
  const btnMarca = document.getElementById("btn_marca");
  const btnModelo = document.getElementById("btn_modelo");
  const recuento = document.getElementById("recuento_res_num");

  // ── Estado activo ────────────────────────────────────────────────────────
  // Guarda qué tipo de datos se están mostrando actualmente en la tabla.
  // Lo necesitamos en los handlers para saber a qué endpoint llamar.
  let tipoActivo = null; // "objeto" | "marca" | "modelo"

  // ── Utilidades de renderizado ────────────────────────────────────────────
  const limpiarTabla = () => {
    tabla.innerHTML = "";
    recuento.textContent = "0";
  };

  // (registro[nombreField], registro.Categoria, registro.Estado);
  const crearBotonEditar = (
    idCampo,
    tipoElemento,
    nombreCampo,
    categoria,
    estado,
  ) =>
    `<button
      class="btn_tabla btn_editar"
      data-id="${idCampo}"
      data-tipo="${tipoElemento}"
      data-nombre="${nombreCampo}"
      data-categoria="${categoria}"
      data-estado="${estado}"
      data-accion="editar">
      📝 Editar
   </button>`;

  const crearBotonEliminar = (idCampo, tipoElemento) =>
    `<button class="btn_tabla btn_eliminar" data-id="${idCampo}" data-accion="eliminar" data-tipo="${tipoElemento}">
       🗑️ Eliminar
     </button>`;

  const renderizarTabla = ({ datos, idField, nombreField, tipo }) => {
    limpiarTabla();
    tipoActivo = tipo;

    tabla.innerHTML = datos
      .map(
        (registro) => `
          <tr>
            <td>${registro[idField]}</td>
            <td>${registro[nombreField]}</td>
            <td>${registro.Categoria}</td>
            <td>${registro.Estado}</td>
            <td>${crearBotonEditar(registro[idField], tipo, registro[nombreField], registro.Categoria, registro.Estado)}</td>
            <td>${crearBotonEliminar(registro[idField], tipo)}</td>
          </tr>
        `,
      )
      .join("");

    recuento.textContent = datos.length;
  };

  // ── Carga de datos ───────────────────────────────────────────────────────
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

    // ID_modelo: 4,
    //   modelo: 'STONG ARM',
    //   Categoria: 'LIMPIEZA',
    //   Estado: 'Activo',
    //   descripcion: ''

    //  ID_marca: 27,
    // Marca: 'FABER CASTELL',
    // Area: 'ALMACEN',
    // Categoria: 'GENERICO',
    // Estado: 'Activo',
    // descripcion: ''

    // renderizar por defecto los campos de objeto
  }renderizarTabla({
    datos: items,
    idField: "ID_item",
    nombreField: "Item",
    tipo: "item",
  });

  // ── Listeners de los botones de filtro ───────────────────────────────────
  btnObjeto.addEventListener("click", () => {
    renderizarTabla({
      datos: items,
      idField: "ID_item",
      nombreField: "Item",
      tipo: "item",
    });
  });

  btnMarca.addEventListener("click", () => {
    renderizarTabla({
      datos: marcas,
      idField: "ID_marca",
      nombreField: "Marca",
      tipo: "marca",
    });
  });

  btnModelo.addEventListener("click", () => {
    renderizarTabla({
      datos: modelos,
      idField: "ID_modelo",
      nombreField: "modelo",
      tipo: "modelo",
    });
  });

  
});



