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
        <div class="card-body">
          <h4 class="card-title">${comida.nombre}</h4>
          <p>${comida.descripcion}</p>
          <h5 class="d-flex justify-content-end">${comida.precio}</h5>
        </div>
      `;

      section.classList.add("row", "justify-content-around", "my-5");
      card.classList.add("card");
      section.appendChild(card);
    });
    main.appendChild(section);
  }
}