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
              selc.
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
          mov.
          </button>
           <td>
          <button 
            class="btn-codigo btn buttons codigo-btn btn-codigo-item-class"
            id = "btn-codigo-item"
            data-codigo="${obj.Codigo}"
            data-id_objeto="${obj.ID_objeto}"
          >
           
 codigo
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
