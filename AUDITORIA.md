# Auditoría de accesibilidad, UX y adaptabilidad

**Proyecto:** `paginaCristianoRonaldo`  
**Auditor:** OpenCode  
**Fecha:** 4 de septiembre de 2026  
**Alcance:** `index.html`, `styles.css` y `script.js`  
**Tipo:** auditoría técnica no destructiva

## 1. Resumen ejecutivo

El sitio tiene una base semántica sólida: idioma declarado, landmarks HTML, una única `h1`, jerarquía de encabezados consistente y textos alternativos descriptivos en las imágenes. La experiencia visual es clara y la estructura responsive está bien planteada.

Los principales riesgos detectados son:

1. **Contraste de color insuficiente**, especialmente en textos secundarios y rojo sobre fondo claro.
2. **Patrón ARIA de tabs incompleto** en la línea de tiempo.
3. **Navegación móvil oculta sin alternativa**.
4. **Ausencia de estilos de foco visibles propios**.
5. **Riesgo de desbordamiento horizontal en pantallas muy pequeñas**.

No se detectaron hallazgos críticos que bloqueen completamente el uso por teclado o lector de pantalla.

## 2. Criterios revisados

| Área | Criterios revisados |
|---|---|
| Estructura semántica | WCAG 1.3.1, 4.1.2, landmarks y jerarquía de encabezados |
| Teclado y foco | WCAG 2.1.1, 2.1.2, 2.4.3, 2.4.7 y patrón ARIA Tabs |
| Contraste | WCAG 1.4.3, nivel AA |
| Texto alternativo y ARIA | WCAG 1.1.1 y prácticas ARIA |
| Idioma y orden | WCAG 3.1.1 |
| Tamaño de objetivos | WCAG 2.5.5 y recomendación WCAG 2.5.8 |
| Reflow y redimensionado | WCAG 1.4.4 y 1.4.10 |
| UX | Navegación, jerarquía, estados e interacción |
| Responsive | Escritorio, tablet y móvil |

## 3. Hallazgos

### Críticos

No se detectaron hallazgos críticos.

### Altos

#### H1. Contraste insuficiente en textos secundarios

**Criterio:** WCAG 1.4.3  
**Ubicación:** `styles.css`, variable `--muted` y sus usos

El color `#74746f` sobre `#f1eee7` produce un contraste de **4.05:1**, por debajo del mínimo AA de 4.5:1 para texto normal. Afecta, entre otros, a:

- `.main-nav a`
- `.hero-intro`
- `.section-description`
- `.timeline-club`
- `.hero-note`
- `.brand-label`
- `.gallery-heading p:last-child`
- `.credits`

Sobre el fondo del footer `#ded9cf`, el contraste baja a **3.34:1**.

#### H2. Rojo corporativo sobre fondo claro

**Criterio:** WCAG 1.4.3  
**Ubicación:** `.eyebrow`, `.section-kicker` y `.detail-label`

El rojo `#e74632` sobre `#f1eee7` produce **3.41:1**, insuficiente para texto normal. El color funciona para elementos grandes o decorativos, pero no para etiquetas pequeñas.

#### H3. Texto blanco sobre rojo

**Criterio:** WCAG 1.4.3  
**Ubicación:** `.button-primary` y `.manifesto > p`

El blanco sobre `#e74632` produce **3.95:1**, por debajo de 4.5:1 para texto normal. La cita grande sí cumple el umbral aplicable a texto grande.

#### H4. Patrón ARIA de tabs incompleto

**Criterios:** WCAG 2.1.1, 4.1.2 y patrón WAI-ARIA Tabs  
**Ubicación:** `index.html`, botones `.timeline-item`, y `script.js`

La línea de tiempo utiliza `role="tablist"` y `role="tab"`, pero no implementa completamente el patrón esperado:

- No hay `tabindex` dinámico o roving tabindex.
- No existe navegación con las flechas del teclado.
- No hay `aria-controls` en las tabs.
- El panel dinámico no tiene `role="tabpanel"` ni `aria-labelledby`.
- No se gestiona el foco al cambiar de etapa.

