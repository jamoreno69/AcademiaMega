# Task Manager

## Descripción
Un proyecto de administrador de tareas utilizando Node.js, Express, SQLite, Jest, HTML, CSS y JavaScript.

## Instalación
1. Clona el repositorio:
    ```sh
    git clone <URL_DEL_REPOSITORIO>
    cd task-manager
    ```

2. Instala las dependencias:
    ```sh
    npm init -y
    npm install express sqlite3
    npm install --save-dev jest
    ```

3. Ejecuta el servidor:
    ```sh
    npm start
    ```

4. Abre `http://localhost:3000` en tu navegador.

## Testing
Para ejecutar las pruebas, usa el siguiente comando:
```sh
npm test
```

## Estructura del Proyecto
```
task-manager/
    database/
    docs/
    public/
        css/
            styles.css
        js/
            scripts.js
        index.html
    src/
        database.js
        taskManager.js
        server.js
    test/
        taskManager.test.js
    package.json
    readme.md
```

## Endpoints
- `GET /tasks` - Obtener todas las tareas
- `POST /tasks` - Agregar una nueva tarea
- `PUT /tasks/:id` - Editar una tarea existente
- `DELETE /tasks/:id` - Eliminar una tarea

## Requerimientos
- Node.js
- SQLite
- Jest