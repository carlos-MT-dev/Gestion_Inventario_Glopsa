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


  const btnBuscarInformeInventario = document.getElementById("btn_buscar_informe_inventario",);
  const cbbCategoria = document.getElementById("ID_categoria_informe_inventario",);
  const cbbObjeto = document.getElementById("ID_objeto_informe_inventario");
  const cbbMarca = document.getElementById("ID_marca_informe_inventario");
  const cbbModelo = document.getElementById("ID_modelo_informe_inventario");
  const cbbSede = document.getElementById("ID_sede_informe_inventario");
  const cbbCondicion = document.getElementById("ID_Condicion_informe_inventario",);

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

      renderizarTabla({
        idObjetivo: "idItem",
        nombreObjeto: "nombreObjeto",
        cantidadRegistro: "cantidadRegistros",
        stock: "stockTotal",
      });
    } catch (err) {
      console.error(err);
    }
  });
});

/**
 * 
 * CREAR UN EXCEL DE INVENTARIO
 */



const crearWorkbookDesdeDatos = async (data) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Sistema Glopsa";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Inventario");

  sheet.columns = [
    { header: "Id Objeto", key: "idItem", width: 15 },
    { header: "Nombre del objeto", key: "nombreObjeto", width: 35 },
    { header: "Numero de registros", key: "cantidadRegistros", width: 20 },
    { header: "Total", key: "stockTotal", width: 15 },
  ];

  data.forEach((item) => {
    sheet.addRow({
      idItem: item.idItem,
      nombreObjeto: item.nombreObjeto,
      cantidadRegistros: item.cantidadRegistros,
      stockTotal: item.stockTotal,
    });
  });

  sheet.getRow(1).font = { bold: true };
  sheet.eachRow({ includeEmpty: false }, (row) => {
    row.alignment = { vertical: "middle", horizontal: "left" };
  });

  return workbook;
};

const descargarExcelDesdeDatos = async (data) => {
  try {
    const workbook = await crearWorkbookDesdeDatos(data);
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte_inventario.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generando el archivo Excel:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {

  const btn_generar_reporte = document.getElementById("btn_generar_reporte");

  if (!btn_generar_reporte) return;

  btn_generar_reporte.addEventListener("click", async () => {
    if (!Array.isArray(campoList) || campoList.length === 0) {
      try {
        const response = await fetch("/listar_inventario_total");

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const json = await response.json();
        campoList = Array.isArray(json.data) ? json.data : [];
      } catch (error) {
        console.error("Error al cargar datos para el reporte:", error);
        return;
      }
    }

    await descargarExcelDesdeDatos(campoList);
  });
});