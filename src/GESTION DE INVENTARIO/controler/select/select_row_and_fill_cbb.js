document.addEventListener("click", (e) => {
  if (e.target.classList.contains("select-btn")) {
    cargarFormulario(e.target);
  }
});

function cargarFormulario(btn) {
  try {
    console.log("Dataset completo:", btn.dataset);

    // Código
    document.getElementById("Codigo").value = btn.dataset.codigo + "-" + btn.dataset.id_objeto;

    // Área
    if (document.getElementById("ID_area")) {
      const areaValue = btn.dataset.area;
      console.log("Asignando área:", areaValue);
      document.getElementById("ID_area").value = areaValue;
      console.log("Valor actual del select área:", document.getElementById("ID_area").value);
    }

    // Sede
    if (document.getElementById("ID_sede")) {
      const sedeValue = btn.dataset.sede;
      console.log("Asignando sede:", sedeValue);
      document.getElementById("ID_sede").value = sedeValue;
    }

    // Objeto
    if (document.getElementById("ID_objeto")) {
      const objetoValue = btn.dataset.objeto;
      console.log("Asignando objeto:", objetoValue);
      document.getElementById("ID_objeto").value = objetoValue;
    }

    // Categoría
    if (document.getElementById("ID_categoria")) {
      const categoriaValue = btn.dataset.categoria;
      console.log("Asignando categoría:", categoriaValue);
      document.getElementById("ID_categoria").value = categoriaValue;
    }

    // Marca
    if (document.getElementById("ID_marca")) {
      const marcaValue = btn.dataset.marca;
      console.log("Asignando marca:", marcaValue);
      document.getElementById("ID_marca").value = marcaValue;
    }

    // Modelo
    if (document.getElementById("ID_modelo")) {
      const modeloValue = btn.dataset.modelo;
      console.log("Asignando modelo:", modeloValue);
      document.getElementById("ID_modelo").value = modeloValue;
    }

    // Estado
    if (document.getElementById("ID_Estado")) {
      const estadoValue = btn.dataset.estado;
      console.log("Asignando estado:", estadoValue);
      document.getElementById("ID_Estado").value = estadoValue;
    }

    // Descripción
    if (document.getElementById("Descripcion")) {
      document.getElementById("Descripcion").value = btn.dataset.descripcion;
    }

    // Disponibilidad
    if (document.getElementById("ID_Disponibilidad")) {
      const disponibilidadValue = btn.dataset.disponibilidad;
      console.log("Asignando disponibilidad:", disponibilidadValue);
      document.getElementById("ID_Disponibilidad").value = disponibilidadValue;
    }

    // Condición
    if (document.getElementById("ID_Condicion")) {
      const condicionValue = btn.dataset.condicion;
      console.log("Asignando condición:", condicionValue);
      document.getElementById("ID_Condicion").value = condicionValue;
    }

    // Sección
    if (document.getElementById("ID_seccion")) {
      const seccionValue = btn.dataset.seccion;
      console.log("Asignando sección:", seccionValue);
      document.getElementById("ID_seccion").value = seccionValue;
    }

    // Fecha de compra
    if (document.getElementById("Fecha_Compra")) {
      document.getElementById("Fecha_Compra").value = btn.dataset.fecha_compra;
    }

    // Unidad de medida
    if (document.getElementById("ID_medida")) {
      const medidaValue = btn.dataset.unidad_medida;
      console.log("Asignando medida:", medidaValue);
      document.getElementById("ID_medida").value = medidaValue;
    }

    // Unidades/Stock
    if (document.getElementById("Unidad_txt")) {
      document.getElementById("Unidad_txt").value = btn.dataset.stock;
    }

    // Atributos para botones de actualizar
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
