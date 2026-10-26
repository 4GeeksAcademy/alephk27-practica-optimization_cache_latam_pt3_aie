# Estante — Gestión de inventario

Aplicación minimalista para administrar un inventario de libros. Frontend en React, TypeScript, Tailwind CSS y React Router; backend en FastAPI y Pydantic. Los datos están en `backend/books.json`, que también se actualiza al crear libros desde el formulario.

## Modelo de libro

- `id`: identificador numérico generado automáticamente.
- `title`, `author`, `genre`: obligatorios.
- `year`: año de publicación opcional.
- `stock_id`: identificador único de inventario.
- `stock`: cantidad entera no negativa.

## API

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/books` | Lista todos los libros. |
| GET | `/book/{id}` | Obtiene el detalle de un libro. |
| GET | `/book/stock/{stock_id}` | Busca la cantidad disponible por ID de stock. |
| POST | `/book` | Crea un libro y actualiza el archivo JSON. |

La ruta de stock usa `/book/stock/{stock_id}` para no colisionar con `/book/{id}`. La documentación interactiva está en `http://localhost:8000/docs`.

## Ejecutar localmente

Necesitas Python 3.10 o posterior y Node.js 20.19+ o 22.12+.

Terminal 1, backend:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
```

Terminal 2, frontend:

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. En desarrollo, Vite reenvía las llamadas `/api` al backend en `http://localhost:8000`, evitando problemas de conexión desde entornos remotos. Si el frontend y la API se despliegan por separado, define `VITE_API_URL` con la URL pública del backend.

You can find other templates and resources like this at the [school's GitHub page](https://github.com/4geeksacademy/).
