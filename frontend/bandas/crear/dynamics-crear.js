function create_band(data) {
    if (data.success === true) {
        window.location.href = `/bandas/banda_ind?id=${data.id}`
    } else {
        alert("Error al crear banda")
    }
}

function handle_error(error) {
    console.log("ERROR", error)
}

function crear_banda(event) {
    event.preventDefault()

    const form = new FormData(event.target)

    const nombre = form.get("nombre")
    const genero = form.get("genero")
    const anio_creacion = form.get("anio_creacion")
    const pais_origen = form.get("pais_origen")
    const imagen = form.get("imagen")
    
    function count_bands(banda) {
        const max = banda.max_id

        const id = max + 1

        fetch("http://localhost:5000/bandas/", {
        method: "POST",
        body: JSON.stringify({
            id: id,
            nombre: nombre,
            genero: genero,
            anio_creacion: anio_creacion,
            pais_origen: pais_origen,
            imagen: imagen
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(create_band)
        .catch(handle_error)
    }
    
    fetch("http://localhost:5000/bandas/count")
        .then(response => response.json())
        .then(count_bands)
        .catch(handle_error)
}