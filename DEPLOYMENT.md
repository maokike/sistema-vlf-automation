# Guía de Despliegue Paso a Paso (para no programadores) - v3

¡Hola! Esta guía actualizada contiene la corrección final para asegurar un despliegue exitoso. He añadido el paso clave que faltaba.

---

### Parte A: Preparando tu Ordenador

**Si ya instalaste estas herramientas, puedes saltar esta parte.**

1.  **Git:** El "guardador de versiones" para el código.
    *   **Descarga:** [git-scm.com/downloads](https://git-scm.com/downloads) (Instalación con opciones por defecto).

2.  **Node.js:** El "motor" para el código.
    *   **Descarga:** [nodejs.org](https://nodejs.org/) (Versión "LTS", instalación con opciones por defecto).

3.  **Docker Desktop:** "Cajas" virtuales para las aplicaciones.
    *   **Descarga:** [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) (Instalar y dejar corriendo en segundo plano).

---

### Parte B: Subiendo el Proyecto a Internet (GitHub)

Sube el código a **GitHub**, el "almacén" de código online.

1.  **Crea una cuenta gratuita en GitHub:** [github.com](https://github.com)

2.  **Crea un nuevo repositorio:**
    *   Clic en **"New"** o `+` -> **"New repository"**.
    *   **Nombre:** `sistema-vlf-automation`.
    *   **Público**.
    *   **NO** selecciones "Add a README file".
    *   Clic en **"Create repository"**.

3.  **Sube el código:**
    *   Abre la carpeta del proyecto y luego una **Terminal** o **Git Bash**.
    *   Copia y pega los siguientes comandos uno por uno:

    ```bash
    git init
    git add .
    git commit -m "Final deployment fixes"
    git branch -M main
    git remote add origin https://github.com/TU_USUARIO/sistema-vlf-automation.git
    git push -u origin main
    ```
    *   **¡Importante!** Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

---

### Parte C: Creando la Base de Datos y el Backend (Render)

Pondremos en marcha el "cerebro" (API) y la "memoria" (base de datos) en **Render**.

1.  **Crea una cuenta en Render:** [render.com](https://render.com) (usa tu cuenta de GitHub).

2.  **Crea un "Blueprint":**
    *   En tu dashboard, clic en **"New"** -> **"Blueprint"**.
    *   Conecta tu repositorio `sistema-vlf-automation`.
    *   Render leerá el archivo `render.yaml` y configurará todo automáticamente.
    *   Clic en **"Apply"**.

3.  **Obtén la Dirección de la Base de Datos:**
    *   Una vez que los servicios se hayan creado, ve al dashboard de Render.
    *   Haz clic en tu base de datos (`vlf-database`).
    *   En la sección **"Info"**, busca un campo llamado **"External Connection String"**.
    *   **Copia esa dirección.** La necesitarás inmediatamente.

---

### Parte D: Publicando la Interfaz Web (Frontend) en Vercel

Ahora publicaremos la parte visible de tu aplicación en **Vercel**.

1.  **Crea una cuenta en Vercel:** [vercel.com](https://vercel.com) (usa tu cuenta de GitHub).

2.  **Importa tu proyecto:**
    *   En tu dashboard, clic en **"Add New..."** -> **"Project"**.
    *   Busca tu repositorio `sistema-vlf-automation` y haz clic en **"Import"**.

3.  **Configura el proyecto:**
    *   Vercel detectará tu aplicación Next.js automáticamente gracias al archivo `vercel.json`.
    *   Busca y despliega la sección **"Environment Variables"** (Variables de Entorno).
    *   **¡ESTE ES EL PASO CLAVE QUE FALTABA!** Necesitamos añadir dos variables:

    *   **Variable 1: La dirección del "cerebro" (API):**
        *   **Name:** `NEXT_PUBLIC_API_URL`
        *   **Value:** Pega la URL de tu API de Render (la que termina en `.onrender.com`).

    *   **Variable 2: La dirección de la "memoria" (Base de Datos):**
        *   **Name:** `DATABASE_URL`
        *   **Value:** Pega la **"External Connection String"** que copiaste de Render en el paso anterior.

    *   Haz clic en **"Deploy"**.

Vercel comenzará a construir tu web. Ahora tiene toda la información que necesita y el despliegue debería completarse sin errores. Cuando termine, te dará la URL pública de tu aplicación.

¡Felicidades! Ahora sí, el proceso está completo.
