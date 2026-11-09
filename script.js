import { prepare, layout } from "./pretext.js";

const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-toggle-text");

function syncThemeButton() {
  const isDark = root.dataset.theme === "dark";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  if (themeLabel) themeLabel.textContent = isDark ? "日间" : "夜间";
}

themeToggle?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
  syncThemeButton();
});

syncThemeButton();

const navLinks = [...document.querySelectorAll(".site-nav a")];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navLinks) {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.toggleAttribute("aria-current", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      }
    }
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  for (const section of navSections) navObserver.observe(section);
}

document.querySelector("#year").textContent = String(new Date().getFullYear());

const editMode = new URLSearchParams(window.location.search).get("edit") === "1";
for (const element of document.querySelectorAll("[data-pretext]")) {
  if (editMode) element.contentEditable = "true";
}

let prepared = [];
let relayoutFrame = 0;

async function prepareText() {
  await document.fonts.ready;
  prepared = [];
  for (const element of document.querySelectorAll("[data-pretext]")) {
    const style = getComputedStyle(element);
    prepared.push({
      element,
      handle: prepare(element.textContent.trim(), style.font),
      lineHeight: parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.65,
    });
  }
  relayout();
}

function relayout() {
  cancelAnimationFrame(relayoutFrame);
  relayoutFrame = requestAnimationFrame(() => {
    for (const item of prepared) {
      const width = item.element.clientWidth;
      if (!width) continue;
      const result = layout(item.handle, width, item.lineHeight);
      item.element.style.height = `${Math.ceil(result.height)}px`;
    }
  });
}

function reprepare(element) {
  const current = prepared.find((item) => item.element === element);
  if (!current) return;
  const style = getComputedStyle(element);
  current.handle = prepare(element.textContent.trim(), style.font);
  current.lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.65;
  relayout();
}

if (editMode) {
  for (const element of document.querySelectorAll("[data-pretext]")) {
    new MutationObserver(() => reprepare(element)).observe(element, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  }
}

new ResizeObserver(relayout).observe(document.body);
prepareText();
