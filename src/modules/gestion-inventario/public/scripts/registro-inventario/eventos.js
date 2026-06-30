/**
 * --------------------------------------
 * Este script reune todos los eventos añadidos al DOM para el apartado de registro de inventario
 */



/*
GENERAR CODIGO DE BARRAS

Este evento crear un codigo de barra unico para cada elemnto registrado 
en el inventario, se basa en el ip unico generado en el campo cod., 
el cual tiene la siguiente estructura (inciales sede - area - timestamp del sistema )
*/

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-codigo-item-class");

  if (!btn) return;

  const codigo = btn.dataset.codigo;

  // console.log("Código:", codigo);

  generarYDescargar(codigo);
});

function generarYDescargar(codigo) {
  const canvas = document.createElement("canvas");

  JsBarcode(canvas, codigo, {
    format: "CODE128",
    width: 2,
    height: 80,
    displayValue: true,
  });

  const url = canvas.toDataURL("image/png");

  const a = document.createElement("a");
  a.href = url;
  a.download = `${codigo}.png`;
  a.click();
}





/**
 * ELIMINAR ELEMENTO DE LA TABLA
 * 
 * Este evento eliminar la fila previamente seleccionada mediante el boton select
 * ubicado en cada una de las filas listadas en la tabla

 */


document.addEventListener("DOMContentLoaded", () => {
  const btnDelete = document.querySelector(".btn.remove");

  if (!btnDelete) {
    console.error("No se encontró el botón de eliminar");
    return;
  }

  btnDelete.addEventListener("click", async () => {
    const id = document.getElementById("ID_area").getAttribute("ID_objeto");
    // console.log("ID obtenido del DOM:", id, "Tipo:", typeof id);

    if (!id) {
      alert("Por favor, selecciona un objeto de la tabla primero.");
      return;
    }

    if (!confirm("¿Estás seguro de que quieres eliminar este objeto?")) {
      return;
    }

    try {
      console.log("Enviando fetch con ID:", id);
      const res = await fetch("/api/delete/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message || "Objeto eliminado correctamente");
        // Recargar la tabla
        if (window.cargarTabla) {
          window.cargarTabla();
        } else {
          location.reload();
        }
      } else {
        try {
          const errorData = await res.json();
          alert(
            "Error al eliminar: " +
              (errorData.message || errorData.error || "Error desconocido"),
          );
        } catch (e) {
          alert("Error al eliminar: " + res.status + " " + res.statusText);
        }
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error de conexión al eliminar el objeto");
    }
  });
});


/**
 * MOVER REGISTRO PARA PRESTAMOS
 * 
 * Este evento envia el registro seleccionado mediante el boton "mov" 
 * al apartado de prestamos donde se realizara los procedimientos 
 * del registro del prestamo del item

 */


document.addEventListener("click", (e) => {
  const boton = e.target.closest(".btn-mover-item-class");

  if (!boton) return;

  moverCodigoId(boton);
});

async function moverCodigoId(btn) {
  const id = btn.dataset.codigo;
  // guardar en localStorage
  localStorage.setItem("idObjeto", id);

  // redirigir
  window.location.href = "/prestamo";
}


/**
 * RECARGAR LA PAGINA MEDIANTE CLICK
 * 
 * Este evento permite que un click recargue la pagina

 */


document.getElementById("btn-reset").addEventListener("click", () => {
  document.getElementById("form-registro").reset();
});


/**
 * BUSCAR REGISTRO POR CAMPOS
 * 
 * Este evento permite buscar un registo de la tabala registro de inventario
 *  por medio de la insercion de multiples campos

 */

import listarTabla from "../../scripts/funciones-globales/listar-tabla.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-buscar").addEventListener("click", async () => {
    // SELECCIONAMOS EL CODIGO DE BUSQUEDA
    let codigoBusqueda = limpiarEspacios(
      document.getElementById("Codigo").value,
    );
    let AreaRegCbb = document.getElementById("ID_area").value;
    let SedeRegCbb = document.getElementById("ID_sede").value;
    let MarcaRegCbb = document.getElementById("ID_marca").value;
    let ObjetoRegCbb = document.getElementById("ID_objeto").value;
    let CategoriaRegCbb = document.getElementById("ID_categoria").value;
    let ModeloRegCbb = document.getElementById("ID_modelo").value;
    let UnidMedRegCbb = document.getElementById("ID_medida").value;
    let estadoRegCbb = document.getElementById("ID_Estado").value;
    let DisponibilidadRegCbb =
      document.getElementById("ID_Disponibilidad").value;
    let CondicionRegCbb = document.getElementById("ID_Condicion").value;
    let SeccionRegCbb = document.getElementById("ID_seccion").value;

    // GUARDAMOS TODOS LOS VALORES EN UN ARREGLO PARA DESÚES SER EVALUADOS SI VIENEN CON CONTENIDO
    const parametros = {};

    //condicionales para poder verificar

    if (codigoBusqueda) {
      parametros.codigo = codigoBusqueda;
    } else {
      console.log("no hay datos en codigo");
    }

    if (AreaRegCbb) {
      parametros.area = AreaRegCbb;
    } else {
      console.log("no hay datos en area");
    }

    if (SedeRegCbb) {
      parametros.sede = SedeRegCbb;
    } else {
      console.log("no hay datos en sede");
    }

    if (MarcaRegCbb) {
      parametros.marca = MarcaRegCbb;
    } else {
      console.log("no hay datos en marca");
    }

    if (ObjetoRegCbb) {
      parametros.objeto = ObjetoRegCbb;
    } else {
      console.log("no hay datos en objeto");
    }

    if (CategoriaRegCbb) {
      parametros.categoria = CategoriaRegCbb;
    } else {
      console.log("no hay datos en categoria");
    }

    if (ModeloRegCbb) {
      parametros.modelo = ModeloRegCbb;
    } else {
      console.log("no hay datos en modelo");
    }

    if (UnidMedRegCbb) {
      parametros.unidad = UnidMedRegCbb;
    } else {
      console.log("no hay datos en unidad");
    }

    if (estadoRegCbb) {
      parametros.estado = estadoRegCbb;
    } else {
      console.log("no hay datos en estado");
    }

    if (DisponibilidadRegCbb) {
      parametros.disponibilidad = DisponibilidadRegCbb;
    } else {
      console.log("no hay datos en disponibilidad");
    }

    if (CondicionRegCbb) {
      parametros.condicion = CondicionRegCbb;
    } else {
      console.log("no hay datos en condicion");
    }

    if (SeccionRegCbb) {
      parametros.seccion = SeccionRegCbb;
    } else {
      console.log("no hay datos en seccion");
    }

    // imprimimos los datos que llegan
    console.log("los datos que se enviaran para la busqueda son:", parametros);

    try {
      const res = await fetch("/data/buscar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parametros),
      });

      if (!res.ok) {
        throw new Error("Error al traer los datos de la busqeuda del objeto");
      } else {

        console.log("los datos llegados de la query son correctos", res);
        
      }
      const data = await res.json();

        console.log("este es el resultado de la busqueda multiple:", data);

      listarTabla(data, "tbody-objetos");
      
    } catch (err) {
      console.error(err);
    }
  });

  //FUNCIONES GENERALES PARA EL TRATAMIENTO DE DATOS EN LA TABLA
  function limpiarEspacios(string) {
    string = string.trim().replace(/\s+/g, "");
    return string;
  }
});


