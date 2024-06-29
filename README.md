# TP Final (TB022) 2024 - Paraíso Musical

*Trabajo práctico final* de la materia "Introduccion al Desarollo de Software" (TB022), cátedra Camejo, cursada en el 1er cuatrimestre de 2024.

## Dentro del proyecto

### Objetivo principal

En la página se podrá acceder a un catálogo de bandas famosas, como así de un gran repertorio de álbumes, pertenecientes a tales bandas.

### Utilidades específicas

- Acceder a todas las bandas cargadas
- Acceder a todos los álbumes cargados
- Crear nuevas/os bandas/álbumes
- Actualizar la información de bandas/álbumes ya creadas/os
- Eliminar bandas/álbumes 
- Acceder a los detalles de cada banda individual, al igual que a sus álbumes de manera aislada
- Acceder a los detalles de cada álbum individual
- Ordenar la vista de bandas/álbumes según determinada característica

## Configurar el proyecto localmente (desde el comienzo)

1. Clonar el repositorio localmente:

```bash
git clone git@github.com:pedrociliberto/tp1-TB022.git
```

2. Crear y activar un entorno virtual dentro del repositorio:

```bash
python3 -m venv venv
source venv/bin/activate
```

3. Dentro del entorno virtual `venv`, instalar las dependencias requeridas por el proyecto:

```bash
pip install -r requirements.txt
```

**Nota**: para desactivar el entorno virtual, use el comando `deactivate`.

## Abrir los servidores correspondientes

### Frontend

```bash
source venv/bin/activate
cd frontend/
python3 -m http.server
```

### Backend

```bash
source venv/bin/activate
cd backend/
python3 app.py
```