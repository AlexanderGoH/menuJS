const request = new XMLHttpRequest();

request.open("GET", "/menu.json");
request.responseType = "json";
request.send();

request.onload = function () {
  const menu = request.response;
  showMenu(menu);
};

const main = document.querySelector("main");

function showMenu(jsonObj) {
  const menu = jsonObj["menu"];
  console.log(menu);

  for (let i = 0; i < menu.length; i++) { // Categoria y array de comidas
    const comidas = menu[i].comidas;
    const section = document.createElement("section");
    const h2Categoria = document.createElement("h2");
    console.log(comidas);
    
    h2Categoria.textContent = menu[i].categoria;
    h2Categoria.id = menu[i].categoria;
    
    section.appendChild(h2Categoria);

    comidas.forEach( comida => { // Cada comida
      const card = document.createElement("div");

      card.innerHTML = `
        <img src="${comida.img}" class="card-img-top">
        <button class="btn more">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
          </svg>
        </button>
        <div class="card-body">
          <h4 class="card-title">${comida.nombre}</h4>
          <p>${comida.descripcion}</p>
          <h5 class="d-flex justify-content-end">${comida.precio}</h5>
        </div>
      `;

      card.querySelector(".more").addEventListener("click", () => {
        const modal = document.getElementById("modal");
        const modal_content = document.getElementById("modal-content");
        modal_content.innerHTML = `
          <img id="modal-imagen" class="modal-imagen" src="${comida.img}" alt="comida" />
          <div class="modal-body py-0">
            <h4 class="modal-titulo" >${comida.nombre}</h4>
            <p id="modal-descripcion" class="modal-descripcion ">${comida.descripcion}</p>
            <p id="modal-precio" class="modal-precio">${comida.precio}</p>
          </div>
        `;
        modal.style.display = "block";
      });

      section.classList.add("row", "justify-content-around", "my-5");
      card.classList.add("card");
      section.appendChild(card);
    });
    main.appendChild(section);
  }
}

const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];

span.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};