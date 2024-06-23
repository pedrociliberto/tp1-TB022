from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Banda, Album

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://pedrociliberto:111918@localhost:5432/musica'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

port = 5000

# Ruta para obtener todas las bandas

@app.route("/bandas/", methods = ['GET'])
def obtener_bandas():

    try:
        bandas = Banda.query.all()

        tabla_bandas = []

        for banda in bandas:
            id = banda.id
            nombre = banda.nombre
            anio_creacion = banda.anio_creacion
            genero = banda.genero
            pais_origen = banda.pais_origen
            imagen = banda.imagen
            
            tabla_bandas.append({
                'id': id,
                'nombre': nombre,
                'anio_creacion': anio_creacion,
                'genero': genero,
                'pais_origen': pais_origen,
                'imagen': imagen
            })

        return jsonify(tabla_bandas)
    except:
        return jsonify({'message': 'Error al obtener las bandas'}), 500
    
# Ruta para obtener el maximo id de las bandas

@app.route("/bandas/count", methods = ['GET'])
def obtener_cantidad_bandas():
    try:
        maximo_id = db.session.query(db.func.max(Banda.id)).scalar()
        return jsonify({'max_id': maximo_id})
    except:
        return jsonify({'message': 'Error al obtener la cantidad de bandas'}), 500
    
# Ruta para crear una nueva banda
    
@app.route("/bandas/", methods = ['POST'])
def crear_banda():
    id = request.json['id']
    nombre = request.json['nombre']
    genero = request.json['genero']
    anio_creacion = request.json['anio_creacion']
    pais_origen = request.json['pais_origen']
    imagen = request.json['imagen']

    nueva_banda = Banda(
        id = id,
        nombre = nombre,
        genero = genero,
        anio_creacion = anio_creacion,
        pais_origen = pais_origen,
        imagen = imagen
    )

    try:
        db.session.add(nueva_banda)
        db.session.commit()
        return jsonify({'success': True, 'id': id})
    except:
        return jsonify({'success': False}), 500
    
# Ruta para actualizar una banda
    
@app.route("/bandas/", methods = ['PUT'])
def actualizar_banda():
    id = request.json['id']
    nombre = request.json['nombre']
    genero = request.json['genero']
    anio_creacion = request.json['anio_creacion']
    pais_origen = request.json['pais_origen']
    imagen = request.json['imagen']

    banda_actualizada = {
        'id': id,
        'nombre': nombre,
        'genero': genero,
        'anio_creacion': anio_creacion,
        'pais_origen': pais_origen,
        'imagen': imagen
    }

    try:
        Banda.query.filter_by(id = id).update(banda_actualizada)
        db.session.commit()
        return jsonify({'success': True})
    except:
        return jsonify({'success': False}), 500
    
# Ruta para obtener una banda por su id

@app.route("/bandas/<id_banda>", methods = ['GET'])
def obtener_banda(id_banda):
    try:
        banda = Banda.query.where(Banda.id == id_banda).first()

        banda_data = {
            'id': banda.id,
            'nombre': banda.nombre,
            'anio_creacion': banda.anio_creacion,
            'genero': banda.genero,
            'pais_origen': banda.pais_origen,
            'imagen': banda.imagen
        }
        return banda_data
    except:
        return jsonify({'message': 'Error al obtener la banda'}), 500
    
# Ruta para eliminar una banda

@app.route("/bandas/<id_banda>", methods = ['DELETE'])
def eliminar_banda(id_banda):
    try:
        Album.query.filter_by(banda_id = id_banda).delete()
        Banda.query.filter_by(id = id_banda).delete()

        db.session.commit()
        return jsonify({'success': True})
    except:
        return jsonify({'success': False}), 500
    
# Ruta para obtener el nombre de una banda por su id

@app.route("/bandas/<id_banda>", methods = ['GET'])
def obtener_nombre_banda(id_banda):
    try:
        banda = Banda.query.where(Banda.id == id_banda).first()
        return jsonify({'nombre': banda.nombre})
    except:
        return None

# Ruta para obtener todos los albums

