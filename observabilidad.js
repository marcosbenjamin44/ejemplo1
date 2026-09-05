const statusMessage = document.querySelector("#obs-status-message");
const refreshBtn = document.querySelector("#obs-refresh");
const demoBtn = document.querySelector("#obs-demo");
const downloadBtn = document.querySelector("#obs-download");
const clearBtn = document.querySelector("#obs-clear");

const statusEl = document.querySelector("#obs-status");
const loadEl = document.querySelector("#obs-load");
const errorsEl = document.querySelector("#obs-errors");
const resourceErrorsEl = document.querySelector("#obs-resource-errors");
const interactionsEl = document.querySelector("#obs-interactions");
const visibilityEl = document.querySelector("#obs-visibility");
const viewportEl = document.querySelector("#obs-viewport");
const connectionEl = document.querySelector("#obs-connection");
const apiSupportEl = document.querySelector("#obs-api-support");

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "short",
  timeStyle: "medium"
});

function formatTime(isoString) {
  try {
    return dateFormatter.format(new Date(isoString));
  } catch (error) {
    return isoString || "—";
  }
}

function announce(message) {
  statusMessage.textContent = message;
}

function clearNode(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function renderDefList(node, entries) {
  clearNode(node);
  entries.forEach(([label, value]) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    row.append(dt, dd);
    node.appendChild(row);
  });
}

function renderEmpty(node, message) {
  clearNode(node);
  const empty = document.createElement("p");
  empty.className = "obs-empty";
  empty.textContent = message;
  node.appendChild(empty);
}

function renderList(node, items, formatItem, emptyMessage) {
  if (!items.length) {
    renderEmpty(node, emptyMessage);
    return;
  }
  clearNode(node);

  const count = document.createElement("p");
  count.className = "obs-count";
  count.textContent = String(items.length);
  node.appendChild(count);

  const list = document.createElement("ul");
  list.className = "obs-list";
  items
    .slice()
    .reverse()
    .forEach((item) => {
      const li = document.createElement("li");
      const time = document.createElement("time");
      time.textContent = formatTime(item.timestamp);
      li.appendChild(time);
      const text = document.createElement("span");
      text.textContent = formatItem(item);
      li.appendChild(text);
      list.appendChild(li);
    });
  node.appendChild(list);
}

function renderApiSupport(node, apiSupport) {
  clearNode(node);
  const labels = {
    serviceWorker: "Service Worker",
    localStorage: "localStorage",
    performanceObserver: "PerformanceObserver",
    intersectionObserver: "IntersectionObserver",
    webShare: "Web Share",
    clipboard: "Clipboard API",
    geolocation: "Geolocalización",
    notification: "Notifications API"
  };

  Object.entries(labels).forEach(([key, label]) => {
    const supported = Boolean(apiSupport[key]);
    const li = document.createElement("li");
    li.className = "obs-api-item";
    const name = document.createElement("span");
    name.textContent = label;
    const badge = document.createElement("span");
    badge.className = `obs-api-badge ${supported ? "is-yes" : "is-no"}`;
    badge.textContent = supported ? "Sí" : "No";
    li.append(name, badge);
    node.appendChild(li);
  });
}

function render() {
  if (!window.CR7Observability) {
    announce("La instrumentación de observabilidad no está disponible en esta página.");
    return;
  }

  const snapshot = window.CR7Observability.getSnapshot();

  renderDefList(statusEl, [
    ["Conexión", navigator.onLine ? "En línea" : "Sin conexión"],
    ["Página actual", snapshot.meta.lastPage || location.pathname],
    ["Vistas de página", String(snapshot.meta.pageViews || 0)],
    ["Primera visita", snapshot.meta.firstSeen ? formatTime(snapshot.meta.firstSeen) : "—"],
    ["Última actualización", snapshot.meta.lastUpdated ? formatTime(snapshot.meta.lastUpdated) : "—"]
  ]);

  renderList(
    loadEl,
    snapshot.navigation,
    (entry) =>
      `DOM: ${entry.domContentLoaded}ms · Carga: ${entry.loadEvent}ms · Total: ${entry.duration}ms · ${entry.page}`,
    "Todavía no se registró ninguna carga de página."
  );

  const errorEntries = snapshot.errors
    .map((entry) => ({ ...entry, kind: "Error" }))
    .concat(snapshot.rejections.map((entry) => ({ ...entry, kind: "Promesa rechazada" })))
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  renderList(
    errorsEl,
    errorEntries,
    (entry) => `${entry.kind}: ${entry.message}`,
    "No se han registrado errores ni promesas rechazadas."
  );

  renderList(
    resourceErrorsEl,
    snapshot.resourceErrors,
    (entry) => `${entry.tag}: ${entry.source || "recurso sin URL"}`,
    "No se han registrado errores de recursos."
  );

  renderList(
    interactionsEl,
    snapshot.interactions,
    (entry) => `${entry.tag || "elemento"}${entry.label ? `: ${entry.label}` : ""}`,
    "Todavía no se registraron interacciones."
  );

  renderList(
    visibilityEl,
    snapshot.visibility,
    (entry) => (entry.state === "visible" ? "Pestaña visible" : "Pestaña oculta"),
    "Todavía no se registraron cambios de visibilidad."
  );

  renderDefList(viewportEl, [
    ["Ancho", `${snapshot.viewport.width}px`],
    ["Alto", `${snapshot.viewport.height}px`],
    ["Densidad de píxeles", String(snapshot.viewport.devicePixelRatio)],
    ["Orientación", snapshot.viewport.orientation]
  ]);

  if (snapshot.connection.supported) {
    renderDefList(connectionEl, [
      ["Tipo de red", snapshot.connection.effectiveType || "desconocido"],
      ["Velocidad estimada", snapshot.connection.downlink != null ? `${snapshot.connection.downlink} Mb/s` : "—"],
      ["Latencia (RTT)", snapshot.connection.rtt != null ? `${snapshot.connection.rtt} ms` : "—"],
      ["Modo ahorro de datos", snapshot.connection.saveData ? "Activado" : "Desactivado"]
    ]);
  } else {
    renderEmpty(connectionEl, "El navegador no expone la Network Information API.");
  }

  renderApiSupport(apiSupportEl, snapshot.apiSupport);
}

let renderScheduled = false;
function scheduleRender() {
  if (renderScheduled) return;
  renderScheduled = true;
  window.setTimeout(() => {
    renderScheduled = false;
    render();
  }, 150);
}

refreshBtn.addEventListener("click", () => {
  render();
  announce("Datos actualizados.");
});

demoBtn.addEventListener("click", () => {
  if (window.CR7Observability) {
    window.CR7Observability.recordDemoEvent();
  }
  render();
  announce("Evento de demostración generado.");
});

downloadBtn.addEventListener("click", () => {
  if (!window.CR7Observability) {
    announce("No hay datos disponibles para descargar.");
    return;
  }
  const snapshot = window.CR7Observability.getSnapshot();
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `cr7-observabilidad-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  announce("Snapshot JSON descargado.");
});

clearBtn.addEventListener("click", () => {
  if (window.CR7Observability) {
    window.CR7Observability.clearAll();
  }
  render();
  announce("Almacenamiento local de observabilidad eliminado.");
});

window.addEventListener("cr7:telemetry", scheduleRender);
window.addEventListener("resize", scheduleRender);
window.addEventListener("online", scheduleRender);
window.addEventListener("offline", scheduleRender);

render();
