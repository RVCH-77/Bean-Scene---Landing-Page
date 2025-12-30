# Proyecto Web – Integración Figma + TailwindCSS

## Introducción

Para el desarrollo de este proyecto, seleccioné una plantilla de **Figma** creada por **Mohammed Jawed** como base para el diseño inicial.
El archivo original puede consultarse en el siguiente enlace:

[Bean Scene Coffee Landingpage](https://www.figma.com/community/file/1201418433329014860)

A partir de esta plantilla, implementé el **MCP de Figma** y realicé diversos cambios y ajustes para adaptar el diseño al proceso de desarrollo y darle una identidad propia.

---

## Organización del Proyecto (Simplificada)

Se ha simplificado la estructura del proyecto para facilitar el despliegue y el mantenimiento, consolidando los archivos finales en la carpeta `public`.

### Carpeta `public`
Contiene todos los archivos necesarios para el despliegue en producción (Netlify):
- `index.html`: Estructura principal con clases de Tailwind.
- `css/output.css`: Hoja de estilos generada y minificada.
- `img/`: Recursos gráficos optimizados.

### Carpeta `src`
Contiene los archivos fuente de estilos:
- `input.css`: Configuración base de Tailwind y directivas `@theme`.

Para la interacción, se utilizó **JavaScript Vanilla** exclusivamente para implementar un efecto **parallax**, manteniendo el proyecto ligero y optimizado.

---
## Retos durante el desarrollo

Uno de los principales desafíos surgió al utilizar **FNM (Fast Node Manager)** como gestor de versiones de Node.js. Debido a la gestión de versiones, se presentaron inconvenientes para vincular correctamente los comandos con el IDE, ya que no se reconocían:

- `fnm`
- `node`
- `npx`

La solución consistió en **definir explícitamente la ruta de ejecución** y agregar el **token de la API de Figma**, lo que permitió el correcto funcionamiento del MCP.

A continuación, se muestra la estructura utilizada para la configuración del MCP:

```json
{
  "mcpServers": {
    "Framelink MCP for Figma": {
      "command": "fnm",
      "args": [
        "exec",
        "--using=default",
        "--",
        "npx",
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=TU_FIGMA_API_KEY_AQUI"
      ]
    }
  }
}
```

---


## Flujo de Desarrollo

El siguiente diagrama ilustra el proceso de desarrollo, compilación y renderizado final en el navegador:

```mermaid
graph TD
    subgraph "Desarrollo (Source)"
        HTML["public/index.html<br>(HTML con clases Tailwind)"]
        CSS_SRC["src/input.css<br>(Configuración @theme y @import)"]
    end

    subgraph "Compilación (Automático)"
        CLI["Tailwind CLI v4<br>(npm run dev / build)"]
    end

    subgraph "Producción (Public)"
        CSS_OUT["public/css/output.css<br>(CSS generado)"]
        BROWSER["Navegador Web<br>(Renderiza desde 'public')"]
    end

    HTML --> CLI
    CSS_SRC --> CLI
    CLI -- "Escanea y genera" --> CSS_OUT
    HTML -- "Enlaza" --> CSS_OUT
    CSS_OUT --> BROWSER
    HTML --> BROWSER
```

---

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica.
- **CSS3**: Estilos base y personalizados.
- **TailwindCSS v4**: Framework de utilidades para diseño rápido y responsivo.
- **JavaScript (Vanilla)**: Lógica para efectos visuales (Parallax).
- **Figma**: Diseño y prototipado (MCP integration).
- **Node.js**: Entorno de ejecución.
- **Netlify**: Plataforma de despliegue continuo.

## Requisitos Previos (FNM)

Recomendamos usar **fnm** (Fast Node Manager) para gestionar la versión de Node.js.

1.  **Instalar fnm**:
    - **Windows**: `winget install Schniz.fnm`
    - **Mac/Linux**: `curl -fsSL https://fnm.vercel.app/install | bash`

2.  **Configurar Node.js**:
    ```bash
    fnm install --lts
    fnm use lts
    ```

## Instalación

1.  Instalar las dependencias del proyecto:
    ```bash
    npm install
    ```

## Cómo Correr el Proyecto

1.  **Compilar CSS (Modo Desarrollo)**:
    En una terminal, ejecuta este comando para compilar Tailwind en tiempo real:
    ```bash
    npm run dev
    ```

2.  **Iniciar Servidor Local**:
    En **otra terminal**, ejecuta este comando para abrir el sitio en `http://localhost:3000`:
    ```bash
    npm start
    ```

## Construcción (Producción)

Para generar el CSS optimizado y minificado para despliegue:
```bash
npm run build
```