@app.route("/albums/", methods = ['GET'])
def obtener_albums():
    try:
        albums = Album.query.all()

        tabla_albums = []

        for album in albums:
            id = album.id
            nombre = album.nombre
            anio_publicado = album.anio_publicado
            banda_id = album.banda_id
            imagen = album.imagen
            
            tabla_albums.append({
                'id': id,
                'nombre': nombre,
                'anio_publicado': anio_publicado,
                'banda_id': banda_id,
                'imagen': imagen
            })

        return jsonify(tabla_albums)
    except:
        return jsonify({'message': 'Error al obtener los albums'}), 500
    
# Ruta para obtener el maximo id de los albums

@app.route("/albums/count", methods = ['GET'])
def obtener_cantidad_albums():
    try:
        maximo_id = db.session.query(db.func.max(Album.id)).scalar()
        return jsonify({'max_id': maximo_id})
    except:
        return jsonify({'message': 'Error al obtener la cantidad de albums'}), 500
    

# Ruta para obtener un album por su id

@app.route("/albums/<id_album>", methods = ['GET'])
def obtener_album(id_album):
    try:
        album = Album.query.where(Album.id == id_album).first()

        banda = Banda.query.where(Banda.id == album.banda_id).first()

        album_data = {
            'id': album.id,
            'nombre': album.nombre,
            'anio_publicado': album.anio_publicado,
            'banda_id': album.banda_id,
            'banda_nombre': banda.nombre, # Se agrega el nombre de la banda
            'imagen': album.imagen
        }
        return jsonify(album_data)
    except:
        return jsonify({'message': 'Error al obtener el album'}), 500

# Ruta para crear un nuevo album

@app.route("/albums/", methods = ['POST'])
def crear_album():
    id = request.json['id']
    nombre = request.json['nombre']
    anio_publicado = request.json['anio_publicado']
    banda_nombre = request.json['banda_nombre']
    imagen = request.json['imagen']

    banda = Banda.query.where(Banda.nombre == banda_nombre).first()

    if not banda:
        return jsonify({'success': False, 'message': 'La banda no existe'}), 400

    nuevo_album = Album(
        id = id,
        nombre = nombre,
        anio_publicado = anio_publicado,
        banda_id = banda.id,
        imagen = imagen
    )

    try:
        db.session.add(nuevo_album)
        db.session.commit()
        return jsonify({'success': True, 'id': id})
    except:
        return jsonify({'success': False}), 500

# Ruta para eliminar un album

@app.route("/albums/<id_album>", methods = ['DELETE'])
def eliminar_album(id_album):
    try:
        Album.query.filter_by(id = id_album).delete()
        db.session.commit()

        return jsonify({'success': True})
    except:
        return jsonify({'success': False}), 500
    
# Ruta para actualizar un album

@app.route("/albums/", methods = ['PUT'])
def actualizar_album():
    id = request.json['id']
    nombre = request.json['nombre']
    anio_publicado = request.json['anio_publicado']
    banda_nombre = request.json['banda_nombre']
    imagen = request.json['imagen']

    banda = Banda.query.where(Banda.nombre == banda_nombre).first()

    if not banda:
        return jsonify({'success': False, 'message': 'La banda no existe: no es posible computar un álbum dentro de ella.'}), 400

    album_actualizado = {
        'id': id,
        'nombre': nombre,
        'anio_publicado': anio_publicado,
        'banda_id': banda.id,
        'imagen': imagen
    }

    try:
        Album.query.filter_by(id = id).update(album_actualizado)
        db.session.commit()
        return jsonify({'success': True})
    except:
        return jsonify({'success': False}), 500

# Ruta para obtener los albumes de una banda

@app.route("/albums/banda/<id_banda>", methods = ['GET'])
def obtener_albums_banda(id_banda):
    try:
        albums = Album.query.where(Album.banda_id == id_banda).all()

        tabla_albums = []

        for album in albums:
            id = album.id
            nombre = album.nombre
            anio_publicado = album.anio_publicado
            banda_id = album.banda_id
            imagen = album.imagen
            
            tabla_albums.append({
                'id': id,
                'nombre': nombre,
                'anio_publicado': anio_publicado,
                'banda_id': banda_id,
                'imagen': imagen
            })

        return jsonify(tabla_albums)
    except:
        return jsonify({'message': 'Error al obtener los albums de la banda'}), 500

if __name__ == '__main__':
    print('Iniciando servidor en http://localhost:5000')
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)
    print('Servidor finalizado')