La activación con Enter y Espacio sí funciona porque los elementos son botones nativos y `aria-selected` se actualiza correctamente.

### Medios

#### M1. Navegación móvil inexistente

**Ubicación:** `styles.css`, breakpoint de 800px

`.main-nav` utiliza `display: none` en pantallas pequeñas sin ofrecer un menú alternativo. En móvil desaparecen los enlaces a Trayectoria, Números y Galería. El usuario todavía puede usar los botones del hero, pero la sección de estadísticas queda sin un acceso directo claro.

#### M2. Objetivos táctiles pequeños

**Criterio:** WCAG 2.5.5  
**Ubicación:** `.main-nav a`, `.header-cta` y `.back-top`

Los enlaces tienen texto pequeño y no cuentan con padding suficiente. Su área táctil estimada puede ser inferior a 24 px, lo que dificulta su uso en pantallas táctiles.

#### M3. Estados de foco poco definidos

**Criterio:** WCAG 2.4.7  
**Ubicación:** `styles.css`

No hay reglas explícitas para `:focus-visible`. La página depende del anillo de foco del navegador, que puede perderse visualmente sobre fondos oscuros o quedar afectado por contenedores con `overflow: hidden`.

#### M4. Riesgo de desbordamiento del encabezado principal

**Ubicación:** `styles.css`, `h1` en breakpoints móviles

El `h1` usa un tamaño mínimo grande y no tiene `overflow-wrap: anywhere`. En pantallas de aproximadamente 320 px, la palabra “Cristiano” puede generar desbordamiento horizontal según la fuente disponible y el fallback utilizado.

#### M5. Texto sobre fotografías con contraste variable

**Ubicación:** `.image-tag`, `.gallery-card figcaption small` y `.vertical-label`

El contraste del texto sobre imágenes depende del contenido concreto de cada fotografía. El gradiente oscuro ayuda en la parte inferior, pero el contraste no puede garantizarse de forma estática para todas las zonas de imagen.

### Bajos

#### B1. No hay enlace “Saltar al contenido”

**Criterio:** WCAG 2.4.1

En una página única el bloque repetido es pequeño, pero un enlace de omisión mejora la navegación de usuarios de teclado.

#### B2. No hay tratamiento para movimiento reducido

**Criterios:** WCAG 2.2.2 y 2.3.3 como recomendación

Las transiciones, el desplazamiento suave y el zoom de imágenes no se desactivan para usuarios que tienen activa la preferencia `prefers-reduced-motion: reduce`.

#### B3. Dependencia de imágenes externas

Las imágenes de Wikimedia Commons y las fuentes de Google Fonts dependen de conectividad externa. Si fallan, los textos alternativos permanecen, pero se pierde parte del contenido visual.

#### B4. Ausencia de `<noscript>`

Si JavaScript está desactivado, la línea de tiempo queda limitada al primer hito y no se informa al usuario de esa limitación.

#### B5. Microtipografías

Varios elementos usan tamaños de 9 a 11 px: etiquetas, créditos, navegación secundaria y textos auxiliares. Aunque algunos cumplen contraste, pueden resultar difíciles de leer en pantallas pequeñas.

## 4. Aspectos correctos

- `lang="es"`, `doctype`, charset, viewport, título y meta descripción definidos.
- Una sola `h1` y jerarquía `h1` → `h2` → `h3` coherente.
- Uso correcto de `header`, `nav`, `main`, `section`, `footer`, `figure` y `blockquote`.
- Secciones principales etiquetadas con `aria-labelledby`.
- Las cuatro imágenes tienen textos alternativos descriptivos.
- Los elementos decorativos utilizan `aria-hidden`.
- `aria-live="polite"` anuncia el contenido actualizado de la línea de tiempo.
- `aria-selected` se sincroniza mediante JavaScript.
- Uso de `defer` en el script y `loading="lazy"` en la galería.
- Contraste adecuado entre tinta y papel, y entre lima y fondo oscuro.
- Breakpoints coherentes a 800 px y 460 px.
- La cuadrícula de estadísticas cambia de cuatro a dos columnas y luego a una.
- La galería se apila correctamente en móvil.
- El cambio de hito conserva IDs estables y evita reemplazar todo el árbol accesible.

