const messiMilestones = {
  2004: {
    number: "01",
    label: "El comienzo",
    title: "El niño de La Masia",
    copy: "Con 13 años llegó desde Rosario para tratar un problema de crecimiento y quedarse para siempre. En Barcelona encontró un club, un estilo de juego y una casa."
  },
  2021: {
    number: "02",
    label: "El primer título mayor",
    title: "La Copa América en Brasil",
    copy: "Tras varias finales perdidas con la selección, levantó su primer trofeo absoluto con Argentina en el Maracaná, en la casa de su eterno rival."
  },
  2022: {
    number: "03",
    label: "La consagración",
    title: "Campeón del Mundo en Qatar",
    copy: "La final más recordada del fútbol moderno cerró el capítulo que le faltaba: la Copa del Mundo, sosteniendo la camiseta número diez de Argentina."
  },
  2023: {
    number: "04",
    label: "El siguiente capítulo",
    title: "Una nueva aventura en Miami",
    copy: "El desembarco en la MLS con el Inter Miami abrió una etapa distinta: acercar su magia a un público nuevo sin perder la ambición de siempre."
  }
};

const messiTimelineList = document.querySelector(".messi-timeline");
const messiTimelineItems = Array.from(document.querySelectorAll(".messi-timeline-item"));
const messiDetailNumber = document.querySelector(".messi-detail-number");
const messiDetailLabel = document.querySelector(".messi-detail-label");
const messiDetailTitle = document.querySelector("#messi-milestone-title");
const messiDetailCopy = document.querySelector("#messi-milestone-copy");
const messiMilestonePanel = document.querySelector("#messi-milestone-panel");

if (messiTimelineList && messiTimelineItems.length) {
  const selectMessiMilestone = (item, { moveFocus = false } = {}) => {
    const milestone = messiMilestones[item.dataset.year];

    messiTimelineItems.forEach((timelineItem) => {
      const selected = timelineItem === item;
      timelineItem.classList.toggle("active", selected);
      timelineItem.setAttribute("aria-selected", String(selected));
      timelineItem.tabIndex = selected ? 0 : -1;
    });

    messiDetailNumber.textContent = milestone.number;
    messiDetailLabel.textContent = milestone.label;
    messiDetailTitle.textContent = milestone.title;
    messiDetailCopy.textContent = milestone.copy;
    messiMilestonePanel.setAttribute("aria-labelledby", item.id);

    if (moveFocus) item.focus();
  };

  messiTimelineItems.forEach((item) => {
    item.addEventListener("click", () => selectMessiMilestone(item));
  });

  messiTimelineList.addEventListener("keydown", (event) => {
    const currentIndex = messiTimelineItems.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let targetIndex = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        targetIndex = (currentIndex + 1) % messiTimelineItems.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        targetIndex = (currentIndex - 1 + messiTimelineItems.length) % messiTimelineItems.length;
        break;
      case "Home":
        targetIndex = 0;
        break;
      case "End":
        targetIndex = messiTimelineItems.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectMessiMilestone(messiTimelineItems[targetIndex], { moveFocus: true });
  });
}
