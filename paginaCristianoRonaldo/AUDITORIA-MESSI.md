# Auditoría de Lionel Messi - Versión 2

**Proyecto:** `paginaCristianoRonaldo`  
**Auditor:** OpenCode  
**Fecha:** 4 de septiembre de 2026  
**Alcance:** `messi.html`, `messi.css`, `messi.js` e integración con `index.html` y `observabilidad.html`  
**Estado:** auditada, corregida y preparada para publicación como `v2.0.0`

## 1. Resumen

OpenCode revisó la nueva página de Lionel Messi antes de subirla a GitHub y desplegarla en GitHub Pages. La auditoría cubrió accesibilidad WCAG 2.2 AA, UX, navegación por teclado, contraste, textos alternativos, integración y adaptabilidad responsive.

No se detectaron problemas críticos. Se encontraron problemas de contraste en la paleta de Messi, contraste insuficiente en la navegación sobre el hero oscuro, áreas táctiles pequeñas en el footer y un riesgo de overflow móvil en la cita destacada. Todos los hallazgos prioritarios fueron corregidos antes de crear la etiqueta `v2.0.0`.

## 2. Criterios revisados

| Área | Revisión |
|---|---|
| Estructura | HTML semántico, landmarks y jerarquía de encabezados |
| Accesibilidad | WCAG 2.2 AA, ARIA, foco y teclado |
| Contraste | WCAG 1.4.3, 1.4.11 y 2.4.11 |
| Imágenes | Textos alternativos y carga de recursos |
| UX | Navegación, feedback e interacción |
| Responsive | Viewports de escritorio y móvil |
| Integración | Enlaces con CR7 y dashboard de observabilidad |

## 3. Hallazgos de OpenCode

### Alto

#### H1. Contraste insuficiente del dorado sobre fondos claros

El color original `#d99a2b` sobre el fondo claro de Messi producía un contraste de **2.25:1**, insuficiente para texto pequeño y elementos de interfaz.

Afectaba a:

- Etiquetas de la trayectoria.
- Números de la galería.
- Punto activo de la línea de tiempo.
- Anillo de foco.

#### H2. Navegación y marca sobre el hero oscuro

La navegación y `.brand-label` utilizaban `#4b5563` sobre un hero oscuro, con contraste aproximado de **2.48:1**. Esto dificultaba la lectura de elementos pequeños en la parte superior de la página.

#### H3. Riesgo de overflow en móvil

En una comprobación inicial, la cita destacada podía producir un ancho de contenido superior al viewport móvil.

### Medio

#### M1. Áreas táctiles pequeñas en el footer

Los enlaces “Volver a CR7” e “Ir al dashboard” tenían una superficie de interacción demasiado pequeña para uso táctil cómodo.

#### M2. Anuncio ARIA redundante

El `tabpanel` utilizaba `aria-live="polite"` además de actualizarse mediante la interacción de tabs. Esto podía duplicar anuncios en lectores de pantalla.

#### M3. Uso decorativo de `<em>`

Algunos encabezados usaban `<em>` solamente para aplicar color, añadiendo énfasis semántico innecesario para lectores de pantalla.

## 4. Correcciones aplicadas

- Se creó `--gold-dark: #8a5b00` para textos pequeños sobre fondos claros.
- El contraste de `--gold-dark` sobre el fondo claro quedó en **5.42:1**.
- Se utilizó `--sky-dark: #16467a` para el foco y el punto activo de la línea de tiempo.
- El contraste de `--sky-dark` sobre el fondo claro quedó en **8.85:1**.
- La navegación y la marca superior ahora usan colores claros sobre el hero oscuro.
- Los enlaces del footer ahora tienen `min-height: 24px` y padding táctil.
- Se eliminó el `aria-live` redundante del panel de trayectoria.
- Los elementos decorativos de color pasaron de `<em>` a `span.accent`.
- La cita destacada usa `overflow-wrap: anywhere` para evitar overflow horizontal.

## 5. Aspectos correctos

- La página tiene `lang="es"`, título y meta descripción propios.
- Incluye tres fotografías reales de Wikimedia Commons.
- Las imágenes tienen textos alternativos descriptivos y únicos.
- El menú móvil utiliza `aria-expanded`, `aria-controls` y cierre con Escape.
- La línea de tiempo implementa `role="tablist"`, `role="tab"` y `role="tabpanel"`.
- La navegación de tabs funciona con flechas, Home, End, Enter y Espacio.
- El foco se mueve correctamente al cambiar de etapa.
- La página incluye skip link y soporte de `prefers-reduced-motion`.
- La página enlaza con CR7 y con el dashboard de observabilidad.
- `node --check messi.js` no reporta errores.
- Los diagnósticos de HTML, CSS y JavaScript no reportan errores.

## 6. Validación posterior

| Prueba | Resultado |
|---|---|
| `node --check messi.js` | Aprobada |
| `node --check script.js` | Aprobada |
| Diagnósticos de VS Code | Sin errores |
| Tres imágenes en `messi.html` | Confirmadas |
| Carga local de `messi.html` | HTTP 200 |
| Tab 2022 con teclado | Aprobada |
| Viewport móvil | `scrollWidth` igual a `clientWidth` |
| Contraste `--gold-dark` / fondo | 5.42:1 |
| Contraste `--sky-dark` / fondo | 8.85:1 |
| Enlaces a CR7 y dashboard | Confirmados |

## 7. Publicación

La versión auditada y corregida se publicó con:

```text
Commit: 86baf1c
Etiqueta: v2.0.0
Rama de despliegue: gh-pages
```

La página publicada está disponible en:

[https://marcosbenjamin44.github.io/ejemplo1/messi.html](https://marcosbenjamin44.github.io/ejemplo1/messi.html)

## 8. Limitaciones

- No se ejecutó una prueba completa con lectores de pantalla de varios sistemas operativos.
- Las imágenes externas dependen de Wikimedia Commons y de la conexión de red.
- La descarga JSON del dashboard requiere una comprobación manual del navegador.
- Las métricas de rendimiento dependen del dispositivo y la red donde se cargue la página.

**Conclusión:** la página de Lionel Messi fue auditada por OpenCode, corregida antes de publicar y validada como parte de la versión `v2.0.0`.
