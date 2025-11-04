# Guía de Despliegue Paso a Paso (para no programadores) - v2

¡Hola! Esta guía actualizada te llevará de la mano para que puedas poner tu proyecto en internet. He realizado algunas mejoras para que el proceso sea aún más fácil y automático.

---

### Parte A: Preparando tu Ordenador

Antes de subir el proyecto, necesitas instalar 3 herramientas gratuitas en tu ordenador. Son como los "programas base" que los desarrolladores usan. **Si ya los instalaste la vez anterior, puedes saltar esta parte.**

1.  **Git:** Imagina que es un "guardador de versiones" súper avanzado para el código. Nos permitirá subir el proyecto a internet.
    *   **Descarga aquí:** [git-scm.com/downloads](https://git-scm.com/downloads)
    *   **Instalación:** Abre el instalador y haz clic en "Next" en todas las ventanas, dejando las opciones por defecto.

2.  **Node.js:** Es el "motor" que hace funcionar el código de nuestro proyecto (tanto el frontend como el backend).
    *   **Descarga aquí:** [nodejs.org](https://nodejs.org/)
    *   **Instalación:** Descarga la versión "LTS" (la recomendada). Abre el instalador y haz clic en "Next" en todas las ventanas hasta que termine.

3.  **Docker Desktop:** Piensa en Docker como una forma de crear "cajas" virtuales para nuestras aplicaciones, asegurando que funcionen igual en cualquier ordenador.
    *   **Descarga aquí:** [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
    *   **Instalación:** Sigue las instrucciones del instalador. Puede que te pida reiniciar. Una vez instalado, ábrelo y déjalo funcionando en segundo plano.

---

### Parte B: Subiendo el Proyecto a Internet (GitHub)

Ahora vamos a poner el código en **GitHub**, que es como una red social para guardar y compartir código.

1.  **Crea una cuenta en GitHub:** Ve a [github.com](https://github.com) y regístrate. Es gratis.

2.  **Crea un nuevo repositorio:**
    *   Haz clic en el botón verde **"New"** o en el símbolo `+` y selecciona **"New repository"**.
    *   **Dale un nombre:** `sistema-vlf-automation`.
    *   Asegúrate de que sea **"Public"**.
    *   **NO** selecciones "Add a README file".
    *   Haz clic en **"Create repository"**.

3.  **Sube el código:**
    *   Abre la carpeta del proyecto que te he entregado. Haz clic derecho y busca una opción que diga **"Abrir en Terminal"** o **"Git Bash Here"**.
    *   Copia y pega los siguientes comandos en la terminal, uno por uno, presionando Enter después de cada uno.

    ```bash
    git init
    git add .
    git commit -m "Project ready for deployment"
    git branch -M main
    git remote add origin https://github.com/TU_USUARIO/sistema-vlf-automation.git
    git push -u origin main
    ```
    *   **¡Importante!** Reemplaza `TU_USUARIO` con tu nombre de usuario real de GitHub.
    *   Te pedirá tu usuario y contraseña de GitHub.

¡Listo! Tu código actualizado ya está en GitHub.

---

### Parte C: Creando la Base de Datos y el Backend (Render)

Ahora vamos a poner a funcionar el "cerebro" (API) y la "memoria" (base de datos) de la aplicación en **Render**.

1.  **Crea una cuenta en Render:** Ve a [render.com](https://render.com) y regístrate usando tu cuenta de GitHub.

2.  **Crea un nuevo "Blueprint":**
    *   En tu dashboard de Render, haz clic en **"New"** -> **"Blueprint"**.
    *   Conecta tu cuenta de GitHub y selecciona tu repositorio `sistema-vlf-automation`.
    *   **Magia Automática:** Render leerá el archivo `render.yaml` que he creado y configurará automáticamente la base de datos y el servicio web.
    *   Haz clic en **"Apply"**.

Render empezará a trabajar. Puede tardar unos minutos. Cuando termine, tendrás una URL pública para tu API. **Cópiala**, la necesitarás en el siguiente paso.

---

### Parte D: Publicando la Interfaz Web (Frontend) en Vercel

Finalmente, vamos a publicar la parte visible de tu aplicación en **Vercel**.

1.  **Crea una cuenta en Vercel:** Ve a [vercel.com](https://vercel.com) y regístrate usando tu cuenta de GitHub.

2.  **Importa tu proyecto:**
    *   En tu dashboard, haz clic en **"Add New..."** -> **"Project"**.
    *   Busca tu repositorio `sistema-vlf-automation` y haz clic en **"Import"**.

3.  **Configura el proyecto:**
    *   **Magia Automática (v2):** Gracias al nuevo archivo `vercel.json` que he añadido, Vercel detectará **automáticamente** que tu aplicación es de Next.js y que se encuentra en la carpeta `packages/web`. ¡Ya no tienes que configurar el "Root Directory"!
    *   Despliega la sección **"Environment Variables"** (Variables de Entorno).
    *   Añade una nueva variable para que tu web sepa cómo encontrar al "cerebro" (la API):
        *   **Name:** `NEXT_PUBLIC_API_URL`
        *   **Value:** Pega la URL de tu API de Render que copiaste en el paso anterior.
    *   Haz clic en **"Deploy"**.

Vercel comenzará a construir tu web. Cuando termine, te dará una URL pública. **¡Esa es la dirección de tu aplicación en internet!**

¡Felicidades! Con estas mejoras, el proceso es más robusto y automático.
