# Guía de Despliegue

Este documento proporciona las instrucciones para desplegar el backend y el frontend en plataformas de nube gratuitas.

## Backend (API) en Render

El backend está configurado para desplegarse automáticamente en Render usando el archivo `render.yaml` que se encuentra en la raíz del proyecto.

### Pasos:

1.  **Crea una cuenta** en [Render](https://render.com/).
2.  **Crea un "New Blueprint"**: En tu dashboard, haz clic en "New" y luego en "Blueprint".
3.  **Conecta tu repositorio**: Selecciona el repositorio de GitHub donde se encuentra este proyecto. Render detectará y usará automáticamente el archivo `render.yaml`.
4.  **Acepta y despliega**: Render configurará la base de datos PostgreSQL y el servicio de la API.

### ⚠️ ACCIÓN MANUAL REQUERIDA (Solo una vez) ⚠️

Debido a las limitaciones del plan gratuito de Render, el comando para preparar la base de datos (`migrate deploy`) no se puede ejecutar automáticamente. Debes hacerlo manualmente después de que el primer despliegue haya sido exitoso.

**¿Cómo ejecutar la migración manual?**

1.  Una vez que el servicio `vlf-api` esté desplegado en Render, ve a la pestaña **"Shell"** de ese servicio.
2.  La terminal se conectará a tu contenedor. Una vez que veas el prompt, escribe el siguiente comando y presiona Enter:

    ```bash
    npm run prisma --workspace=api -- migrate deploy
    ```

3.  El comando preparará la base de datos. Una vez que termine, la API funcionará correctamente. Solo necesitas hacer esto **la primera vez** o cada vez que haya cambios en la estructura de la base de datos.

## Frontend (Web) en Vercel

El frontend está optimizado para Vercel.

### Pasos:

1.  **Crea una cuenta** en [Vercel](https://vercel.com/).
2.  **Crea un "New Project"**: En tu dashboard, haz clic en "Add New..." y luego en "Project".
3.  **Importa tu repositorio**: Selecciona el repositorio de GitHub.
4.  **Configura el proyecto**:
    *   **Root Directory**: ¡MUY IMPORTANTE! Debes cambiar el directorio raíz a `packages/web`. Vercel lo detectará como una aplicación Next.js.
    *   **Environment Variables**: Añade una variable de entorno llamada `NEXT_PUBLIC_API_URL` y asígnale la URL de tu backend desplegado en Render (la encontrarás en el dashboard de tu servicio de Render, por ejemplo: `https://vlf-api.onrender.com`).
5.  **Despliega**: Haz clic en "Deploy". Vercel se encargará del resto.

¡Y listo! Con estos pasos, tendrás tu aplicación completa funcionando en la nube.
