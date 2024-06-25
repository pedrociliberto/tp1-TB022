const parametros = new URLSearchParams(window.location.search);
const sort = parametros.get('sort');

const select = document.getElementById("sort");
select.value = sort;

function parse_albums (albums) {
    console.log("TENGO ALBUMS")
    
    for (let index = 0; index < albums.length; index++) {
        
        container = document.getElementById("container-albums");

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

        const band_name = document.createElement("h4");

        fetch(`http://localhost:5000/bandas/${albums[index].banda_id}/nombre`)
            .then((response) => response.json())
            .then((band) => {
                band_name.innerHTML = band.nombre;
            })
            .catch(handle_error);

        card.append(image);
        card.append(name);
        card.append(band_name);

        album.append(card);

        container.append(album);
    }
}

function handle_error (error) {
    console.error("ERROR", error)
}

fetch(`http://localhost:5000/albums?sort=${sort}`)
    .then((response) => response.json())
    .then(parse_albums)
    .catch(handle_error)