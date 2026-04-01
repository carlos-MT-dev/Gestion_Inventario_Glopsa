function listarTabla(data, nombreidtbody){
    const tbody = document.getElementById(nombreidtbody);
    tbody.innerHTML = "";

    const fragment = document.createDocumentFragment();

    data.forEach((obj) => {
      const tr = document.createElement("tr");
      tr.classList.add("row-wrapper");

      tr.innerHTML = `
         <td>${obj.Codigo}</td>
        <td>${obj.Area}</td> 
        <td>${obj.Sede}</td>
        <td>${obj.Item ?? "falta  traer"}</td>
        <td>${obj.Categoria ?? "_"}</td>
        <td>${obj.Marca ?? "_"}</td>
        <td>${obj.Modelo ?? "_"}</td>
        <td>${obj.Estado ?? "_"}</td>
        <td>${new Date(obj.fecha_registro).toLocaleString() ?? "_"}</td>
        <td>${obj.Disponibilidad ?? "_"}</td>
        <td>${obj.Condicion ?? "_"}</td>
        <td>${obj.Seccion ?? "_"}</td>
        <td>${new Date(obj.Fecha_compra).toLocaleString() ?? "_"}</td>
        <td>
        
          <button 
            class="btn-edit btn buttons select-btn"
            data-codigo="${obj.Codigo}"
            data-id_objeto="${obj.ID_objeto}"
            data-area="${obj.Area}"
            data-sede="${obj.Sede ?? ""}"
            data-objeto="${obj.Item ?? ""}"
            data-categoria="${obj.Categoria ?? ""}"
            data-marca="${obj.Marca ?? ""}"
            data-modelo="${obj.Modelo ?? ""}"
            data-estado="${obj.Estado ?? ""}"
            data-fecha_registro="${new Date(obj.fecha_registro).toLocaleString() ?? ""}
            data-disponibilidad="${obj.Disponibilidad ?? ""}"
            data-condicion="${obj.Condicion ?? ""}"
            data-seccion="${obj.Seccion ?? ""}"
            data-fecha_compra="${new Date(obj.Fecha_compra).toLocaleString() ?? ""}"
            data-descripcion="${obj.Descripcion ?? ""}"
          >
            Seleccionar
          </button>
        </td>
        <td>
          <button 
            class="btn-mover btn buttons mover-btn"
            data-codigo="${obj.Codigo}"
            data-id_objeto="${obj.ID_objeto}"
            data-area="${obj.Area}"
            data-sede="${obj.Sede ?? ""}"
            data-objeto="${obj.Item ?? ""}"
            data-categoria="${obj.Categoria ?? ""}"
            data-marca="${obj.Marca ?? ""}"
            data-modelo="${obj.Modelo ?? ""}"
            data-estado="${obj.Estado ?? ""}"
            data-fecha_registro="${new Date(obj.fecha_registro).toLocaleString() ?? ""}
            data-disponibilidad="${obj.Disponibilidad ?? ""}"
            data-condicion="${obj.Condicion ?? ""}"
            data-seccion="${obj.Seccion ?? ""}"
            data-fecha_compra="${new Date(obj.Fecha_compra).toLocaleString() ?? ""}"
            data-descripcion="${obj.Descripcion ?? ""}"
          >
           Mover
          </button>
        </td>
      `;

      fragment.appendChild(tr);
    });
    tbody.appendChild(fragment);

    
}
  
export default listarTabla;