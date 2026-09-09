(() => {
  "use strict";

  const root = document.querySelector("[data-kitchen-atlas]");
  if (!root) return;

  const dataElement = root.querySelector("#kitchen-atlas-data");
  const mapStage = root.querySelector(".kitchen-map-stage");
  const mapShell = root.querySelector(".kitchen-map-shell");
  const panel = root.querySelector(".kitchen-country-panel");
  const countrySelect = root.querySelector("[data-country-select]");
  const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const mobileQuery = window.matchMedia("(max-width: 767.98px)");

  if (!dataElement || !mapStage || !mapShell || !panel || !countrySelect) return;

  let dishes = JSON.parse(dataElement.textContent || "[]");
  if (typeof dishes === "string") dishes = JSON.parse(dishes);
  if (!Array.isArray(dishes)) return;
  const countries = new Map();
  dishes.forEach((dish) => {
    if (!countries.has(dish.country_code)) {
      countries.set(dish.country_code, { name: dish.country, dishes: [] });
    }
    countries.get(dish.country_code).dishes.push(dish);
  });

  const templates = new Map(
    Array.from(root.querySelectorAll("template[data-country-template]"), (template) => [
      template.dataset.countryTemplate,
      template,
    ]),
  );

  const pathsByCountry = new Map();
  const unlockedPaths = [];
  let activeCountry = null;
  let pinnedCountry = null;
  let lastTrigger = null;

  function pathsFor(countryCode) {
    return pathsByCountry.get(countryCode) || [];
  }

  function setActiveMapState(countryCode) {
    unlockedPaths.forEach((path) => {
      const isActive = path.dataset.countryCode === countryCode;
      path.classList.toggle("is-active", isActive);
      if (isActive) path.setAttribute("aria-current", "true");
      else path.removeAttribute("aria-current");
    });
  }

  function positionPanel(countryCode) {
    panel.classList.remove("is-left", "is-right");
    if (mobileQuery.matches) return;

    const path = pathsFor(countryCode)[0];
    if (!path) {
      panel.classList.add("is-right");
      return;
    }

    const pathBounds = path.getBoundingClientRect();
    const stageBounds = mapStage.getBoundingClientRect();
    const pathCenter = pathBounds.left + pathBounds.width / 2;
    const stageCenter = stageBounds.left + stageBounds.width / 2;
    panel.classList.add(pathCenter > stageCenter ? "is-left" : "is-right");
  }

  function renderCountry(countryCode, trigger = null) {
    const template = templates.get(countryCode);
    const country = countries.get(countryCode);
    if (!template || !country) return;

    activeCountry = countryCode;
    lastTrigger = trigger || lastTrigger;
    panel.replaceChildren(template.content.cloneNode(true));
    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    countrySelect.value = countryCode;
    setActiveMapState(countryCode);
    positionPanel(countryCode);

    const closeButton = panel.querySelector(".kitchen-country-panel__close");
    if (closeButton) {
      closeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        closePanel({ restoreFocus: true });
      });
    }
  }

  function closePanel({ restoreFocus = false } = {}) {
    const focusTarget = lastTrigger;
    activeCountry = null;
    pinnedCountry = null;
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");
    panel.replaceChildren();
    panel.classList.remove("is-left", "is-right");
    countrySelect.value = "";
    setActiveMapState(null);
    if (restoreFocus && focusTarget instanceof Element && typeof focusTarget.focus === "function") {
      focusTarget.focus();
    }
  }

  function pinCountry(countryCode, trigger) {
    pinnedCountry = countryCode;
    renderCountry(countryCode, trigger);
  }

  mapShell.querySelectorAll("[data-country-code]").forEach((path) => {
    const countryCode = path.dataset.countryCode;
    if (!pathsByCountry.has(countryCode)) pathsByCountry.set(countryCode, []);
    pathsByCountry.get(countryCode).push(path);

    const country = countries.get(countryCode);
    if (!country) return;

    unlockedPaths.push(path);
    path.classList.add("is-unlocked");
    path.removeAttribute("aria-hidden");
    path.setAttribute("role", "button");
    path.setAttribute("tabindex", "0");
    path.setAttribute(
      "aria-label",
      `${country.name}, ${country.dishes.length} ${country.dishes.length === 1 ? "dish" : "dishes"}`,
    );

    path.addEventListener("pointerenter", () => {
      if (hoverQuery.matches && !pinnedCountry) renderCountry(countryCode, path);
    });

    path.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      pinCountry(countryCode, path);
    });

    path.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        pinCountry(countryCode, path);
      } else if (event.key === "Escape") {
        event.preventDefault();
        closePanel({ restoreFocus: true });
      }
    });
  });

  mapStage.addEventListener("pointerleave", () => {
    if (hoverQuery.matches && !pinnedCountry) closePanel();
  });

  mapShell.addEventListener("click", (event) => {
    if (!event.target.closest(".kitchen-map-country.is-unlocked")) closePanel();
  });

  countrySelect.addEventListener("change", () => {
    if (!countrySelect.value) {
      closePanel();
      return;
    }
    pinCountry(countrySelect.value, countrySelect);
    if (mobileQuery.matches) {
      window.requestAnimationFrame(() => panel.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (!activeCountry) return;
    const target = event.target;
    if (
      target.closest(".kitchen-map-shell") ||
      target.closest(".kitchen-country-panel") ||
      target.closest(".kitchen-country-control")
    ) {
      return;
    }
    closePanel();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeCountry) closePanel({ restoreFocus: true });
  });

  window.addEventListener("resize", () => {
    if (activeCountry) positionPanel(activeCountry);
  });

  root.dataset.ready = "true";
})();
