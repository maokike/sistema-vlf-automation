# Guía de Despliegue Paso a Paso (para no programadores)

¡Hola! Esta guía te llevará de la mano para que puedas poner tu proyecto en internet. No necesitas saber programar, solo sigue las instrucciones con atención. Dividiremos el proceso en 4 partes.

---

### Parte A: Preparando tu Ordenador

Antes de subir el proyecto, necesitas instalar 3 herramientas gratuitas en tu ordenador. Son como los "programas base" que los desarrolladores usan.

1.  **Git:** Imagina que es un "guardador de versiones" súper avanzado para el código. Nos permitirá subir el proyecto a internet.
    *   **Descarga aquí:** [git-scm.com/downloads](https://git-scm.com/downloads)
    *   **Instalación:** Abre el instalador y haz clic en "Next" en todas las ventanas, dejando las opciones por defecto. No te preocupes por las opciones, la configuración estándar es perfecta.

2.  **Node.js:** Es el "motor" que hace funcionar el código de nuestro proyecto (tanto el frontend como el backend).
    *   **Descarga aquí:** [nodejs.org](https://nodejs.org/)
    *   **Instalación:** Descarga la versión "LTS" (la recomendada para la mayoría). Abre el instalador y, al igual que con Git, haz clic en "Next" en todas las ventanas hasta que termine.

3.  **Docker Desktop:** Piensa en Docker como una forma de crear "cajas" virtuales para nuestras aplicaciones, asegurando que funcionen igual en cualquier ordenador. Lo usaremos para que el despliegue sea más sencillo.
    *   **Descarga aquí:** [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
    *   **Instalación:** Sigue las instrucciones del instalador. Es posible que te pida reiniciar el ordenador. Una vez instalado, ábrelo y déjalo funcionando en segundo plano.

---

### Parte B: Subiendo el Proyecto a Internet (GitHub)

Ahora que tu ordenador está listo, vamos a poner el código en un lugar público donde las plataformas de despliegue puedan acceder a él. Usaremos **GitHub**, que es como una red social para guardar y compartir código.

1.  **Crea una cuenta en GitHub:** Ve a [github.com](https://github.com) y regístrate. Es gratis.

2.  **Crea un nuevo repositorio:**
    *   Una vez dentro, haz clic en el botón verde **"New"** o en el símbolo `+` en la esquina superior derecha y selecciona **"New repository"**.
    *   **Dale un nombre:** `sistema-vlf-automation`.
    *   Asegúrate de que sea **"Public"**.
    *   **NO** selecciones "Add a README file" ni ninguna otra opción.
    *   Haz clic en **"Create repository"**.

3.  **Sube el código:**
    *   GitHub te mostrará una página con unas instrucciones. Busca la sección que dice **"...or push an existing repository from the command line"**.
    *   Ahora, abre la carpeta del proyecto que te he entregado. Haz clic derecho y busca una opción que diga **"Abrir en Terminal"**, **"Git Bash Here"** o similar.
    *   Copia y pega los siguientes comandos en la terminal, uno por uno, presionando Enter después de cada uno.

    ```bash
    git init
    git add .
    git commit -m "Initial commit of the project"
    git branch -M main
    git remote add origin https://github.com/TU_USUARIO/sistema-vlf-automation.git
    git push -u origin main
    ```
    *   **¡Importante!** Reemplaza `TU_USUARIO` con tu nombre de usuario real de GitHub.
    *   Te pedirá tu usuario y contraseña de GitHub.

¡Listo! Si refrescas la página de tu repositorio en GitHub, verás todos los archivos del proyecto allí.

---

### Parte C: Creando la Base de Datos y el Backend (Render)

Ahora vamos a poner a funcionar el "cerebro" de la aplicación (la API) y su memoria (la base de datos). Usaremos **Render**, una plataforma que tiene una capa gratuita perfecta para empezar.

1.  **Crea una cuenta en Render:** Ve a [render.com](https://render.com) y regístrate usando tu cuenta de GitHub. Es más fácil y rápido.

2.  **Crea un nuevo "Blueprint":**
    *   En tu dashboard de Render, haz clic en **"New"** y luego en **"Blueprint"**.
    *   Conecta tu cuenta de GitHub. Te pedirá que le des permiso para ver tus repositorios.
    *   Selecciona tu repositorio `sistema-vlf-automation` de la lista.
    *   **¡Aquí ocurre la magia!** Render leerá automáticamente tu archivo `render.yaml` y sabrá qué tiene que crear. Verás que planea crear una base de datos (`vlf-database`) y un servicio web (`vlf-api`).
    *   Haz clic en **"Apply"**.

Render empezará a trabajar. Puede tardar unos minutos. Verás que construye la base de datos y luego el backend. Cuando termine, tendrás una URL pública para tu API. ¡Cópiala! La necesitarás en el siguiente paso.

---

### Parte D: Publicando la Interfaz Web (Frontend) en Vercel

Finalmente, vamos a publicar la parte visible de tu aplicación, la que los usuarios verán y usarán. Usaremos **Vercel**, una plataforma especializada en desplegar aplicaciones como la nuestra de forma muy sencilla.

1.  **Crea una cuenta en Vercel:** Ve a [vercel.com](https://vercel.com) y regístrate, de nuevo, usando tu cuenta de GitHub.

2.  **Importa tu proyecto:**
    *   Serás redirigido a tu dashboard. Haz clic en **"Add New..."** y selecciona **"Project"**.
    *   Busca tu repositorio `sistema-vlf-automation` y haz clic en **"Import"**.

3.  **Configura el proyecto:**
    *   Vercel detectará que es una aplicación Next.js y configurará casi todo por ti.
    *   Busca la sección **"Environment Variables"** (Variables de Entorno). Aquí es donde le diremos a nuestra web cómo encontrar el "cerebro" (la API).
    *   Añade una nueva variable:
        *   **Name:** `NEXT_PUBLIC_API_URL`
        *   **Value:** Pega la URL de tu API de Render que copiaste en el paso anterior.
    *   Haz clic en **"Deploy"**.

Vercel comenzará a construir tu web. Cuando termine (suele ser muy rápido), te dará una URL pública. **¡Esa es la dirección de tu aplicación en internet!**

¡Felicidades! Has desplegado un proyecto full-stack en la web.
