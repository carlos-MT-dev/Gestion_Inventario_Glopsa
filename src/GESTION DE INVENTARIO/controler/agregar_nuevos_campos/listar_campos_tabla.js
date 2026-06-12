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

  const crearBotonEditar = (idCampo) =>
    `<button class="btn_tabla btn_editar" data-id="${idCampo}" data-accion="editar">
       📝 Editar
     </button>`;

  const crearBotonEliminar = (idCampo) =>
    `<button class="btn_tabla btn_eliminar" data-id="${idCampo}" data-accion="eliminar">
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
            <td>${crearBotonEditar(registro[idField])}</td>
            <td>${crearBotonEliminar(registro[idField])}</td>
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




// renderizar por defecto los campos de objeto
  }renderizarTabla({
    datos: items,
    idField: "ID_item",
    nombreField: "Item",
    tipo: "objeto",
  });

  // ── Listeners de los botones de filtro ───────────────────────────────────
  btnObjeto.addEventListener("click", () => {
    renderizarTabla({
      datos: items,
      idField: "ID_item",
      nombreField: "Item",
      tipo: "objeto",
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

  // ── Delegación de eventos: Editar y Eliminar ─────────────────────────────
  // Un único listener en el <tbody> cubre TODOS los botones, presentes y futuros.
  // Cuando el usuario hace click en cualquier parte de la tabla, revisamos si
  // el elemento clicado (o su ancestro más cercano) es un botón de acción.
  tabla.addEventListener("click", (event) => {
    const boton = event.target.closest("[data-accion]");

    // Si el click no fue sobre un botón de acción, ignoramos el evento
    if (!boton) return;

    const accion = boton.dataset.accion; // "editar" | "eliminar"
    const id = boton.dataset.id;
    const tipo = tipoActivo; // "objeto" | "marca" | "modelo"

    if (accion === "editar") {
      // TODO: llamada al backend Express para obtener y cargar los datos
      // del registro con `id` del tipo `tipo`, y mostrarlos en el formulario de edición.
    }

    if (accion === "eliminar") {
      // TODO: llamada al backend Express para eliminar el registro con `id`
      // del tipo `tipo`, y luego refrescar la tabla.
    }
  });
});
