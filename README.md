# Sistema de Automatización de Informes VLF y Portal Corporativo

Este repositorio contiene la planificación y el futuro desarrollo del sistema de automatización de informes VLF y el portal web corporativo asociado.

## Resumen de Arquitectura y Estrategia

### 1. Arquitectura Técnica

-   **Backend:** Node.js con TypeScript y Express.js. Este stack es ideal para operaciones de I/O intensivas como la generación de PDFs y la gestión de APIs.
-   **Base de Datos:** PostgreSQL. Una base de datos relacional (SQL) es la mejor opción para garantizar la integridad de los datos y facilitar la generación de futuros informes estadísticos complejos.
-   **Frontend:** Next.js (React). Proporciona una base sólida tanto para la aplicación de formularios técnicos como para el portal corporativo, con un excelente rendimiento y capacidades de SEO.
-   **Generación de PDF:** Puppeteer. Utilizaremos un enfoque de HTML-a-PDF, donde el backend generará un HTML con los datos del informe y usará Puppeteer para convertirlo en un PDF de alta fidelidad.

### 2. Branding y Paleta de Colores

La identidad visual está diseñada para transmitir seguridad, precisión técnica y confianza profesional.

-   **Primario (Azul Corporativo):** `#0A2342`
-   **Secundario (Gris Técnico):** `#4A4A4A`
-   **Fondo (Blanco Hueso):** `#F8F9FA`
-   **Acento Positivo (Verde Éxito):** `#28A745`
-   **Acento de Atención (Naranja Eléctrico):** `#FF8C00`

### 3. Plan de Implementación por Fases

El proyecto se desarrollará de forma incremental para entregar valor de manera temprana y reducir riesgos.

-   **Fase 1: MVP del Sistema de Informes**
    -   Objetivo: Crear el sistema básico de ingreso de datos y generación de PDFs.
-   **Fase 2: Portal Corporativo y Sistema de Usuarios**
    -   Objetivo: Desarrollar la web pública y el sistema de autenticación para proteger la herramienta de informes.
-   **Fase 3: Funcionalidades Avanzadas**
    -   Objetivo: Implementar un dashboard estadístico, gestión de roles y un editor de plantillas de informes.
