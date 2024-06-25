const parametros = new URLSearchParams(window.location.search);
const sort = parametros.get('sort');

const select = document.getElementById("sort");
select.value = sort;

function handle_response (response) {
    return response.json()
}

function parse_bandas (bandas) {
    console.log("TENGO BANDAS")
    
    for (let index = 0; index < bandas.length; index++) {
        
        container = document.getElementById("container");

        const banda = document.createElement("div");
        banda.setAttribute("class", "banda");

        const card = document.createElement("a");
        card.setAttribute("class", "card");
        card.setAttribute("href", `/bandas/banda_ind?id=${bandas[index].id}`);

        const image = document.createElement("img");
        image.setAttribute("class", "band-image");
        image.setAttribute("src", bandas[index].imagen);

        const name = document.createElement("h3");
        name.innerHTML = bandas[index].nombre;

        card.append(image);
        card.append(name);

        banda.append(card);

        container.append(banda);
    }
}

function handle_error (error) {
    console.log("ERROR", error)
}

fetch(`http://localhost:5000/bandas/?sort=${sort}`)
    .then(handle_response)
    .then(parse_bandas)
    .catch(handle_error)

