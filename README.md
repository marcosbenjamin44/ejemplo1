# Proyecto CR7: página web estática y observabilidad

Este repositorio contiene un ejercicio completo de desarrollo web estático sobre Cristiano Ronaldo. Incluye una página responsive, una auditoría de accesibilidad, un dashboard de observabilidad en el navegador, pruebas funcionales y publicación con GitHub Pages.

## Abrir el proyecto

- **Página publicada:** [Abrir página CR7](https://marcosbenjamin44.github.io/ejemplo1/)
- **Dashboard de observabilidad:** [Abrir dashboard](https://marcosbenjamin44.github.io/ejemplo1/observabilidad.html)
- **Repositorio:** [github.com/marcosbenjamin44/ejemplo1](https://github.com/marcosbenjamin44/ejemplo1)

## 1. Requisitos

Instala los siguientes programas:

1. **Visual Studio Code:** [code.visualstudio.com/download](https://code.visualstudio.com/download)
2. **Node.js LTS:** [nodejs.org](https://nodejs.org/)
3. **Git:** [git-scm.com/downloads](https://git-scm.com/downloads)

Comprueba la instalación desde una terminal:

```bash
code --version
node --version
npm --version
git --version
```

En Visual Studio Code puedes abrir una terminal con **Terminal > New Terminal**.

## 2. Descargar el proyecto

Clona el repositorio y ábrelo en Visual Studio Code:

```bash
git clone https://github.com/marcosbenjamin44/ejemplo1.git
cd ejemplo1
code .
```

También puedes abrir directamente la carpeta `ejemplo1` desde **File > Open Folder**.

## 3. Estructura del proyecto

```text
ejemplo1/
├── .gitignore
├── README.md
└── paginaCristianoRonaldo/
    ├── index.html
    ├── styles.css
    ├── script.js
    ├── observabilidad.html
    ├── observabilidad.css
    ├── observabilidad.js
    ├── AUDITORIA.md
    └── resultados-pruebas-observabilidad.xlsx
```

## 4. Ejecutar la página localmente

Desde la carpeta del proyecto:

```bash
cd paginaCristianoRonaldo
python3 -m http.server 8000
```

Abre estas direcciones:

- [Página principal local](http://localhost:8000/)
- [Dashboard local](http://localhost:8000/observabilidad.html)

Para detener el servidor, pulsa `Ctrl + C` en la terminal.

> También puedes utilizar la extensión **Live Server** de Visual Studio Code. Instálala desde la vista de extensiones, abre `paginaCristianoRonaldo/index.html` y pulsa **Go Live**.

## 5. Trabajar con dos agentes

El flujo utilizado en este ejercicio es:

- **Claude Code:** desarrollo, implementación y pruebas.
- **OpenCode:** auditoría y revisión independiente.

### Instalar Claude Code

Instala Claude Code siguiendo su documentación oficial:

[code.claude.com/docs](https://code.claude.com/docs/en/overview)

Después autentícate con tu cuenta desde la terminal:

```bash
claude
```

No compartas contraseñas, tokens ni claves API en el código o en el repositorio.

### Instalar OpenCode

En macOS o Linux puedes usar el instalador oficial:

```bash
curl -fsSL https://opencode.ai/install | bash
```

Comprueba ambas herramientas:

```bash
claude --version
opencode --version
```

## 6. Desarrollo con Claude Code

Desde la raíz del sitio:

```bash
cd paginaCristianoRonaldo
claude
```

Ejemplo de solicitud:

```text
Lee AUDITORIA.md y aplica las recomendaciones pendientes de accesibilidad y responsive. Mantén el diseño actual, valida el resultado y no uses frameworks.
```

Antes de aceptar cambios, revisa los archivos modificados y prueba la página en el navegador.

## 7. Auditoría con OpenCode

Desde la carpeta del sitio:

```bash
cd paginaCristianoRonaldo
opencode
```

Solicita una revisión no destructiva:

```text
Audita index.html, styles.css y script.js según WCAG 2.2 AA, UX y adaptabilidad responsive. Clasifica los hallazgos por severidad y escribe las recomendaciones en AUDITORIA.md. No modifiques el código durante esta revisión.
```

El resultado actual está en [paginaCristianoRonaldo/AUDITORIA.md](paginaCristianoRonaldo/AUDITORIA.md).

## 8. Observabilidad

El sitio registra datos únicamente en el navegador y no los envía a un servidor. La instrumentación se encuentra en `script.js` y expone:

```javascript
window.CR7Observability.getSnapshot()
```

Se registran, entre otros:

- Tiempo de navegación y carga mediante `PerformanceNavigationTiming`.
- Errores JavaScript y promesas rechazadas.
- Errores de carga de recursos.
- Clicks en enlaces, botones y controles.
- Cambios de visibilidad de la pestaña.
- Viewport, conexión y soporte de APIs.
- Estado persistido en `localStorage` con el prefijo `cr7-observability`.

En el dashboard puedes actualizar datos, generar un evento de demostración, limpiar el almacenamiento y descargar un snapshot JSON.

## 9. Ejecutar pruebas técnicas

Valida la sintaxis de los archivos JavaScript:

```bash
cd paginaCristianoRonaldo
node --check script.js
node --check observabilidad.js
```

En Visual Studio Code también puedes revisar los diagnósticos de `index.html`, `styles.css`, `script.js`, `observabilidad.html`, `observabilidad.css` y `observabilidad.js`.

Los resultados documentados están en [resultados-pruebas-observabilidad.xlsx](paginaCristianoRonaldo/resultados-pruebas-observabilidad.xlsx), con estas hojas:

- `Resumen`
- `Casos de prueba`
- `Observabilidad`

## 10. Guardar cambios en Git

Desde la raíz del repositorio:

```bash
git status
git add .
git commit -m "docs: add project setup and deployment guide"
git push origin main
```

## 11. Publicar en GitHub Pages

El sitio se publica desde la rama `gh-pages`, que contiene el contenido de `paginaCristianoRonaldo` en su raíz.

Para configurar GitHub Pages desde cero:

1. Abre la sección [Settings > Pages del repositorio](https://github.com/marcosbenjamin44/ejemplo1/settings/pages).
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. Elige la rama `gh-pages`.
4. Elige la carpeta `/ (root)`.
5. Pulsa **Save**.

La URL pública es:

**[https://marcosbenjamin44.github.io/ejemplo1/](https://marcosbenjamin44.github.io/ejemplo1/)**

El dashboard publicado es:

**[https://marcosbenjamin44.github.io/ejemplo1/observabilidad.html](https://marcosbenjamin44.github.io/ejemplo1/observabilidad.html)**

Después de cada cambio en el sitio, actualiza la rama de despliegue desde la raíz del repositorio:

```bash
git subtree split --prefix=paginaCristianoRonaldo --branch gh-pages
git push origin gh-pages
```

Si GitHub Pages tarda en actualizarse, espera unos minutos y recarga la página con `Cmd + Shift + R` en macOS o `Ctrl + Shift + R` en Windows/Linux.

## 12. Recomendaciones para estudiantes

- Usa HTML semántico antes de añadir `div` innecesarios.
- Escribe textos alternativos descriptivos para las imágenes.
- Prueba el teclado sin usar el mouse.
- Comprueba el sitio en móvil y escritorio.
- No guardes contraseñas, tokens o claves API en Git.
- Revisa los cambios con `git diff` antes de hacer commit.
- Haz commits pequeños y con mensajes descriptivos.
- Usa la auditoría para corregir problemas, no solo para documentarlos.

## Licencia y contenido

Este es un ejercicio educativo. Las imágenes utilizadas proceden de Wikimedia Commons y mantienen sus condiciones de uso y atribución correspondientes. El sitio no es oficial ni está afiliado a Cristiano Ronaldo.