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