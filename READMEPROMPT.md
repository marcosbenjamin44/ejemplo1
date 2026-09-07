# README de prompts: ejercicio CR7 + Messi desde cero

Este documento contiene los prompts para reproducir el ejercicio completo en un computador nuevo. Están ordenados para trabajar por etapas con **Claude Code** para implementar y **OpenCode** para auditar.

> Los prompts no sustituyen la revisión del estudiante. Después de cada etapa, abre los archivos, prueba la página y revisa los cambios antes de continuar.

## Resultado final

El proyecto tendrá:

- Una página responsive sobre Cristiano Ronaldo.
- Una página responsive sobre Lionel Messi.
- Interacciones con JavaScript.
- Observabilidad local en el navegador.
- Auditorías de accesibilidad, UX y responsive.
- Pruebas técnicas documentadas.
- Repositorio Git y publicación con GitHub Pages.

## 0. Preparar el computador

Instala:

- Visual Studio Code: <https://code.visualstudio.com/download>
- Node.js LTS: <https://nodejs.org/>
- Git: <https://git-scm.com/downloads>
- Claude Code: <https://code.claude.com/docs/en/overview>
- OpenCode: <https://opencode.ai/docs/>

Comprueba las herramientas:

```bash
code --version
node --version
npm --version
git --version
claude --version
opencode --version
```

Configura Git una sola vez con tus datos:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@example.com"
```

Nunca pegues contraseñas, tokens ni claves API en un prompt, archivo o repositorio.

## 1. Crear la carpeta del proyecto

En una terminal:

```bash
mkdir ejemplo1
cd ejemplo1
git init -b main
mkdir paginaCristianoRonaldo
code .
```

Abre otra terminal dentro de `paginaCristianoRonaldo` y ejecuta:

```bash
claude
```

## 2. Prompt: definir el proyecto

**Herramienta:** Claude Code

```text
Actúa como desarrollador web senior y docente. Vamos a construir desde cero un sitio web estático en español sobre fútbol, usando únicamente HTML, CSS y JavaScript vanilla, sin React, Vue, Angular, frameworks ni backend.

Trabaja exclusivamente dentro de la carpeta paginaCristianoRonaldo. Antes de modificar archivos, inspecciona la carpeta y explica brevemente qué vas a crear. Crea una primera versión sobre Cristiano Ronaldo con estos archivos:

- index.html
- styles.css
- script.js

La página debe incluir una estructura semántica con header, nav, main y footer; título y descripción; navegación interna; biografía; trayectoria o línea de tiempo interactiva; estadísticas; galería con al menos tres imágenes reales y textos alt descriptivos; enlaces funcionales; estados de foco visibles; diseño responsive y una apariencia visual cuidada.

Usa textos en español, HTML semántico y JavaScript claro. No inventes APIs ni dependencias. Mantén todo ejecutable abriendo la página desde un servidor local. Al terminar, revisa que los archivos existan, valida la sintaxis JavaScript y resume los cambios y las pruebas realizadas.
```

Comprueba que existan `index.html`, `styles.css` y `script.js`.

## 3. Prompt: revisar la primera versión

**Herramienta:** Claude Code

```text
Revisa la primera versión del sitio sin cambiar todavía el diseño. Comprueba que index.html cargue styles.css y script.js, que los enlaces internos funcionen, que las imágenes tengan alt descriptivo, que la línea de tiempo responda al teclado y que no haya errores evidentes de JavaScript.

Ejecuta las comprobaciones que puedas desde la terminal. Si encuentras problemas, corrígelos en los archivos correspondientes sin añadir frameworks. Al final, indica exactamente qué verificaste y qué quedó pendiente de probar manualmente en el navegador.
```

Inicia el servidor:

```bash
cd paginaCristianoRonaldo
python3 -m http.server 8000
```

Abre <http://localhost:8000/>. Si `python3` no existe, prueba `python -m http.server 8000`.

## 4. Prompt: auditar accesibilidad y responsive

**Herramienta:** OpenCode

En otra terminal, dentro de `paginaCristianoRonaldo`, ejecuta `opencode` y pega:

```text
Realiza una auditoría no destructiva de index.html, styles.css y script.js según WCAG 2.2 AA, UX y diseño responsive.

