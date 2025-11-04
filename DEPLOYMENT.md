# Guía de Despliegue Paso a Paso (para no programadores) - v4 (Final)

¡Hola! Esta es la guía definitiva. Lamento sinceramente los errores anteriores. He simplificado el proceso al máximo para asegurar un despliegue exitoso.

---

### Parte A: Preparando tu Ordenador

**Si ya instalaste estas herramientas, puedes saltar esta parte.**

1.  **Git:** El "guardador de versiones".
    *   **Descarga:** [git-scm.com/downloads](https://git-scm.com/downloads) (Instalación con opciones por defecto).

2.  **Node.js:** El "motor" para el código.
    *   **Descarga:** [nodejs.org](https://nodejs.org/) (Versión "LTS", instalación por defecto).

---

### Parte B: Subiendo el Proyecto a GitHub

Sube el código a **GitHub**, tu "almacén" de código online.

1.  **Crea una cuenta gratuita en GitHub:** [github.com](https://github.com)

2.  **Crea un nuevo repositorio:**
    *   Clic en **"New"**.
    *   **Nombre:** `sistema-vlf-automation`.
    *   **Público**.
    *   Clic en **"Create repository"**.

3.  **Sube el código:**
    *   Abre la carpeta del proyecto y luego una **Terminal** o **Git Bash**.
    *   Copia y pega los siguientes comandos uno por uno:

    ```bash
    git init
    git add .
    git commit -m "Final version for deployment"
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
    *   Una vez creado, ve al dashboard de Render.
    *   Haz clic en tu base de datos (`vlf-database`).
    *   En la sección **"Info"**, busca el campo **"External Connection String"**.
    *   **Copia esa dirección.** La necesitarás en el siguiente paso.

---

### Parte D: Publicando la Interfaz Web (Frontend) en Vercel - MÉTODO CORREGIDO

Este es el proceso simplificado y correcto para Vercel.

1.  **Crea una cuenta en Vercel:** [vercel.com](https://vercel.com) (usa tu cuenta de GitHub).

2.  **Importa tu proyecto:**
    *   En tu dashboard, clic en **"Add New..."** -> **"Project"**.
    *   Busca tu repositorio `sistema-vlf-automation` y haz clic en **"Import"**.

3.  **Configura el proyecto:**
    *   Vercel detectará que es un monorepo, pero podría no seleccionar el proyecto correcto.
    *   **PASO CLAVE 1: Selecciona el Directorio Raíz.**
        *   Busca la sección **"Root Directory"** y haz clic en **"Edit"**.
        *   Aparecerá una lista de carpetas. Selecciona **`packages/web`** y haz clic en "Continue".
        *   Vercel ahora detectará correctamente tu proyecto como "Next.js".
    *   **PASO CLAVE 2: Configura las Variables de Entorno.**
        *   Busca y despliega la sección **"Environment Variables"**.
        *   Añade las siguientes dos variables:

        *   **Variable 1 (La dirección de la API):**
            *   **Name:** `NEXT_PUBLIC_API_URL`
            *   **Value:** Pega la URL de tu API de Render (la que termina en `.onrender.com`).

        *   **Variable 2 (La dirección de la Base de Datos):**
            *   **Name:** `DATABASE_URL`
            *   **Value:** Pega la **"External Connection String"** que copiaste de Render.

    *   **Haz clic en "Deploy"**.

Ahora sí, Vercel tiene toda la información correcta: sabe dónde está tu proyecto, qué tipo de proyecto es, y tiene las direcciones de la API y la base de datos. El despliegue se completará exitosamente.

¡Felicidades y, de nuevo, mis disculpas por las confusiones anteriores!
