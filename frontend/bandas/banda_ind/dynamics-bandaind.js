const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

if (id === null || id === "" || id === undefined || isNaN(id) || id < 0 || id % 1 !== 0) {
    window.location.href = "/bandas";
}

document.getElementById("btn-editar").setAttribute("href", `/bandas/banda_ind/editar?id=${id}`)

function handle_response (response) {
    return response.json()
}

function parse_banda (banda) {

    const name = document.getElementById("title")
    if (banda.nombre === undefined) { // No existe la banda, porque se ingresó un id fuera de rango
        window.location.href = "/bandas";
    }
    name.innerHTML = banda.nombre

    const image = document.getElementById("image")
    image.setAttribute("src", banda.imagen)
    image.setAttribute("alt", banda.nombre)

    const anio_creacion = document.getElementById("anio_creacion")
    anio_creacion.innerHTML = banda.anio_creacion

    const genero = document.getElementById("genero")
    genero.innerHTML = banda.genero

    const pais_origen = document.getElementById("pais_origen")
    pais_origen.innerHTML = banda.pais_origen
}

function handle_error (error) {
    console.log("ERROR", error)
}

fetch(`http://localhost:5000/bandas/${id}`)
    .then(handle_response)
    .then(parse_banda)
    .catch(handle_error)

/* ------------------------------------------- */

function response_delete (response) {
    return response.json()
}

function handle_delete (data) {
    if (data.success === true) {
        window.location.href = "/bandas";
    } else {
        alert("No se pudo eliminar la banda")
    }
}

function eliminar_banda () {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar esta banda?")

    if (!confirmacion) {
        return;
    }

    fetch(`http://localhost:5000/bandas/${id}`, 
    { method: "DELETE" }
    )
        .then(response_delete)
        .then(handle_delete)
        .catch(handle_error)
}

/* ------------------------------------------- */

function parse_albums (albums) {
    console.log("TENGO ALBUMS")
    
    for (let index = 0; index < albums.length; index++) {
        
        container = document.getElementById("container-albums");

        const description = document.getElementById("description");

        const album = document.createElement("div");
        album.setAttribute("class", "album");

        const card = document.createElement("a");
        card.setAttribute("class", "card");
        card.setAttribute("href", `/albums/album_ind?id=${albums[index].id}`);

        const image = document.createElement("img");
        image.setAttribute("class", "album-image");
        image.setAttribute("src", albums[index].imagen);

        const name = document.createElement("h3");
        name.innerHTML = albums[index].nombre;

        card.append(image);
        card.append(name);

        album.append(card);

        container.append(album);
    }
}

fetch(`http://localhost:5000/albums/banda/${id}`)
    .then((res) => res.json())
    .then(parse_albums)
    .catch(handle_error)