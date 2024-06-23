const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id === null || id === "" || id === undefined || isNaN(id) || id < 0 || id % 1 !== 0) {
    window.location.href = "/";
}

function parse_data(data) {
    document.getElementById("nombre").value = data.nombre
    document.getElementById("anio_publicado").value = data.anio_publicado
    document.getElementById("banda_nombre").value = data.banda_nombre
    document.getElementById("imagen").value = data.imagen
}

function handle_error(error) {
    console.log("ERROR", error)
}

fetch(`http://localhost:5000/albums/${id}`)
    .then((response) => response.json())
    .then(parse_data)
    .catch(handle_error)


function update_data(data) {
    if (data.success === true) {
        window.location.href = `/albums/album_ind?id=${id}`
    } else {
        alert(data.message)
    }
}

function editar_album(event) {
    event.preventDefault()

    const form = new FormData(event.target)

    const nombre = form.get("nombre")
    const anio_publicado = form.get("anio_publicado")
    const banda_nombre = form.get("banda_nombre")
    const imagen = form.get("imagen")

    fetch(`http://localhost:5000/albums/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            nombre: nombre,
            anio_publicado: anio_publicado,
            banda_nombre: banda_nombre,
            imagen: imagen
        })
    })
        .then((response) => response.json())
        .then(update_data)
        .catch(handle_error)
}