Revisa como mínimo: estructura semántica, jerarquía de encabezados, nombres accesibles, textos alternativos, contraste, navegación con teclado, foco visible, uso correcto de botones y enlaces, ARIA, objetivos táctiles, navegación móvil, overflow horizontal, imágenes, errores JavaScript y comportamiento en 320px, 390px, 768px y escritorio.

No modifiques ningún archivo. Devuelve un informe Markdown llamado AUDITORIA.md con esta estructura:

1. Resumen ejecutivo.
2. Hallazgos críticos, altos, medios y bajos.
3. Evidencia concreta indicando archivo y elemento afectado.
4. Recomendación de corrección para cada hallazgo.
5. Pruebas que deberían repetirse después de corregir.

Si un criterio cumple, indícalo también. No inventes problemas que no puedas justificar con el código.
```

Guarda la respuesta como `AUDITORIA.md` dentro de `paginaCristianoRonaldo`.

## 5. Prompt: corregir la auditoría

**Herramienta:** Claude Code

```text
Lee AUDITORIA.md y aplica las correcciones necesarias en index.html, styles.css y script.js.

Prioriza los hallazgos críticos, altos y medios. Conserva la identidad visual y el contenido existente. No uses frameworks ni reescribas archivos sin necesidad. Mejora semántica, accesibilidad, teclado, foco, contraste, responsive, imágenes y errores de JavaScript según corresponda.

Después valida la sintaxis JavaScript, revisa las rutas de recursos y resume cada corrección. No marques una recomendación como resuelta si no puedes relacionarla con un cambio concreto o una prueba.
```

Verifica:

```bash
git diff --check
node --check script.js
```

## 6. Prompt: añadir observabilidad local

**Herramienta:** Claude Code

```text
Añade observabilidad local al sitio existente sin backend, servicios externos ni envío de datos.

Crea o actualiza estos archivos dentro de paginaCristianoRonaldo:

- observabilidad.html
- observabilidad.css
- observabilidad.js
- script.js, si es necesario para instrumentar la página principal

Registra en localStorage, usando una clave con el prefijo cr7-observability:

- tiempo de navegación y carga mediante Performance API cuando esté disponible;
- errores JavaScript y promesas rechazadas;
- errores de carga de recursos;
- clics en enlaces, botones y controles;
- cambios de visibilidad de la pestaña;
- viewport, conexión y soporte de APIs.

Expón window.CR7Observability.getSnapshot(). El dashboard debe permitir actualizar los datos, generar un evento de demostración, limpiar el almacenamiento y descargar un snapshot JSON. Usa HTML semántico, estados accesibles y diseño responsive. Mantén compatibilidad si alguna API del navegador no existe.

Al terminar, valida node --check para todos los archivos JavaScript y explica cómo probar el dashboard manualmente.
```

Prueba <http://localhost:8000/observabilidad.html> y en la consola del navegador ejecuta:

```javascript
window.CR7Observability.getSnapshot()
```

## 7. Prompt: probar la observabilidad

**Herramienta:** Claude Code

```text
Prueba el flujo de observabilidad del proyecto sin cambiar funcionalidades que ya funcionen.

Revisa que el sitio registre al menos un clic, que los datos persistan en localStorage, que observabilidad.html pueda leer el snapshot, que el evento de demostración incremente las interacciones, que el botón de limpieza reinicie los datos y que la descarga produzca un JSON válido.

Comprueba también el caso en que Performance API, conexión o alguna otra API opcional no esté disponible. Corrige únicamente defectos reproducibles y resume las comprobaciones realizadas.
```

## 8. Prompt: crear la versión 2 con Messi

**Herramienta:** Claude Code

```text
Crea la versión 2 del sitio sin eliminar ni romper la página de Cristiano Ronaldo ni el dashboard.

Añade dentro de paginaCristianoRonaldo:

- messi.html
- messi.css
- messi.js

