# Guía de Despliegue - v6 (Versión Segura y Final)

Esta guía contiene las instrucciones finales y seguras para el despliegue. He añadido una mejora de seguridad automática.

---

### Parte A y B: Preparación y Subida a GitHub

(Sin cambios - Asegúrate de que tu última versión del código esté en GitHub)

---

### Parte C: Creando la Base de Datos y el Backend (Render)

1.  **Crea una cuenta en Render:** [render.com](https://render.com) (usa tu cuenta de GitHub).

2.  **Crea un "Blueprint":**
    *   En tu dashboard, clic en **"New"** -> **"Blueprint"**.
    *   Conecta tu repositorio `sistema-vlf-automation`.
    *   Render leerá el archivo `render.yaml` y configurará todo automáticamente.
    *   **Nota de Seguridad:** Verás que Render planea crear una variable llamada `JWT_SECRET`. Este es un "secreto" de seguridad para la autenticación de usuarios. Lo hemos configurado para que Render genere un valor seguro y aleatorio por ti. ¡No necesitas hacer nada!
    *   Clic en **"Apply"**.

3.  **Obtén las Direcciones:**
    *   Una vez creado, ve al dashboard de Render y copia dos cosas:
        1.  La **URL de tu API** (termina en `.onrender.com`).
        2.  La **"External Connection String"** de tu base de datos (`vlf-database`).

---

### Parte D: Publicando la Interfaz Web (Frontend) en Vercel

1.  **Crea una cuenta en Vercel:** [vercel.com](https://vercel.com) (usa tu cuenta de GitHub).

2.  **Importa tu proyecto:**
    *   **"Add New..."** -> **"Project"** -> Importa tu repositorio `sistema-vlf-automation`.

3.  **Configura el proyecto:**
    *   **PASO 1: Ajustes de Construcción.**
        *   **Root Directory:** **"Edit"** -> selecciona **`packages/web`**.
        *   **Build Command:** **"Override"** -> escribe `npm run build`.
        *   **Install Command:** **"Override"** -> escribe `npm install`.

    *   **PASO 2: Variables de Entorno.**
        *   Añade las siguientes dos variables:

        *   **Variable 1 (API):**
            *   **Name:** `NEXT_PUBLIC_API_URL`
            *   **Value:** Pega la URL de tu API de Render.

        *   **Variable 2 (Base de Datos):**
            *   **Name:** `DATABASE_URL`
            *   **Value:** Pega la "External Connection String" de Render.

    *   **Haz clic en "Deploy"**.

¡Listo! Con esto, tu aplicación estará en línea y configurada de forma segura.
