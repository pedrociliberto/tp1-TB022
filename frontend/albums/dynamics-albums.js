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

        card.append(image);
        card.append(name);

        album.append(card);

        container.append(album);
    }
}

function handle_error (error) {
    console.error("ERROR", error)
}

fetch("http://localhost:5000/albums/")
    .then((response) => response.json())
    .then(parse_albums)
    .catch(handle_error)