/**
 * SELECCIONAR FILA Y LLENAR SELECTS
 * 
 * Este evento permite que al seleccioanr una fila mediante el boton select.
 *  se carguen los campos de los select del aparatado de registro inventario

 */


document.addEventListener("click", (e) => {
  const btn = e.target.closest(".select-btn");

  if (btn) {
    cargarFormulario(btn);
    console.log("el boton seleccionar si existe");
  }
});

function cargarFormulario(btn) {
  try {
    console.log("Dataset completo:", btn.dataset);

    // Código (input normal)
    document.getElementById("Codigo").value =
      btn.dataset.codigo + "-" + btn.dataset.id_objeto;

    // Área
    if (document.getElementById("ID_area")) {
      const value = btn.dataset.area;
      $("#ID_area").val(value).trigger("change");
    }

    // Sede
    if (document.getElementById("ID_sede")) {
      const value = btn.dataset.sede;
      $("#ID_sede").val(value).trigger("change");
    }

    // Objeto
    if (document.getElementById("ID_objeto")) {
      const value = btn.dataset.objeto;
      $("#ID_objeto").val(value).trigger("change");
    }

    // Categoría
    if (document.getElementById("ID_categoria")) {
      const value = btn.dataset.categoria;
      $("#ID_categoria").val(value).trigger("change");
    }

    // Marca
    if (document.getElementById("ID_marca")) {
      const value = btn.dataset.marca;
      $("#ID_marca").val(value).trigger("change");
    }

    // Modelo
    if (document.getElementById("ID_modelo")) {
      const value = btn.dataset.modelo;
      $("#ID_modelo").val(value).trigger("change");
    }

    // Estado
    if (document.getElementById("ID_Estado")) {
      const value = btn.dataset.estado;
      $("#ID_Estado").val(value).trigger("change");
    }

    // Descripción (input normal)
    if (document.getElementById("Descripcion")) {
      document.getElementById("Descripcion").value = btn.dataset.descripcion;
    }

    // Disponibilidad
    if (document.getElementById("ID_Disponibilidad")) {
      const value = btn.dataset.disponibilidad;
      $("#ID_Disponibilidad").val(value).trigger("change");
    }

    // Condición
    if (document.getElementById("ID_Condicion")) {
      const value = btn.dataset.condicion;
      $("#ID_Condicion").val(value).trigger("change");
    }

    // Sección
    if (document.getElementById("ID_seccion")) {
      const value = btn.dataset.seccion;
      $("#ID_seccion").val(value).trigger("change");
    }

    // Fecha
    if (document.getElementById("Fecha_Compra")) {
      document.getElementById("Fecha_Compra").value = btn.dataset.fecha_compra;
    }

    // Medida
    if (document.getElementById("ID_medida")) {
      const value = btn.dataset.unidad_medida;
      $("#ID_medida").val(value).trigger("change");
    }

    // Stock
    if (document.getElementById("Unidad_txt")) {
      document.getElementById("Unidad_txt").value = btn.dataset.stock;
    }

    // Atributos extra
    document
      .getElementById("ID_area")
      .setAttribute("ID_objeto", btn.dataset.id_objeto);

    document
      .getElementById("btn-actualizar")
      .setAttribute("ID_objeto_btn_actualizar", btn.dataset.id_objeto);

    console.log("Formulario cargado exitosamente");
  } catch (error) {
    console.log("Error al cargar el formulario:", error);
  }
}


