/**
 * ── VARIABLES Y UTILIDADES GLOBALES ───────────────────────────────────────
 * Al estar fuera de los listeners, están disponibles para todo el archivo.
 */
let campoList = [];

// Referencias al DOM (se asignarán dentro de los eventos o se buscan dinámicamente)
const getElementosTabla = () => ({
  tabla: document.getElementById("tbody_tabla_lista_inventario"),
  recuento: document.getElementById("recuento_res_num"),
  nombreCampoLista: document.getElementById("nombre_campo_listado"),
});

const limpiarTabla = () => {
  const { tabla, recuento, nombreCampoLista } = getElementosTabla();
  if (tabla) tabla.innerHTML = "";
  if (nombreCampoLista) nombreCampoLista.textContent = "";
  if (recuento) recuento.textContent = "0";
};

const crearBotonDetalle = (idCampo) =>
  `<button
      class="btn_tabla btn_editar"
      data-id="${idCampo}"
      data-accion="editar">
      📝 Ver detalle
   </button>`;

// FUNCION PARA LISTAR LA TABLA DE MANERA DINAMICA (Disponible globalmente)
const renderizarTabla = ({
  idObjetivo,
  nombreObjeto,
  cantidadRegistro,
  stock,
}) => {
  const { tabla, recuento, nombreCampoLista } = getElementosTabla();

  if (!tabla) return; // Salvaguarda por si el DOM no está listo

  limpiarTabla();

  tabla.innerHTML = campoList
    .map(
      (elementLista) => `
        <tr>
          <td>${elementLista[idObjetivo]}</td>
          <td>${elementLista[nombreObjeto]}</td>
          <td>${elementLista[cantidadRegistro]}</td>
          <td>${elementLista[stock]}</td>
          <td>${crearBotonDetalle(elementLista[idObjetivo])}</td>
        </tr>
      `,
    )
    .join("");

  if (recuento) recuento.textContent = campoList.length;

  if (nombreCampoLista) {
    nombreCampoLista.textContent =
      campoList.length === 1 ? "elemento registrado" : "elementos registrados";
  }
};

/**
 * REDIRIGIR A LA PAGINA DE INFORMES DE INVENTARIOS Y CARGA INICIAL
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/listar_inventario_total");

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const json = await response.json();
    campoList = Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("Error al cargar datos:", error);
    campoList = [];
  }

  // Renderizado por defecto
  renderizarTabla({
    idObjetivo: "idItem",
    nombreObjeto: "nombreObjeto",
    cantidadRegistro: "cantidadRegistros",
    stock: "stockTotal",
  });
});

/**
 * REDIRECCION DE LA PAGINA A LA PESTAÑA DE INFORMES INVENTARIO
 */
document.addEventListener("DOMContentLoaded", () => {
  const btn_reporte = document.getElementById("btn_reporte");
  if (btn_reporte) {
    btn_reporte.addEventListener("click", () => {
      window.location.href = "/informe_inventario";
    });
  }
});

/**
 * BUSCA EN LA LISTA DE INFORME DE INVENTARIO POR MULTIPLES FILTROS
 */
document.addEventListener("DOMContentLoaded", () => {
  const btnBuscarInformeInventario = document.getElementById(
    "btn_buscar_informe_inventario",
  );
  const cbbCategoria = document.getElementById(
    "ID_categoria_informe_inventario",
  );
  const cbbObjeto = document.getElementById("ID_objeto_informe_inventario");
  const cbbMarca = document.getElementById("ID_marca_informe_inventario");
  const cbbModelo = document.getElementById("ID_modelo_informe_inventario");
  const cbbSede = document.getElementById("ID_sede_informe_inventario");
  const cbbCondicion = document.getElementById(
    "ID_Condicion_informe_inventario",
  );

  if (!btnBuscarInformeInventario) return;

  // Volvemos el callback del click ASYNC para poder usar await dentro
  btnBuscarInformeInventario.addEventListener("click", async () => {
    let filtros = {};

    if (cbbCategoria) filtros.idCategoria = cbbCategoria.value;
    if (cbbObjeto) filtros.idObjeto = cbbObjeto.value;
    if (cbbMarca) filtros.idMarca = cbbMarca.value;
    if (cbbModelo) filtros.idModelo = cbbModelo.value;
    if (cbbSede) filtros.idSede = cbbSede.value;
    if (cbbCondicion) filtros.idCondicion = cbbCondicion.value;

    try {
      const res = await fetch("/data/buscar/multifiltros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filtros), // Corregido: antes decía 'parametros'
      });

      if (!res.ok) {
        throw new Error("Error al traer los datos de la busqueda del objeto");
      }

      const data = await res.json();
      console.log("este es el resultado de la busqueda multiple:", data);

      // ASIGNAMOS los nuevos datos de la búsqueda a tu variable global
      campoList = Array.isArray(data.data) ? data.data : data;


      // ¡AQUÍ YA PUEDES USAR LA FUNCIÓN REUTILIZABLE!
      renderizarTabla({
        idObjetivo: "idItem", // Ajusta estos keys si la respuesta de la
        nombreObjeto: "nombreObjeto", // búsqueda usa nombres de columnas diferentes
        cantidadRegistro: "cantidadRegistros",
        stock: "stockTotal",
      });
    } catch (err) {
      console.error(err);
    }
  });
});
