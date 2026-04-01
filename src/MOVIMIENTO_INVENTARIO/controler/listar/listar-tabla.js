
export function listarTabla(data) {
     
  const tbody = document.getElementById("tbody-objetos");
  tbody.innerHTML = "";

  const fragment = document.createDocumentFragment();

  data.forEach((obj) => {
    const row = document.createElement("tr");
    row.classList.add("row-wrapper");

    row.innerHTML = `
        <td>${obj.ID_prestamo}</td>
        <td>${obj.ID_objeto}</td> 
        <td>${obj.movimiento}</td>
        <td>${obj.sedeOrigen ?? "_"}</td>
        <td>${obj.areaOrg ?? "_"}</td>
        <td>${obj.sedeDestino ?? "_"}</td>
        <td>${obj.areaDes ?? "_"}</td>
        <td>${obj.userEmisor ?? "_"}</td>
        <td>${obj.userReceptor ?? "_"}</td>
        <td>${obj.duracion ?? "_"}</td>
        <td>${obj.estado ?? "_"}</td>
       <td>${new Date(obj.Fecha_prestamo).toISOString().split("T")[0] ?? ""}</td>
        <td>${new Date(obj.Fecha_retorno).toISOString().split("T")[0] ?? ""}</td>
        <td>${obj.Descripcion ?? "_"}</td>
        <td>
          <button 
            class="btn-edit btn buttons select-btn"
            data-ID_prestamo="${obj.ID_prestamo}"
            data-ID_objeto="${obj.ID_objeto}"
            data-Movimiento="${obj.movimiento}"
            data-Sede_origen="${obj.sedeOrigen ?? ""}"
            data-Area_origen="${obj.areaOrg ?? ""}"
            data-Sede_destino="${obj.sedeDestino ?? ""}"
            data-Area_destino="${obj.areaDes ?? ""}"
            data-Usuario_origen="${obj.userEmisor ?? ""}"
            data-Usuario_destino="${obj.userReceptor}"
            data-Duracion="${obj.duracion ?? ""}"
            data-Estado="${obj.estado ?? ""}"
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
}

