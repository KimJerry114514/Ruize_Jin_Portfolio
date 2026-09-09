(() => {
  "use strict";

  const script = document.currentScript;
  const acceptImage = script?.dataset.cookieAcceptImage;
  const rejectImage = script?.dataset.cookieRejectImage;
  const storageKey = "cookie-easter-egg-seen";
  const transitionDuration = 170;

  if (!acceptImage || !rejectImage) {
    return;
  }

  const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const hasBeenSeen = () => {
    try {
      return window.localStorage.getItem(storageKey) === "true";
    } catch (_error) {
      return false;
    }
  };

  const markAsSeen = () => {
    try {
      window.localStorage.setItem(storageKey, "true");
    } catch (_error) {
      // The easter egg still works when localStorage is unavailable.
    }
  };

  const initialize = () => {
    const popup = createElement("section", "cookie-easter-egg");
    const content = createElement("div", "cookie-easter-egg__content");
    let previousFocus = null;
    let transitionTimer = null;

    popup.id = "cookie-easter-egg";
    popup.hidden = true;
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-modal", "false");
    popup.setAttribute("aria-labelledby", "cookie-easter-egg-title");
    popup.setAttribute("aria-live", "polite");
    popup.append(content);
    document.body.append(popup);

    const show = (trigger) => {
      previousFocus = trigger || null;
      popup.hidden = false;
      window.requestAnimationFrame(() => popup.classList.add("is-visible"));
    };

    const close = () => {
      popup.classList.remove("is-visible");
      window.setTimeout(() => {
        popup.hidden = true;
        if (previousFocus?.isConnected) previousFocus.focus();
      }, transitionDuration);
    };

    const makeButton = (label, className, handler) => {
      const button = createElement("button", className, label);
      button.type = "button";
      button.addEventListener("click", handler);
      return button;
    };

    const replaceContent = (render) => {
      if (transitionTimer) window.clearTimeout(transitionTimer);
      content.classList.add("is-changing");
      transitionTimer = window.setTimeout(() => {
        content.replaceChildren(render());
        content.classList.remove("is-changing");
        transitionTimer = null;
      }, transitionDuration);
    };

    const renderResult = (choice) => {
      const fragment = document.createDocumentFragment();
      const image = document.createElement("img");
      const heading = createElement(
        "h2",
        "cookie-easter-egg__title cookie-easter-egg__result-title",
        choice === "accept" ? "Here's your cookies." : "No cookies for you."
      );
      const message = createElement(
        "p",
        "cookie-easter-egg__message cookie-easter-egg__result-message",
        choice === "accept" ? "Enjoy. 🍪" : "The puppy got there first."
      );
      const closeButton = makeButton(
        "Close",
        "cookie-easter-egg__button cookie-easter-egg__button--primary cookie-easter-egg__close",
        close
      );

      image.className = "cookie-easter-egg__image";
      image.src = choice === "accept" ? acceptImage : rejectImage;
      image.alt = choice === "accept" ? "Assorted gingerbread cookies" : "Happy puppy holding a cookie";
      image.width = choice === "accept" ? 1200 : 626;
      image.height = choice === "accept" ? 1800 : 417;

      heading.id = "cookie-easter-egg-title";
      fragment.append(image, heading, message, closeButton);
      window.requestAnimationFrame(() => closeButton.focus());
      return fragment;
    };

    const choose = (choice) => {
      markAsSeen();
      replaceContent(() => renderResult(choice));
    };

    const renderInitial = () => {
      const fragment = document.createDocumentFragment();
      const heading = createElement("h2", "cookie-easter-egg__title", "Cookie preferences");
      const message = createElement(
        "p",
        "cookie-easter-egg__message",
        "We use cookies to improve your experience on this site."
      );
      const actions = createElement("div", "cookie-easter-egg__actions");
      const disclosure = createElement(
        "p",
        "cookie-easter-egg__disclosure",
        "No advertising or tracking cookies are used."
      );
      const acceptButton = makeButton(
        "Accept all cookies",
        "cookie-easter-egg__button cookie-easter-egg__button--primary",
        () => choose("accept")
      );
      const rejectButton = makeButton(
        "Reject non-essential",
        "cookie-easter-egg__button cookie-easter-egg__button--secondary",
        () => choose("reject")
      );

      heading.id = "cookie-easter-egg-title";
      actions.append(acceptButton, rejectButton);
      fragment.append(heading, message, actions, disclosure);
      content.replaceChildren(fragment);
      content.classList.remove("is-changing");
    };

    const replay = (trigger) => {
      if (transitionTimer) {
        window.clearTimeout(transitionTimer);
        transitionTimer = null;
      }
      renderInitial();
      show(trigger);
    };

    renderInitial();

    const footerLinks = document.querySelector(".footer_links .navbar-nav");
    if (footerLinks) {
      const item = createElement("li", "nav-item cookie-easter-egg__replay-item");
      const button = makeButton("Cookies", "nav-link cookie-easter-egg__replay", () => replay(button));
      item.append(button);
      footerLinks.append(item);
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !popup.hidden) close();
    });

    if (!hasBeenSeen()) {
      window.setTimeout(() => show(null), 700);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
