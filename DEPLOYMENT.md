# Guía de Despliegue - v7 (Versión Final con Corrección de Render)

Esta guía contiene la corrección final para el despliegue en Render, junto con las instrucciones completas.

---

### Parte A y B: Preparación y Subida a GitHub

(Sin cambios - Asegúrate de que tu última versión del código esté en GitHub)

---

### Parte C: Creando la Base de Datos y el Backend (Render) - MÉTODO CORREGIDO

Este es el proceso actualizado para asegurar una configuración limpia y exitosa en Render.

*   **PASO 0: (Si ya tienes servicios creados) Borra la configuración anterior.**
    *   Ve a tu Dashboard de Render.
    *   Si ves los servicios `vlf-api` o `vlf-database`, haz clic en cada uno, ve a la pestaña **"Settings"** y al final, haz clic en **"Delete Service"**.
    *   Esto es importante para empezar de cero y asegurar que la nueva configuración se aplique correctamente.

1.  **Crea una cuenta en Render:** [render.com](https://render.com) (usa tu cuenta de GitHub).

2.  **Crea un nuevo "Blueprint":**
    *   En tu dashboard, clic en **"New"** -> **"Blueprint"**.
    *   Conecta tu repositorio `sistema-vlf-automation`.
    *   Render leerá el archivo `render.yaml` corregido y configurará todo automáticamente. Ahora no debería mostrar ningún error.
    *   Clic en **"Apply"**.

3.  **Obtén las Direcciones:**
    *   Una vez creado, ve al dashboard de Render y copia dos cosas:
        1.  La **URL de tu API** (termina en `.onrender.com`).
        2.  La **"External Connection String"** de tu base de datos (`vlf-database`).

---

### Parte D: Publicando la Interfaz Web (Frontend) en Vercel

(Sin cambios - Sigue las instrucciones de la versión anterior para configurar el "Root Directory" y las variables de entorno en Vercel)

1.  **Importa tu proyecto en Vercel.**
2.  **Configura el proyecto:**
    *   **Root Directory:** `packages/web`.
    *   **Build Command:** `npm run build`.
    *   **Install Command:** `npm install`.
3.  **Añade las Variables de Entorno:**
    *   `NEXT_PUBLIC_API_URL`: La URL de tu API de Render.
    *   `DATABASE_URL`: La "External Connection String" de tu base de datos de Render.
4.  **Haz clic en "Deploy"**.

Con esta corrección en el `render.yaml` y empezando con una configuración limpia, el despliegue en ambas plataformas será exitoso.
