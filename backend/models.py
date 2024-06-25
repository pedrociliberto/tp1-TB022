from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Banda(db.Model):
    __tablename__ = 'bandas'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(30), nullable=False)
    anio_creacion = db.Column(db.Integer)
    genero = db.Column(db.String(30))
    pais_origen = db.Column(db.String(30))
    imagen = db.Column(db.String(200))

class Album(db.Model):
    __tablename__ = 'albums'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    anio_publicado = db.Column(db.Integer)
    banda_id = db.Column(db.Integer, db.ForeignKey('bandas.id'), nullable=False)
    imagen = db.Column(db.String(200))
