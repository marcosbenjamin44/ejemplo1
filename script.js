const milestones = {
  2003: {
    number: "01",
    label: "El comienzo",
    title: "La promesa de Old Trafford",
    copy: "Con 18 años, llegó a Manchester y transformó su potencial en una disciplina feroz. El número 7 dejó de ser una camiseta: se convirtió en una responsabilidad."
  },
  2009: {
    number: "02",
    label: "La consagración",
    title: "El nuevo dueño del Bernabéu",
    copy: "El traspaso más caro de la historia del fútbol abrió una década de récords, noches europeas y una rivalidad que definió una generación."
  },
  2018: {
    number: "03",
    label: "El desafío",
    title: "La precisión también viaja",
    copy: "En Turín comenzó otra reinvención. Cambió el escenario, pero no el hábito: competir por todo, adaptarse rápido y marcar la diferencia."
  },
  2023: {
    number: "04",
    label: "El siguiente capítulo",
    title: "Una influencia sin fronteras",
    copy: "Al-Nassr representa una nueva etapa de alcance global. La camiseta cambia; la ambición, la rutina y el impacto permanecen."
  }
};

const timelineList = document.querySelector(".timeline");
const timelineItems = Array.from(document.querySelectorAll(".timeline-item"));
const detailNumber = document.querySelector(".detail-number");
const detailLabel = document.querySelector(".detail-label");
const detailTitle = document.querySelector("#milestone-title");
const detailCopy = document.querySelector("#milestone-copy");
const milestonePanel = document.querySelector("#milestone-panel");

if (timelineList && timelineItems.length) {
  const selectMilestone = (item, { moveFocus = false } = {}) => {
    const milestone = milestones[item.dataset.year];

    timelineItems.forEach((timelineItem) => {
      const selected = timelineItem === item;
      timelineItem.classList.toggle("active", selected);
      timelineItem.setAttribute("aria-selected", String(selected));
      timelineItem.tabIndex = selected ? 0 : -1;
    });

    detailNumber.textContent = milestone.number;
    detailLabel.textContent = milestone.label;
    detailTitle.textContent = milestone.title;
    detailCopy.textContent = milestone.copy;
    milestonePanel.setAttribute("aria-labelledby", item.id);

    if (moveFocus) item.focus();
  };

  timelineItems.forEach((item) => {
    item.addEventListener("click", () => selectMilestone(item));
  });

  timelineList.addEventListener("keydown", (event) => {
    const currentIndex = timelineItems.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let targetIndex = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        targetIndex = (currentIndex + 1) % timelineItems.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        targetIndex = (currentIndex - 1 + timelineItems.length) % timelineItems.length;
        break;
      case "Home":
        targetIndex = 0;
        break;
      case "End":
        targetIndex = timelineItems.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectMilestone(timelineItems[targetIndex], { moveFocus: true });
  });
}

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#main-nav");

if (navToggle && mainNav) {
  const closeNav = () => {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
  };

  const toggleNav = () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  };

  navToggle.addEventListener("click", toggleNav);

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeNav();
      navToggle.focus();
    }
  });
}

