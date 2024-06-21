const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

if (id === null || id === "" || id === undefined || isNaN(id) || id < 0 || id % 1 !== 0) {
    window.location.href = "/bandas";
}

document.getElementById("btn-editar").setAttribute("href", `/albums/album_ind/editar?id=${id}`)

function handle_response (response) {
    return response.json()
}

function parse_album (album) {

    const name = document.getElementById("title")
    if (album.nombre === undefined) { // No existe el álbum, porque se ingresó un id fuera de rango
        window.location.href = "/albums";
    }
    name.innerHTML = album.nombre

    const banda = document.getElementById("banda_pert")
    banda.innerHTML = album.banda_nombre

    const image = document.getElementById("image")
    image.setAttribute("src", album.imagen)
    image.setAttribute("alt", album.nombre)

    const anio_publicado = document.getElementById("anio_publicado")
    anio_publicado.innerHTML = album.anio_publicado
}

function handle_error (error) {
    console.log("ERROR", error)
}

fetch(`http://localhost:5000/albums/${id}`)
    .then(handle_response)
    .then(parse_album)
    .catch(handle_error)

/* ------------------------------------------- */

function response_delete(response) {
    return response.json()
}

function handle_delete (data) {
    if (data.success === true) {
        window.location.href = "/bandas";
    } else {
        alert("No se pudo eliminar la banda")
    }
}

function eliminar_album () {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar este album?")

    if (!confirmacion) {
        return;
    }

    fetch(`http://localhost:5000/albums/${id}`, 
    { method: "DELETE" }
    )
        .then(response_delete)
        .then(handle_delete)
        .catch(handle_error)
}