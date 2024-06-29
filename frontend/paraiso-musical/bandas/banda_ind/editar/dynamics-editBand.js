const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

if (id === null || id === "" || id === undefined || isNaN(id) || id < 0 || id % 1 !== 0) {
    window.location.href = "../";
}

document.getElementById("back").setAttribute("href", `/paraiso-musical/bandas/banda_ind/?id=${id}`)

function parse_data(data) {
    document.getElementById("nombre").value = data.nombre
    document.getElementById("genero").value = data.genero
    document.getElementById("anio_creacion").value = data.anio_creacion
    document.getElementById("pais_origen").value = data.pais_origen
    document.getElementById("imagen").value = data.imagen
}

function handle_error(error) {
    console.log("ERROR", error)
}

fetch(`http://localhost:5000/bandas/${id}`)
    .then((response) => response.json())
    .then(parse_data)
    .catch(handle_error)


function update_data(data) {
    if (data.success === true) {
        window.location.href = `/paraiso-musical/bandas/banda_ind?id=${id}`
    } else {
        alert("No se pudo editar la banda")
    }
}

function editar_banda(event) {
    event.preventDefault()

    const form = new FormData(event.target)

    const nombre = form.get("nombre")
    const genero = form.get("genero")
    const anio_creacion = form.get("anio_creacion")
    const pais_origen = form.get("pais_origen")
    const imagen = form.get("imagen")

    fetch(`http://localhost:5000/bandas/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            nombre: nombre,
            genero: genero,
            anio_creacion: anio_creacion,
            pais_origen: pais_origen,
            imagen: imagen
        })
    })
        .then((response) => response.json())
        .then(update_data)
        .catch(handle_error)
        
    
}