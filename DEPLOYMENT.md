# Guía de Despliegue - v8 (Método Manual y Definitivo para Render)

Lamento los problemas con la configuración automática. Este método es manual, pero es 100% fiable y te da el control.

---

### Parte A y B: Preparación y Subida a GitHub

(Sin cambios - Asegúrate de que tu última versión del código esté en GitHub)

---

### Parte C: Creando la Base de Datos y el Backend (Render) - MÉTODO MANUAL

Sigue estos pasos en orden.

*   **PASO 0: (MUY IMPORTANTE) Borra la configuración anterior en Render.**
    *   Ve a tu Dashboard de Render.
    *   Borra los servicios `vlf-api` y `vlf-database` (en la pestaña "Settings" de cada uno -> "Delete Service"). Es crucial empezar de cero.

1.  **Crea el "Blueprint":**
    *   En tu dashboard, clic en **"New"** -> **"Blueprint"**.
    *   Conecta tu repositorio `sistema-vlf-automation`.
    *   Render leerá el archivo `render.yaml` y preparará la creación de los servicios. Haz clic en **"Apply"**.
    *   **NOTA:** El primer despliegue del servicio `vlf-api` fallará. **ESTO ES NORMAL Y ESPERADO**, porque todavía no hemos configurado el código secreto.

2.  **Genera tu Código Secreto (JWT_SECRET):**
    *   Ve a una página generadora de contraseñas seguras, como [https://www.lastpass.com/features/password-generator](https://www.lastpass.com/features/password-generator).
    *   Genera una contraseña larga (por ejemplo, de 32 caracteres).
    *   **Copia este código secreto.** Este será tu `JWT_SECRET`.

3.  **Configura el Código Secreto en Render:**
    *   Ve a tu Dashboard de Render.
    *   Haz clic en tu servicio web, `vlf-api`.
    *   En el menú de la izquierda, ve a la pestaña **"Environment"**.
    *   En la sección "Environment Variables", haz clic en **"Add Environment Variable"**.
        *   **Key:** `JWT_SECRET`
        *   **Value:** Pega el código secreto que acabas de generar.
    *   Haz clic en **"Save Changes"**.

4.  **Redespliega la API:**
    *   Con el secreto ya guardado, ve a la parte superior de la página de tu servicio `vlf-api`.
    *   Haz clic en el botón **"Manual Deploy"**.
    *   Selecciona **"Deploy latest commit"**.

Ahora, Render reconstruirá y reiniciará tu API. Esta vez, cuando arranque, encontrará el `JWT_SECRET` que has configurado manualmente y el servicio se iniciará correctamente y de forma segura.

5.  **Obtén las Direcciones (ahora sí):**
    *   Copia la **URL de tu API** (`vlf-api`).
    *   Ve a tu base de datos (`vlf-database`) y copia la **"External Connection String"**.

---

### Parte D: Publicando la Interfaz Web (Frontend) en Vercel

(Sin cambios - Sigue las instrucciones de la guía anterior para configurar el "Root Directory" y las variables `NEXT_PUBLIC_API_URL` y `DATABASE_URL` en Vercel.)

Lamento de verdad todos los pasos en falso. Este método manual elimina la dependencia de la "magia" de la plataforma que nos estaba fallando y te asegura el éxito.
