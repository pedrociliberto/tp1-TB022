function finish_process(data) {
    if (data.success === true) {
        window.location.href = `/paraiso-musical/albums/album_ind?id=${data.id}`
    } else {
        alert("Error al crear album.")
    }
}

function handle_error(error) {
    console.log("ERROR", error)
}

function crear_album(event) {
    event.preventDefault()

    const form = new FormData(event.target)

    const nombre = form.get("nombre")
    const anio_publicado = form.get("anio_publicado")
    const banda_nombre = form.get("banda_nombre")
    const imagen = form.get("imagen")
    
    function count_albums(data) {
        const max = data.max_id

        const id = max + 1

        fetch("http://localhost:5000/albums/", {
        method: "POST",
        body: JSON.stringify({
            id: id,
            nombre: nombre,
            anio_publicado: anio_publicado,
            banda_nombre: banda_nombre,
            imagen: imagen
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(finish_process)
        .catch(handle_error)
    }
    
    fetch("http://localhost:5000/albums/max-id")
        .then(response => response.json())
        .then(count_albums)
        .catch(handle_error)
}