/**
 * ENVIAR DATOS DEL REGISTRO DE INVENTARIO A LA BASE DE DATOS
 * 
 * Este evento permite que al presionar el boton registrar del apartado de registro
 *  de inventario, se carguen los datos a la base de datos 

 */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-registrar");
  const form = document.getElementById("form-registro");

  if (!btn || !form) {
    console.error("No se encontró el botón o el formulario");
    return;
  }

  btn.addEventListener("click", async () => {
    try {
      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData);

      const res = await fetch("/registrar_equipo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      // Verificar si la respuesta es JSON válida
      const contentType = res.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        // Si no es JSON, probablemente es una redirección HTML (sesión expirada)
        console.error("Respuesta no es JSON:", res.status, res.statusText);
        alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        console.error("Error en servidor:", data);
        alert(
          `Error (${res.status}): ${data.message || "No se pudo registrar el equipo"}`,
        );
        return;
      }

      if (data.ok) {
        alert("Registro exitoso");
        location.reload();
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert(
        "Ocurrió un error al enviar los datos. Verifica la consola para más detalles.",
      );
    }
  });
});


/**
 * ENVIAR DATOS DEL REGISTRO DE INVENTARIO A LA BASE DE DATOS- EXTRA DEPENDIENTE
 * 
 * Este evento permite que al presionar el boton registrar del apartado de registro
 *  de inventario, se carguen los datos a la base de datos 

 */


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
    // console.log("Datos cargados:", formData);
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
}

// ===============================
// 🔹 EVENTO CHANGE CATEGORÍA
// ===============================

function handleCategoryChange() {
  // BLOQUEO SI SE ESTÁ CARGANDO DESDE BOTÓN
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

  // 1 Setear categoría
  document.getElementById("ID_categoria").value = fila.ID_categoria;

  // Cargar dependientes manualmente
  // IMPORTANTE: aquí llamamos directo la función
  handleCategoryChange();

  // Ahora sí seteamos valores específicos
  document.getElementById("ID_marca").value = fila.ID_marca;
  document.getElementById("ID_modelo").value = fila.ID_modelo;
  document.getElementById("ID_objeto").value = fila.ID_item;

  isLoadingFromButton = false; 
}


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

/**
 * ENVIAR DATOS ACTUAILIZADOS DEL REGISTRO DE INVENTARIO A LA BASE DE DATOS
 * 
 * este evento permite enviar los campos actualaizados a la base de datos, los campos corresponde
 * a los articulos registrados en el apartado de registro de inventario

 */


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-actualizar");
  const form = document.getElementById("form-registro");

  if (!btn || !form) {
    console.error("No se encontró el botón o el formulario");
    return;
  }

  btn.addEventListener("click", async () => {
    try {
      const idObjeto = document
        .getElementById("btn-actualizar")
        .getAttribute("ID_objeto_btn_actualizar");

      if (!idObjeto) {
        alert("ID del objeto no encontrado");
        return;
      }

      const formData = new FormData(form);

      const res = await fetch(`/actualizar/equipo/${idObjeto}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }

      const data = await res.json();
      console.log("Respuesta servidor:", data);

      if (data.ok) {
        alert("Equipo actualizado correctamente");
        location.reload();
      }
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  });
});