/* ------------------------------------------------------------------ */
/* Observabilidad: instrumentación ligera sin dependencias externas.   */
/* Persiste en localStorage bajo el prefijo "cr7-observability" y      */
/* expone window.CR7Observability para el panel observabilidad.html.   */
/* ------------------------------------------------------------------ */
(function initObservability() {
  const PREFIX = "cr7-observability";
  const MAX_ENTRIES = 25;

  const key = (name) => `${PREFIX}:${name}`;
  const nowISO = () => new Date().toISOString();

  const safeGet = (storageKey) => {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  };

  const safeSet = (storageKey, value) => {
    try {
      localStorage.setItem(storageKey, value);
    } catch (error) {
      /* almacenamiento no disponible (modo privado, cuota, etc.) */
    }
  };

  const readList = (name) => {
    try {
      const parsed = JSON.parse(safeGet(key(name)));
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  };

  const appendEntry = (name, entry, max = MAX_ENTRIES) => {
    const list = readList(name).concat(entry).slice(-max);
    safeSet(key(name), JSON.stringify(list));
    return list;
  };

  const readMeta = () => {
    try {
      const parsed = JSON.parse(safeGet(key("meta")));
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      return {};
    }
  };

  const writeMeta = (patch) => {
    const merged = Object.assign({}, readMeta(), patch, { lastUpdated: nowISO() });
    safeSet(key("meta"), JSON.stringify(merged));
    return merged;
  };

  const emit = (type, detail) => {
    try {
      window.dispatchEvent(
        new CustomEvent("cr7:telemetry", {
          detail: Object.assign({ type, timestamp: nowISO() }, detail)
        })
      );
    } catch (error) {
      /* CustomEvent no disponible en entornos muy antiguos */
    }
  };

  const testLocalStorage = () => {
    try {
      const probe = key("__probe__");
      localStorage.setItem(probe, "1");
      localStorage.removeItem(probe);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getConnectionInfo = () => {
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection) return { supported: false };
    return {
      supported: true,
      effectiveType: connection.effectiveType || null,
      downlink: typeof connection.downlink === "number" ? connection.downlink : null,
      rtt: typeof connection.rtt === "number" ? connection.rtt : null,
      saveData: Boolean(connection.saveData)
    };
  };

  const getApiSupport = () => ({
    serviceWorker: "serviceWorker" in navigator,
    localStorage: testLocalStorage(),
    performanceObserver: typeof window.PerformanceObserver !== "undefined",
    intersectionObserver: typeof window.IntersectionObserver !== "undefined",
    webShare: typeof navigator.share === "function",
    clipboard: Boolean(navigator.clipboard && navigator.clipboard.writeText),
    geolocation: "geolocation" in navigator,
    notification: typeof window.Notification !== "undefined"
  });

  const getViewportInfo = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1,
    orientation:
      (screen.orientation && screen.orientation.type) ||
      (window.innerWidth >= window.innerHeight ? "landscape" : "portrait")
  });

  /* --- sesión y vistas de página --- */
  (function trackPageView() {
    const meta = readMeta();
    writeMeta({
      firstSeen: meta.firstSeen || nowISO(),
      pageViews: (meta.pageViews || 0) + 1,
      lastPage: location.pathname,
      online: navigator.onLine
    });
    emit("pageview", { page: location.pathname });
  })();

  /* --- errores JS y errores de recursos (fase de captura) --- */
  window.addEventListener(
    "error",
    (event) => {
      const target = event.target;
      const isResourceError =
        target &&
        target !== window &&
        typeof target.tagName === "string" &&
        ["IMG", "SCRIPT", "LINK"].includes(target.tagName);

      if (isResourceError) {
        const entry = {
          timestamp: nowISO(),
          tag: target.tagName,
          source: target.currentSrc || target.src || target.href || "",
          page: location.pathname
        };
        appendEntry("resource-errors", entry);
        emit("resource-error", entry);
        return;
      }

      const entry = {
        timestamp: nowISO(),
        message: event.message || "Error desconocido",
        source: event.filename || "",
        line: event.lineno || 0,
        column: event.colno || 0,
        page: location.pathname
      };
      appendEntry("errors", entry);
      emit("error", entry);
    },
    true
  );

  /* --- promesas rechazadas sin gestionar --- */
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const entry = {
      timestamp: nowISO(),
      message: reason && reason.message ? reason.message : String(reason),
      page: location.pathname
    };
    appendEntry("rejections", entry);
    emit("rejection", entry);
  });

  /* --- interacciones (clicks) --- */
  document.addEventListener(
    "click",
    (event) => {
      const control =
        typeof event.target.closest === "function"
          ? event.target.closest("a, button")
          : null;
      const label = control
        ? control.getAttribute("aria-label") || control.textContent.trim().slice(0, 60)
        : "";
      const entry = {
        timestamp: nowISO(),
        tag: (control ? control.tagName : event.target.tagName || "").toLowerCase(),
        label,
        page: location.pathname
      };
      appendEntry("interactions", entry);
      emit("interaction", entry);
    },
    true
  );

  /* --- visibilidad de la pestaña --- */
  document.addEventListener("visibilitychange", () => {
    const entry = {
      timestamp: nowISO(),
      state: document.visibilityState,
      page: location.pathname
    };
    appendEntry("visibility", entry);
    emit("visibility", entry);
  });

  /* --- conexión online/offline --- */
  window.addEventListener("online", () => {
    writeMeta({ online: true });
    emit("connection", { online: true });
  });
  window.addEventListener("offline", () => {
    writeMeta({ online: false });
    emit("connection", { online: false });
  });

  /* --- tiempo de carga (PerformanceNavigationTiming) --- */
  window.addEventListener("load", () => {
    try {
      const [nav] = performance.getEntriesByType("navigation");
      if (!nav) return;
      const entry = {
        timestamp: nowISO(),
        page: location.pathname,
        type: nav.type,
        responseStart: Math.round(nav.responseStart),
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
        loadEvent: Math.round(nav.loadEventEnd),
        duration: Math.round(nav.duration),
        transferSize: nav.transferSize || 0
      };
      appendEntry("navigation", entry);
      emit("navigation", entry);
    } catch (error) {
      /* Performance API no disponible */
    }
  });

  /* --- evento de demostración manual --- */
  const recordDemoEvent = () => {
    const entry = {
      timestamp: nowISO(),
      message: "Evento de demostración generado manualmente",
      page: location.pathname
    };
    appendEntry("demo", entry);
    emit("demo", entry);
    return entry;
  };

  const clearAll = () => {
    try {
      Object.keys(localStorage)
        .filter((storageKey) => storageKey.startsWith(PREFIX))
        .forEach((storageKey) => localStorage.removeItem(storageKey));
    } catch (error) {
      /* almacenamiento no disponible */
    }
    emit("clear", {});
  };

  const getSnapshot = () => ({
    generatedAt: nowISO(),
    meta: readMeta(),
    errors: readList("errors"),
    rejections: readList("rejections"),
    resourceErrors: readList("resource-errors"),
    interactions: readList("interactions"),
    visibility: readList("visibility"),
    navigation: readList("navigation"),
    demo: readList("demo"),
    connection: getConnectionInfo(),
    viewport: getViewportInfo(),
    apiSupport: getApiSupport()
  });

  window.CR7Observability = { getSnapshot, recordDemoEvent, clearAll };
})();