## 5. Recomendaciones priorizadas

| Prioridad | Hallazgo | Recomendación |
|---|---|---|
| Alta | H1, H2 y H3 | Oscurecer `--muted` a un tono que alcance al menos 4.5:1 sobre el papel. Usar `--red-dark` para etiquetas pequeñas y un rojo más oscuro en botones y atribuciones. |
| Alta | Tabs incompletas | Simplificar el patrón usando botones normales con `aria-pressed`, o implementar tabs completas con roving tabindex, flechas, `tabpanel`, `aria-controls` y gestión de foco. |
| Alta | Navegación móvil | Crear un menú desplegable accesible con botón, `aria-expanded` y acceso a todas las secciones. |
| Media | Objetivos táctiles | Añadir padding y un área mínima de 24 px a enlaces y controles. |
| Media | Foco | Añadir `:focus-visible` con outline de 2 px, contraste alto y offset visible. |
| Media | `h1` móvil | Añadir `overflow-wrap: anywhere` y `text-wrap: balance` en pantallas pequeñas. |
| Baja | Acceso por teclado | Añadir enlace “Saltar al contenido”. |
| Baja | Movimiento | Añadir `@media (prefers-reduced-motion: reduce)` para eliminar scroll suave y transiciones. |
| Baja | Legibilidad | Evitar tamaños inferiores a 12 px en textos informativos. |
| Baja | Disponibilidad | Considerar descargar y servir localmente las imágenes y fuentes, o añadir fallbacks visuales. |

## 6. Limitaciones

1. La auditoría se realizó principalmente sobre el código fuente. No sustituye una prueba manual completa con lectores de pantalla.
2. No se ejecutaron axe, WAVE o Lighthouse.
3. No se verificaron tabulación, zoom al 400 %, reflow completo ni lectores de pantalla en varios navegadores.
4. El contraste sobre fotografías depende del contenido de cada imagen y no puede garantizarse solo con CSS estático.
5. Las imágenes y fuentes externas dependen de la red y del renderizado del navegador.
6. La severidad combina conformidad WCAG 2.2 AA, usabilidad con teclado, lectores de pantalla y experiencia móvil.

## 7. Conclusión

La página presenta una buena base visual y semántica, pero antes de considerarla plenamente accesible conviene resolver los cuatro hallazgos de prioridad alta: contraste, tabs ARIA, navegación móvil y foco visible. La adaptación responsive es sólida en estructura, aunque debe verificarse y reforzarse en pantallas muy pequeñas.

**Estado de auditoría:** completada por OpenCode.  
**Estado de correcciones:** pendientes de priorización e implementación.

## Addendum: auditoría de la versión 2

OpenCode revisó la incorporación de la página de Lionel Messi antes de su publicación. La revisión incluyó `messi.html`, `messi.css`, `messi.js`, la integración con `index.html` y `observabilidad.html`, además de las páginas existentes.

### Hallazgos detectados y corregidos

- Se sustituyó el dorado de bajo contraste en textos pequeños sobre fondos claros por `--gold-dark: #8a5b00` y se usó `--sky-dark: #16467a` para el foco y el punto activo de la línea de tiempo.
- Se mejoró el contraste de la navegación y la marca de Messi sobre el hero oscuro.
- Se ampliaron las áreas táctiles de los enlaces del footer.
- Se eliminó el `aria-live` redundante del `tabpanel` de Messi.
- Se reemplazó el uso decorativo de `<em>` por `span.accent`.
- Se protegió la cita destacada contra desbordamiento horizontal en móviles.

### Validación posterior

- Contraste `--gold-dark` sobre fondo claro: **5.42:1**.
- Contraste `--sky-dark` sobre fondo claro: **8.85:1**.
- Viewport móvil probado: `scrollWidth` igual a `clientWidth`, sin overflow horizontal.
- Navegación por teclado de la línea de tiempo: aprobada.
- Diagnósticos de HTML, CSS y JavaScript: sin errores.
- `node --check messi.js` y `node --check script.js`: aprobados.

**Estado de auditoría v2:** completada por OpenCode y corregida antes de publicar.