La nueva página será sobre Lionel Messi y debe incluir estructura semántica, navegación hacia index.html y observabilidad.html, biografía, trayectoria interactiva, estadísticas, galería con al menos tres imágenes reales y alt descriptivo, enlaces funcionales, teclado, foco visible, diseño responsive y el mismo nivel de calidad visual del sitio existente.

Usa solo HTML, CSS y JavaScript vanilla. Reutiliza patrones compatibles cuando tenga sentido, pero mantén los estilos y scripts organizados. No modifiques ni borres contenido existente sin justificarlo. Valida las rutas, ejecuta node --check messi.js y prueba la página desde el servidor local.
```

Prueba <http://localhost:8000/messi.html>.

## 9. Prompt: auditar la página de Messi

**Herramienta:** OpenCode

```text
Realiza una auditoría no destructiva de messi.html, messi.css y messi.js. Revisa también sus enlaces desde index.html y observabilidad.html.

Evalúa WCAG 2.2 AA, semántica, contraste, alt, foco, teclado, ARIA, botones y enlaces, objetivos táctiles, responsive y overflow en 320px, 390px, 768px y escritorio. Comprueba que no existan errores JavaScript ni rutas rotas.

No modifiques archivos. Devuelve un informe Markdown llamado AUDITORIA-MESSI.md con resumen, hallazgos clasificados por severidad, evidencia por archivo, recomendaciones y pruebas de verificación. Distingue entre problemas confirmados y aspectos que requieren comprobación manual.
```

Guarda el resultado como `AUDITORIA-MESSI.md`.

## 10. Prompt: corregir la auditoría de Messi

**Herramienta:** Claude Code

```text
Lee AUDITORIA-MESSI.md y corrige los hallazgos críticos, altos y medios relacionados con messi.html, messi.css y messi.js.

Mantén la página de Cristiano Ronaldo, el dashboard y la observabilidad funcionando. No uses frameworks. No hagas cambios cosméticos que no estén relacionados con los hallazgos. Después ejecuta node --check para messi.js y revisa las rutas y el comportamiento responsive.

Resume los cambios con una tabla breve: hallazgo, archivo modificado y verificación realizada.
```

## 11. Prompt: preparar pruebas y evidencias

**Herramienta:** Claude Code

```text
Prepara una lista de pruebas finales para este proyecto estático. Incluye pruebas de:

- carga de index.html, messi.html y observabilidad.html;
- sintaxis de script.js, messi.js y observabilidad.js;
- navegación interna y enlaces externos;
- imágenes y textos alt;
- teclado, foco y controles interactivos;
- responsive en 320px, 390px, 768px y escritorio;
- ausencia de overflow horizontal inesperado;
- observabilidad, localStorage, snapshot, limpieza y descarga JSON;
- ausencia de errores en la consola del navegador.

Ejecuta las pruebas automáticas que sean posibles, no inventes resultados manuales y crea un archivo resultados-pruebas.md con columnas: caso, pasos, resultado esperado, resultado obtenido y estado. Deja marcadas como pendientes las pruebas que deban hacer una persona en el navegador.
```

Comandos mínimos:

```bash
cd paginaCristianoRonaldo
node --check script.js
node --check messi.js
node --check observabilidad.js
git diff --check
```

## 12. Prompt: revisión final antes de Git

**Herramienta:** Claude Code

```text
Haz una revisión final del proyecto completo antes de versionarlo.

Lee todos los HTML, CSS y JavaScript, además de AUDITORIA.md, AUDITORIA-MESSI.md y resultados-pruebas.md si existen. Comprueba que no haya referencias a rutas absolutas locales, archivos faltantes, scripts no cargados, enlaces rotos, errores de sintaxis, secretos, dependencias innecesarias ni cambios que rompan otra página.

No hagas una refactorización general. Corrige solo defectos concretos que puedas verificar. Al final entrega:

1. archivos revisados;
2. problemas corregidos;
3. pruebas ejecutadas;
4. pruebas manuales pendientes;
5. decisión: listo o no listo para publicar, con la razón.
```

## 13. Prompt: documentar el proyecto

**Herramienta:** Claude Code

```text
Crea o actualiza README.md para explicar este proyecto a otra persona desde cero.

