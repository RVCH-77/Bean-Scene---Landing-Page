# Proyecto Web – Integración Figma + TailwindCSS

## Introducción

Durante el desarrollo del proyecto seleccioné una plantilla de **Figma** creada por **Mohammed Jawed**, la cual tomé como base para el diseño inicial.  
El archivo original puede consultarse en el siguiente enlace:

https://www.figma.com/community/file/1201418433329014860

A partir de esta plantilla implementé el **MCP de Figma**, además de realizar diversos cambios y ajustes para adaptarla al proceso de desarrollo del proyecto.

---

## Complicaciones durante el desarrollo

Uno de los principales problemas surgió al utilizar **FNM (Fast Node Manager)** como gestor de versiones de Node.js. Al tener este control de versiones, se presentaron inconvenientes para vincularlo correctamente con el IDE/editor, ya que no se reconocían los siguientes comandos:

- `fnm`
- `node`
- `npx`

Después de varios intentos, la solución fue **definir directamente la ruta de ejecución** y agregar un **token de la API de Figma**, lo que permitió que el MCP funcionara correctamente.

A continuación se muestra la estructura utilizada para la configuración del MCP:

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
## Organización del proyecto

### Carpeta `dising`

Una vez resuelto el problema de configuración, se trabajó inicialmente en la carpeta **`dising`**, donde se utilizó únicamente **CSS vanilla**.  
El objetivo de esta etapa fue explorar la herramienta y validar el diseño antes de implementar **TailwindCSS**.  
Además, en esta fase se comenzó a trabajar con **diseño responsivo**.

### Carpeta `view`

En la carpeta **`view`** se realizó el desarrollo principal de la aplicación utilizando **TailwindCSS**, reforzando la implementación de la **responsividad**.

También se realizaron cambios respecto al diseño original de Figma con el fin de darle una identidad visual diferente al proyecto.

Para la parte de interacción visual, se utilizó **JavaScript vanilla** exclusivamente para implementar un efecto **parallax**, manteniendo el resto del proyecto lo más ligero posible.

---

## Flujo de desarrollo

El siguiente diagrama representa el flujo general de cómo se llevó a cabo el desarrollo, la compilación y el resultado final en el navegador:

graph TD
    subgraph "Desarrollo (Trabajo del desarrollador)"
        HTML["View/tailwind.html<br>(HTML con clases Tailwind)"]
        CSS_SRC["Dising/tailwin.css<br>(Configuración @theme y @import)"]
    end

    subgraph "Compilación (Proceso automático)"
        CLI["Tailwind CLI v4<br>(npm run dev / build)"]
    end

    subgraph "Resultado final (Navegador)"
        CSS_OUT["View/output.css<br>(CSS generado, minificado y optimizado)"]
        BROWSER["Navegador Web<br>(Renderiza HTML + CSS)"]
    end

    HTML --> CLI
    CSS_SRC --> CLI
    CLI -- "Escanea clases y genera CSS" --> CSS_OUT
    HTML -- "Enlaza CSS" --> CSS_OUT
    CSS_OUT --> BROWSER
    HTML --> BROWSER

## Tecnologías utilizadas

- HTML5  
- CSS3  
- TailwindCSS v4  
- JavaScript (Vanilla)  
- Figma  
- Node.js  
- FNM (Fast Node Manager)
