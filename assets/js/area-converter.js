/* ========================================================================
   Goed Properties - Land Area Converter
   All conversion factors are expressed as square feet per unit.
   Regional unit definitions are reference assumptions; local standards vary.
   ======================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const units = [
        { id: "squareFeet", label: "Square Feet", shortUnit: "SQ.FT", squareFeet: 1 },
        { id: "squareMetres", label: "Square Metres", shortUnit: "SQ.M", squareFeet: 10.7639104167 },
        { id: "squareYards", label: "Square Yards", shortUnit: "SQ.YD", squareFeet: 9 },
        { id: "acres", label: "Acres", shortUnit: "AC", squareFeet: 43560 },
        { id: "biswaPucca", label: "Biswa I", shortUnit: "BISWA I", squareFeet: 1350, regionNote: "Pucca North Indian reference: 1/20 of 27,000 sq.ft" },
        { id: "bighaPucca", label: "Bigha I", shortUnit: "BIGHA I", squareFeet: 27000, regionNote: "Pucca reference: 3,000 sq.yd" },
        { id: "biswaKaccha", label: "Biswa II", shortUnit: "BISWA II", squareFeet: 453.6, regionNote: "Kaccha reference: 1/20 of 1,008 sq.yd" },
        { id: "bighaKaccha", label: "Bigha II", shortUnit: "BIGHA II", squareFeet: 9072, regionNote: "Kaccha reference: 1,008 sq.yd" },
        { id: "hectares", label: "Hectares", shortUnit: "HA", squareFeet: 107639.104167 },
        { id: "kottah", label: "Kottah (Bengal)", shortUnit: "KOTTAH", squareFeet: 720, regionNote: "Standard Bengal reference" },
        { id: "kanal", label: "Kanal", shortUnit: "KANAL", squareFeet: 5445 },
        { id: "marla", label: "Marla", shortUnit: "MARLA", squareFeet: 272.25 },
        { id: "ground", label: "Ground", shortUnit: "GROUND", squareFeet: 2400, regionNote: "Common Chennai reference" },
        { id: "cents", label: "Cents", shortUnit: "CENT", squareFeet: 435.6 },
        { id: "aankadam", label: "Aankadam", shortUnit: "AANKADAM", squareFeet: 72, regionNote: "Common Andhra/Telangana reference" },
        { id: "perch", label: "Perch", shortUnit: "PERCH", squareFeet: 272.25 },
        { id: "rood", label: "Rood", shortUnit: "ROOD", squareFeet: 10890 },
        { id: "guntha", label: "Guntha", shortUnit: "GUNTHA", squareFeet: 1089 },
        { id: "chatak", label: "Chatak", shortUnit: "CHATAK", squareFeet: 45 },
        { id: "ares", label: "Ares", shortUnit: "ARE", squareFeet: 1076.39104167 }
    ];

    const grid = document.getElementById("area-unit-grid");
    const form = document.getElementById("area-converter-form");
    const status = document.getElementById("area-status");
    const clearButton = document.getElementById("area-clear");
    if (!grid || !form || !status || !clearButton) return;

    let activeUnitId = "squareFeet";
    let debounceTimer = null;
    const inputById = new Map();
    const cardById = new Map();

    const formatArea = value => {
        if (!Number.isFinite(value)) return "";
        const normalized = Number(value.toPrecision(12));
        return new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 6,
            useGrouping: true
        }).format(normalized);
    };

    units.forEach((unit, index) => {
        const card = document.createElement("div");
        card.className = "converter-field rounded-xl border border-gray-200 bg-white p-3.5";
        card.dataset.unitId = unit.id;
        const label = document.createElement("label");
        label.htmlFor = `area-${unit.id}`;
        label.className = "mb-1.5 flex cursor-pointer items-center gap-1 text-xs font-bold tracking-tight text-gray-800";

        const number = document.createElement("span");
        number.className = "font-mono text-[11px] text-gray-400";
        number.textContent = `${index + 1}.`;
        const labelText = document.createElement("span");
        labelText.textContent = unit.label;
        label.append(number, labelText);

        const shortLabel = document.createElement("span");
        shortLabel.className = "ml-auto rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-gray-400";
        shortLabel.textContent = unit.shortUnit;
        label.append(shortLabel);

        const input = document.createElement("input");
        input.id = `area-${unit.id}`;
        input.type = "text";
        input.inputMode = "decimal";
        input.autocomplete = "off";
        input.placeholder = "0";
        input.setAttribute("aria-label", `${unit.label} area`);
        input.className = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 transition focus:border-brandRed focus:outline-none focus:ring-2 focus:ring-brandRed/20";

        card.append(label, input);
        if (unit.regionNote) {
            const note = document.createElement("p");
            note.className = "mt-1 truncate text-[10px] font-normal text-gray-400";
            note.title = unit.regionNote;
            note.textContent = unit.regionNote;
            card.append(note);
        }
        grid.append(card);
        inputById.set(unit.id, input);
        cardById.set(unit.id, card);

        input.addEventListener("input", () => {
            const rawValue = input.value;
            if (rawValue !== "" && !/^\d*\.?\d*$/.test(rawValue)) {
                input.value = rawValue.slice(0, -1);
                return;
            }
            activeUnitId = unit.id;
            updateActiveCard();
            if (debounceTimer !== null) window.clearTimeout(debounceTimer);
            debounceTimer = window.setTimeout(() => convertFrom(unit.id, rawValue), 350);
        });
    });

    function updateActiveCard() {
        cardById.forEach((card, id) => {
            const isActive = id === activeUnitId;
            card.classList.toggle("is-active", isActive);
            const input = inputById.get(id);
            if (input) input.setAttribute("aria-current", isActive ? "true" : "false");
        });
    }

    function setStatus(message, success = false) {
        status.replaceChildren();
        const badge = document.createElement("span");
        badge.className = success
            ? "inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-700"
            : "text-gray-400";
        if (success) {
            const icon = document.createElement("i");
            icon.className = "fa-solid fa-circle-check text-emerald-600";
            icon.setAttribute("aria-hidden", "true");
            badge.append(icon);
        }
        badge.append(document.createTextNode(message));
        status.append(badge);
    }

    function convertFrom(sourceId, rawValue) {
        const numericValue = Number.parseFloat(rawValue);
        const sourceUnit = units.find(unit => unit.id === sourceId);
        if (rawValue === "" || !Number.isFinite(numericValue) || numericValue < 0) {
            units.forEach(unit => {
                const input = inputById.get(unit.id);
                if (input) input.value = unit.id === sourceId ? rawValue : "";
            });
            setStatus("Enter a value in any unit field to convert instantly across all 20 units.");
            return;
        }

        const squareFeet = numericValue * sourceUnit.squareFeet;
        units.forEach(unit => {
            const input = inputById.get(unit.id);
            if (!input) return;
            input.value = unit.id === sourceId ? rawValue : formatArea(squareFeet / unit.squareFeet);
        });
        setStatus(`Calculated based on ${sourceUnit.label}.`, true);
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (debounceTimer !== null) window.clearTimeout(debounceTimer);
        convertFrom(activeUnitId, inputById.get(activeUnitId)?.value || "");
    });

    clearButton.addEventListener("click", () => {
        if (debounceTimer !== null) window.clearTimeout(debounceTimer);
        debounceTimer = null;
        activeUnitId = "squareFeet";
        inputById.forEach(input => { input.value = ""; });
        updateActiveCard();
        setStatus("Enter a value in any unit field to convert instantly across all 20 units.");
        inputById.get("squareFeet")?.focus();
    });

    updateActiveCard();
});
