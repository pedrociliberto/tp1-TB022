from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Banda, Album

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://pedrociliberto:111918@localhost:5432/musica'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

port = 5000

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

@app.route("/bandas/<id_banda>", methods = ['DELETE'])
def eliminar_banda(id_banda):
    try:
        Banda.query.filter_by(id = id_banda).delete()
        db.session.commit()
        return jsonify({'success': True})
    except:
        return jsonify({'success': False}), 500

if __name__ == '__main__':
    print('Iniciando servidor en http://localhost:5000')
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)
    print('Servidor finalizado')