# Guía de Despliegue

Este documento proporciona las instrucciones para desplegar el backend y el frontend en plataformas de nube gratuitas.

## Backend (API) en Render

El backend está configurado para desplegarse automáticamente en Render usando el archivo `render.yaml` que se encuentra en la raíz del proyecto. **¡El proceso de preparación de la base de datos ahora es automático!**

### Pasos:

1.  **Crea una cuenta** en [Render](https://render.com/).
2.  **Crea un "New Blueprint"**: En tu dashboard, haz clic en "New" y luego en "Blueprint".
3.  **Conecta tu repositorio**: Selecciona el repositorio de GitHub donde se encuentra este proyecto. Render detectará y usará automáticamente el archivo `render.yaml`.
4.  **Acepta y despliega**: Render configurará la base de datos PostgreSQL y el servicio de la API. El primer despliegue tomará unos minutos mientras se instala todo y se prepara la base de datos.

¡Eso es todo! El backend se desplegará y la base de datos se migrará automáticamente en el proceso de inicio.

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