Incluye requisitos, instalación, estructura de carpetas, ejecución local, URLs locales, uso de Claude Code y OpenCode, observabilidad, pruebas, Git, publicación con GitHub Pages y limitaciones conocidas. Usa comandos reales y nombres de archivos que existan. No inventes resultados ni URLs de GitHub. Mantén la documentación en español y enlaza a READMEGUIA.md y READMEPROMPT.md si existen.
```

## 14. Prompt: guardar el trabajo con Git

**Herramienta:** terminal

Desde la raíz `ejemplo1`:

```bash
git status
git diff --check
git add .
git diff --cached --stat
git commit -m "feat: create CR7 and Messi static site"
git log --oneline --decorate -5
```

Si tienes un repositorio propio en GitHub:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

Si ya existe un remoto, compruébalo antes:

```bash
git remote -v
git push origin main
```

## 15. Prompt: publicar con GitHub Pages

**Herramienta:** Claude Code y terminal

Primero pide una revisión:

```text
Revisa la configuración necesaria para publicar este sitio estático con GitHub Pages. No ejecutes comandos destructivos ni publiques todavía. Indica si la raíz correcta de publicación debe ser la raíz del repositorio o paginaCristianoRonaldo, qué enlaces relativos funcionarían y qué archivos deben quedar accesibles. Señala cualquier ruta absoluta o dependencia que impida la publicación.
```

Después, desde la raíz del repositorio, publica según la configuración de tu repositorio. Una alternativa habitual para este proyecto es:

```bash
git subtree push --prefix paginaCristianoRonaldo origin gh-pages
```

En GitHub, entra en **Settings > Pages**, selecciona la rama `gh-pages` y la carpeta `/ (root)`. Espera a que termine el despliegue y prueba las tres páginas desde la URL pública.

No uses la URL del repositorio de ejemplo como propia. Sustituye `TU_USUARIO` y `TU_REPOSITORIO` por tus datos.

## 16. Prompt: crear la etiqueta de versión

**Herramienta:** terminal

Cuando la versión 2 esté revisada y publicada:

```bash
git add .
git commit -m "feat: release version 2 with Messi page"
git tag -a v2.0.0 -m "Version 2: add Lionel Messi page"
git push origin main --tags
git tag --list
git show v2.0.0 --stat
```

## 17. Prompt de auditoría final independiente

**Herramienta:** OpenCode

```text
Realiza una revisión final independiente y no destructiva de todo el proyecto publicado. Busca defectos funcionales, problemas de accesibilidad WCAG 2.2 AA, rutas que fallen al servirse desde GitHub Pages, errores responsive, secretos expuestos, imágenes rotas, errores de consola y problemas de observabilidad.

Ordena los hallazgos por severidad. Para cada uno incluye archivo, evidencia, impacto, pasos para reproducir y recomendación. Si no encuentras problemas, indica qué revisaste y qué pruebas manuales no puedes confirmar. No modifiques archivos.
```

## Checklist de entrega

- [ ] Las herramientas están instaladas y sus versiones funcionan.
- [ ] El proyecto abre con un servidor local.
- [ ] Funcionan `index.html`, `messi.html` y `observabilidad.html`.
- [ ] Las imágenes cargan y tienen `alt`.
- [ ] Los controles funcionan con teclado.
- [ ] No hay overflow inesperado en móvil.
- [ ] No hay errores de sintaxis JavaScript.
- [ ] Se probó el dashboard y el snapshot JSON.
- [ ] Existen `AUDITORIA.md` y `AUDITORIA-MESSI.md`.
- [ ] Las pruebas están documentadas.
- [ ] Se hizo commit en Git.
- [ ] El repositorio se publicó en GitHub Pages.
- [ ] Se creó la etiqueta `v2.0.0`.

## Regla de trabajo

Cada prompt debe producir un cambio comprobable. Si una herramienta afirma que algo funciona, verifica el archivo, ejecuta el comando o pruébalo en el navegador. Conserva los informes de auditoría y las evidencias para que otra persona pueda repetir el ejercicio y entender tus decisiones.
