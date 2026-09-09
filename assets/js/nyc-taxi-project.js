(() => {
  "use strict";

  const script = document.currentScript;
  const apiBase = script?.dataset.nycTaxiApiBase || "https://nyc-taxi-mobility-94622883081.us-east1.run.app";
  const localHosts = new Set(["localhost", "127.0.0.1"]);
  const productionHosts = new Set(["ruizejin.com", "www.ruizejin.com"]);
  const isLocal = localHosts.has(window.location.hostname);
  const useFixture = !productionHosts.has(window.location.hostname);

  const fixturePlaces = [
    {
      place_id: "ChIJmQJIxlVYwokRLgeuocVOGVU",
      display_text: "Times Square, New York, Manhattan, NY, USA",
      search_text: "times square times sq theatre district manhattan"
    },
    {
      place_id: "ChIJR0lA1VBmwokR8BGfSBOyT-w",
      display_text: "John F. Kennedy International Airport, Jamaica, Queens, NY, USA",
      search_text: "john f kennedy international airport jfk jamaica queens"
    }
  ];

  const fixturePrediction = {
    app_version: "1.1.0",
    pickup: {
      place_id: "ChIJmQJIxlVYwokRLgeuocVOGVU",
      display_name: "Times Square",
      formatted_address: "Manhattan, NY 10036, USA",
      latitude: 40.7579747,
      longitude: -73.9855426,
      provider: "google",
      attribution: "Google Maps",
      coordinates_from_cache: false,
      attributions: [],
      taxi_zone_id: 230,
      taxi_zone: "Times Sq/Theatre District",
      borough: "Manhattan",
      service_zone: "Yellow Zone",
      zone_match: "interior"
    },
    dropoff: {
      place_id: "ChIJR0lA1VBmwokR8BGfSBOyT-w",
      display_name: "John F. Kennedy International Airport",
      formatted_address: "Jamaica, NY 11430, USA",
      latitude: 40.6446161,
      longitude: -73.7797222,
      provider: "google",
      attribution: "Google Maps",
      coordinates_from_cache: false,
      attributions: [],
      taxi_zone_id: 132,
      taxi_zone: "JFK Airport",
      borough: "Queens",
      service_zone: "Airports",
      zone_match: "interior"
    },
    departure_datetime: "2026-09-18T18:30:00-04:00",
    prediction: {
      duration_minutes: 57.68,
      duration_empirical_range_minutes: [51.64, 66.32],
      estimated_pre_tip_cost: 86.72,
      cost_empirical_range: [82.06, 93.88],
      model_version: "v1",
      data_cutoff: "2025-04-30",
      semantics: "Frozen NYC TLC v1 prediction; zone/time based."
    },
    route_display: {
      distance_miles: 15.406,
      google_route_duration_minutes: 49.383,
      polyline: "",
      provider: "google",
      routing_preference: "TRAFFIC_AWARE",
      departure_datetime: "2026-09-18T18:30:00-04:00",
      attribution: "Google Maps",
      semantics: "External routing reference only; not a frozen v1 model input."
    },
    warnings: []
  };

  class ProductError extends Error {
    constructor(code) {
      super(code);
      this.name = "ProductError";
      this.code = code;
    }
  }

  const delay = (milliseconds, signal) => new Promise((resolve, reject) => {
    const timer = window.setTimeout(resolve, milliseconds);
    signal?.addEventListener("abort", () => {
      window.clearTimeout(timer);
      reject(new DOMException("Request aborted", "AbortError"));
    }, { once: true });
  });

  const createSessionToken = () => {
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
    return `taxi_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`.slice(0, 36);
  };

  const formatNumber = (value, digits = 2) => Number(value).toFixed(digits);
  const formatCurrency = (value) => `$${formatNumber(value, 2)}`;

  const newYorkParts = (date) => {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23"
    });
    return Object.fromEntries(
      formatter.formatToParts(date)
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, part.value])
    );
  };

  const formatNewYorkLocal = (date) => {
    const parts = newYorkParts(date);
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };

  const toNewYorkIso = (localValue) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(localValue);
    if (!match) {
      throw new ProductError("invalid_datetime");
    }

    const [, year, month, day, hour, minute] = match;
    const wallTimeAsUtc = Date.UTC(
      Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), 0
    );
    const zoneParts = newYorkParts(new Date(wallTimeAsUtc));
    const renderedAsUtc = Date.UTC(
      Number(zoneParts.year), Number(zoneParts.month) - 1, Number(zoneParts.day),
      Number(zoneParts.hour), Number(zoneParts.minute), Number(zoneParts.second)
    );
    const offsetMinutes = Math.round((renderedAsUtc - wallTimeAsUtc) / 60000);
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const absoluteOffset = Math.abs(offsetMinutes);
    const offsetHours = String(Math.floor(absoluteOffset / 60)).padStart(2, "0");
    const offsetRemainder = String(absoluteOffset % 60).padStart(2, "0");
    return `${localValue}:00${sign}${offsetHours}:${offsetRemainder}`;
  };

  const parseErrorCode = async (response) => {
    try {
      const payload = await response.json();
      return payload?.error?.code || "service_unavailable";
    } catch {
      return "service_unavailable";
    }
  };

  const fetchJson = async (url, options, controller, timeoutMs) => {
    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeoutMs);

    try {
      const response = await window.fetch(url, { ...options, signal: controller.signal });
      if (!response.ok) {
        throw new ProductError(await parseErrorCode(response));
      }
      return await response.json();
    } catch (error) {
      if (error.name === "AbortError" && timedOut) {
        throw new ProductError("network_timeout");
      }
      throw error;
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const localAutocomplete = async (query, signal) => {
    await delay(260, signal);
    const normalized = query.trim().toLowerCase();
    const suggestions = fixturePlaces
      .filter((place) => place.search_text.includes(normalized) || place.display_text.toLowerCase().includes(normalized))
      .slice(0, 5)
      .map(({ place_id, display_text }) => ({ place_id, display_text }));
    return { suggestions, provider: "google", attribution: "Google Maps" };
  };

  const productionAutocomplete = async (query, sessionToken, controller) => {
    const params = new URLSearchParams({ q: query, session_token: sessionToken });
    return fetchJson(`${apiBase}/places/autocomplete?${params.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" }
    }, controller, 12000);
  };

  const localPredict = async (payload, signal) => {
    await delay(900, signal);
    if (
      payload.pickup_place_id !== fixturePrediction.pickup.place_id ||
      payload.dropoff_place_id !== fixturePrediction.dropoff.place_id
    ) {
      throw new ProductError("local_fixture_route");
    }
    return {
      ...fixturePrediction,
      departure_datetime: payload.departure_datetime,
      route_display: {
        ...fixturePrediction.route_display,
        departure_datetime: payload.departure_datetime
      }
    };
  };

  const productionPredict = async (payload, controller) => fetchJson(`${apiBase}/predict-address`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }, controller, 35000);

  const friendlyError = (code) => {
    const messages = {
      incomplete_location: "Select both locations from the suggestion lists before predicting.",
      invalid_datetime: "Choose a valid departure date and time.",
      departure_in_past: "Choose a departure time in the future.",
      route_departure_in_past: "Choose a departure time in the future.",
      invalid_input: "Check the selected locations and departure time, then try again.",
      invalid_location: "Select a valid pickup and destination from the suggestion lists.",
      location_not_found: "One of those locations could not be resolved. Clear it and select another suggestion.",
      outside_supported_area: "That trip falls outside the supported NYC Yellow Taxi area.",
      ambiguous_zone_boundary: "One location falls on an ambiguous taxi-zone boundary. Try a nearby address.",
      google_unavailable: "The location service is temporarily unavailable. Please try again later.",
      google_invalid_response: "The location service returned an unusable response. Please try again later.",
      google_auth_error: "The location service is temporarily unavailable. Please try again later.",
      google_quota_error: "The location service has reached its current request limit. Please try again later.",
      request_rate_limited: "Too many requests were made in a short period. Pause briefly before trying again.",
      model_unavailable: "The prediction model is temporarily unavailable. Please try again later.",
      zone_assets_unavailable: "Taxi-zone mapping is temporarily unavailable. Please try again later.",
      route_not_found: "A prediction was available, but route context could not be found for this trip.",
      routing_unavailable: "Google route context is temporarily unavailable. Please try again later.",
      google_timeout: "The location or route service took too long to respond. Please try again.",
      network_timeout: "The request took too long to complete. Please try again.",
      request_cancelled: "Prediction canceled. Your selections are still available.",
      local_fixture_route: "The local preview fixture currently supports Times Square to JFK Airport. Update the selections and try again.",
      service_unavailable: "The trip could not be predicted right now. Please try again later."
    };
    return messages[code] || messages.service_unavailable;
  };

  const init = () => {
    const root = document.querySelector("[data-nyc-taxi-demo]");
    if (!root) return;

    const form = root.querySelector("[data-taxi-form]");
    const departureInput = form.elements.departure;
    const submitButton = root.querySelector("[data-submit]");
    const cancelButton = root.querySelector("[data-cancel]");
    const loadingMessage = root.querySelector("[data-loading]");
    const errorBox = root.querySelector("[data-form-error]");
    const results = root.querySelector("[data-results]");
    const resetButton = root.querySelector("[data-reset]");
    const fieldStates = {};
    let predictionController = null;
    let cancelledByUser = false;

    if (isLocal) {
      root.querySelector("[data-local-note]").hidden = false;
    }

    const minimumDate = new Date(Date.now() + 5 * 60 * 1000);
    departureInput.min = formatNewYorkLocal(minimumDate);
    const approvedFixtureTime = "2026-09-18T18:30";
    const approvedFixtureIso = toNewYorkIso(approvedFixtureTime);
    departureInput.value = Date.parse(approvedFixtureIso) > Date.now()
      ? approvedFixtureTime
      : formatNewYorkLocal(new Date(Date.now() + 24 * 60 * 60 * 1000));

    const setError = (code) => {
      errorBox.textContent = friendlyError(code);
      errorBox.hidden = false;
    };

    const clearError = () => {
      errorBox.hidden = true;
      errorBox.textContent = "";
    };

    const setLoading = (loading) => {
      root.setAttribute("aria-busy", String(loading));
      submitButton.disabled = loading;
      cancelButton.hidden = !loading;
      loadingMessage.hidden = !loading;
    };

    const closeSuggestions = (state) => {
      state.suggestions.hidden = true;
      state.suggestions.replaceChildren();
      state.input.setAttribute("aria-expanded", "false");
      state.input.removeAttribute("aria-activedescendant");
      state.items = [];
      state.highlighted = -1;
    };

    const setHighlight = (state, index) => {
      if (!state.items.length) return;
      state.highlighted = (index + state.items.length) % state.items.length;
      state.items.forEach((button, itemIndex) => {
        button.setAttribute("aria-selected", String(itemIndex === state.highlighted));
      });
      const active = state.items[state.highlighted];
      state.input.setAttribute("aria-activedescendant", active.id);
      active.scrollIntoView({ block: "nearest" });
    };

    const selectSuggestion = (state, suggestion) => {
      state.selected = suggestion;
      state.input.value = suggestion.display_text;
      state.input.setAttribute("aria-invalid", "false");
      state.clear.hidden = false;
      state.status.textContent = `Selected: ${suggestion.display_text}`;
      closeSuggestions(state);
      clearError();
    };

    const renderSuggestions = (state, payload) => {
      closeSuggestions(state);
      const suggestions = Array.isArray(payload.suggestions) ? payload.suggestions.slice(0, 5) : [];
      if (!suggestions.length) {
        state.status.textContent = "No matching locations found. Try a more specific query.";
        return;
      }

      suggestions.forEach((suggestion, index) => {
        const item = document.createElement("li");
        item.setAttribute("role", "presentation");
        const button = document.createElement("button");
        button.type = "button";
        button.id = `${state.input.id}-option-${index}`;
        button.setAttribute("role", "option");
        button.setAttribute("aria-selected", "false");
        button.textContent = suggestion.display_text;
        button.addEventListener("pointerdown", (event) => event.preventDefault());
        button.addEventListener("click", () => selectSuggestion(state, suggestion));
        item.appendChild(button);
        state.suggestions.appendChild(item);
        state.items.push(button);
      });

      if (payload.attribution) {
        const attributionItem = document.createElement("li");
        attributionItem.setAttribute("role", "presentation");
        const attribution = document.createElement("span");
        attribution.className = "nyc-taxi-project__suggestions-attribution";
        attribution.textContent = `Suggestions: ${payload.attribution}`;
        attributionItem.appendChild(attribution);
        state.suggestions.appendChild(attributionItem);
      }

      state.suggestions.hidden = false;
      state.input.setAttribute("aria-expanded", "true");
      state.status.textContent = `${suggestions.length} suggestion${suggestions.length === 1 ? "" : "s"} available. Select one to continue.`;
    };

    const runAutocomplete = async (state, query, requestId) => {
      state.controller?.abort();
      const controller = new AbortController();
      state.controller = controller;
      state.status.textContent = "Loading suggestions…";
      try {
        const payload = useFixture
          ? await localAutocomplete(query, controller.signal)
          : await productionAutocomplete(query, state.sessionToken, controller);
        if (requestId !== state.requestId || controller.signal.aborted) return;
        renderSuggestions(state, payload);
      } catch (error) {
        if (error.name === "AbortError") return;
        if (requestId !== state.requestId) return;
        closeSuggestions(state);
        state.status.textContent = friendlyError(error.code || "service_unavailable");
      }
    };

    root.querySelectorAll("[data-autocomplete]").forEach((field) => {
      const kind = field.dataset.autocomplete;
      const input = field.querySelector("input");
      const suggestions = field.querySelector("[data-suggestions]");
      const status = field.querySelector("[data-field-status]");
      const clear = field.querySelector("[data-clear]");
      const state = {
        kind,
        input,
        suggestions,
        status,
        clear,
        selected: null,
        sessionToken: createSessionToken(),
        controller: null,
        debounceTimer: null,
        requestId: 0,
        highlighted: -1,
        items: []
      };
      fieldStates[kind] = state;

      input.addEventListener("input", () => {
        window.clearTimeout(state.debounceTimer);
        state.controller?.abort();
        state.requestId += 1;
        if (state.selected) {
          state.selected = null;
          state.sessionToken = createSessionToken();
        }
        clear.hidden = true;
        input.setAttribute("aria-invalid", "false");
        closeSuggestions(state);
        clearError();
        const query = input.value.trim();
        if (query.length < 2) {
          status.textContent = "Type at least two characters, then select a suggestion.";
          return;
        }
        const requestId = state.requestId;
        state.debounceTimer = window.setTimeout(() => runAutocomplete(state, query, requestId), 320);
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeSuggestions(state);
          return;
        }
        if (state.suggestions.hidden || !state.items.length) return;
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setHighlight(state, state.highlighted + 1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setHighlight(state, state.highlighted - 1);
        } else if (event.key === "Enter" && state.highlighted >= 0) {
          event.preventDefault();
          state.items[state.highlighted].click();
        }
      });

      clear.addEventListener("click", () => {
        state.controller?.abort();
        window.clearTimeout(state.debounceTimer);
        state.requestId += 1;
        state.selected = null;
        state.sessionToken = createSessionToken();
        input.value = "";
        clear.hidden = true;
        closeSuggestions(state);
        status.textContent = "Type at least two characters, then select a suggestion.";
        results.hidden = true;
        clearError();
        input.focus();
      });
    });

    document.addEventListener("pointerdown", (event) => {
      Object.values(fieldStates).forEach((state) => {
        if (!state.input.closest("[data-autocomplete]").contains(event.target)) {
          closeSuggestions(state);
        }
      });
    });

    const renderResults = (payload) => {
      const prediction = payload.prediction;
      const route = payload.route_display;
      root.querySelector("[data-result-pickup]").textContent = payload.pickup?.display_name || payload.pickup?.taxi_zone || "Pickup";
      root.querySelector("[data-result-dropoff]").textContent = payload.dropoff?.display_name || payload.dropoff?.taxi_zone || "Destination";
      root.querySelector("[data-result-duration]").textContent = `${formatNumber(prediction.duration_minutes)} min`;
      root.querySelector("[data-result-duration-range]").textContent = `${formatNumber(prediction.duration_empirical_range_minutes[0])}–${formatNumber(prediction.duration_empirical_range_minutes[1])} min`;
      root.querySelector("[data-result-cost]").textContent = formatCurrency(prediction.estimated_pre_tip_cost);
      root.querySelector("[data-result-cost-range]").textContent = `${formatCurrency(prediction.cost_empirical_range[0])}–${formatCurrency(prediction.cost_empirical_range[1])}`;
      root.querySelector("[data-result-model-meta]").textContent = `Model ${prediction.model_version}; data cutoff ${prediction.data_cutoff}. Frozen zone/time prediction.`;

      const distance = root.querySelector("[data-result-distance]");
      const googleDuration = root.querySelector("[data-result-google-duration]");
      const routeMeta = root.querySelector("[data-result-route-meta]");
      const attribution = root.querySelector("[data-route-attribution]");
      if (route) {
        distance.textContent = `${formatNumber(route.distance_miles)} mi`;
        googleDuration.textContent = `${formatNumber(route.google_route_duration_minutes)} min`;
        routeMeta.textContent = "Google routing is shown as external context and is not used as an input to the frozen ML model.";
        attribution.textContent = route.attribution ? `Route context: ${route.attribution}` : "";
      } else {
        distance.textContent = "Unavailable";
        googleDuration.textContent = "Unavailable";
        routeMeta.textContent = "The model prediction completed, but external route context was unavailable.";
        attribution.textContent = "";
      }

      results.hidden = false;
      root.querySelector("#taxi-model-result").focus({ preventScroll: true });
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearError();
      results.hidden = true;

      const pickup = fieldStates.pickup;
      const dropoff = fieldStates.dropoff;
      pickup.input.setAttribute("aria-invalid", String(!pickup.selected));
      dropoff.input.setAttribute("aria-invalid", String(!dropoff.selected));
      if (!pickup.selected || !dropoff.selected) {
        setError("incomplete_location");
        (!pickup.selected ? pickup.input : dropoff.input).focus();
        return;
      }

      let departureDatetime;
      try {
        departureDatetime = toNewYorkIso(departureInput.value);
      } catch {
        departureInput.setAttribute("aria-invalid", "true");
        setError("invalid_datetime");
        departureInput.focus();
        return;
      }

      if (Date.parse(departureDatetime) <= Date.now()) {
        departureInput.setAttribute("aria-invalid", "true");
        setError("departure_in_past");
        departureInput.focus();
        return;
      }
      departureInput.setAttribute("aria-invalid", "false");

      const payload = {
        pickup_place_id: pickup.selected.place_id,
        dropoff_place_id: dropoff.selected.place_id,
        departure_datetime: departureDatetime,
        pickup_session_token: pickup.sessionToken,
        dropoff_session_token: dropoff.sessionToken,
        include_route: true
      };

      predictionController?.abort();
      predictionController = new AbortController();
      cancelledByUser = false;
      setLoading(true);

      try {
        const response = useFixture
          ? await localPredict(payload, predictionController.signal)
          : await productionPredict(payload, predictionController);
        renderResults(response);
      } catch (error) {
        const code = error.name === "AbortError"
          ? (cancelledByUser ? "request_cancelled" : "network_timeout")
          : (error.code || "service_unavailable");
        setError(code);
      } finally {
        setLoading(false);
        predictionController = null;
      }
    });

    departureInput.addEventListener("input", () => {
      departureInput.setAttribute("aria-invalid", "false");
      results.hidden = true;
      clearError();
    });

    cancelButton.addEventListener("click", () => {
      cancelledByUser = true;
      predictionController?.abort();
    });

    resetButton.addEventListener("click", () => {
      Object.values(fieldStates).forEach((state) => {
        state.controller?.abort();
        window.clearTimeout(state.debounceTimer);
        state.requestId += 1;
        state.selected = null;
        state.sessionToken = createSessionToken();
        state.input.value = "";
        state.input.setAttribute("aria-invalid", "false");
        state.clear.hidden = true;
        state.status.textContent = "Type at least two characters, then select a suggestion.";
        closeSuggestions(state);
      });
      results.hidden = true;
      clearError();
      fieldStates.pickup.input.focus();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
