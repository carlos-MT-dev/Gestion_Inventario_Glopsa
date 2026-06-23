document.addEventListener("DOMContentLoaded", ()=>{
    cargarTabla();
});

async function cargarTabla() {
  try {
    const res = await fetch("/api/data/prestamo");
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
        <td>${obj.ID_prestamo}</td>
        <td>${obj.ID_objeto}</td> 
        <td>${obj.Movimiento}</td>
        <td>${obj.Sede_origen ?? "_"}</td>
        <td>${obj.Area_origen ?? "_"}</td>
        <td>${obj.Sede_destino ?? "_"}</td>
        <td>${obj.Area_destino ?? "_"}</td>
        <td>${obj.Usuario_origen ?? "_"}</td>
        <td>${obj.Usuario_destino ?? "_"}</td>
        <td>${obj.Duracion ?? "_"}</td>
        <td>${obj.Estado ?? "_"}</td>
        <td>${new Date(obj.Fecha_prestamo).toISOString().split("T")[0] ?? ""}</td>
        <td>${new Date(obj.Fecha_retorno).toISOString().split("T")[0] ?? ""}</td>
      
        <td>
          <button 
            class="btn-edit btn buttons select-btn"
            data-ID_prestamo="${obj.ID_prestamo}"
            data-ID_objeto="${obj.ID_objeto}"
            data-Movimiento="${obj.Movimiento}"
            data-Sede_origen="${obj.Sede_origen ?? ""}"
            data-Area_origen="${obj.Area_origen ?? ""}"
            data-Sede_destino="${obj.Sede_destino ?? ""}"
            data-Area_destino="${obj.Area_destino ?? ""}"
            data-Usuario_origen="${obj.Usuario_origen ?? ""}"
            data-Usuario_destino="${obj.Usuario_destino}"
            data-Duracion="${obj.Duracion ?? ""}"
            data-Estado="${obj.Estado ?? ""}"
            data-Fecha_prestamo="${new Date(obj.Fecha_prestamo).toISOString().split("T")[0] ?? ""}"
            data-Fecha_retorno="${new Date(obj.Fecha_retorno).toISOString().split("T")[0] ?? ""}"
            data-Descripcion="${obj.Descripcion ?? ""}"
          >
            Seleccionar
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
