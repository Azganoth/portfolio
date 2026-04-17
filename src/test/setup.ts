import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/svelte";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

HTMLDialogElement.prototype.showModal ??= function showModal() {
  this.open = true;
};

HTMLDialogElement.prototype.close ??= function close() {
  this.open = false;
  this.dispatchEvent(new Event("close"));
};

Element.prototype.scrollIntoView ??= function scrollIntoView() {};

class TestIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds = [];

  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
}

globalThis.IntersectionObserver ??= TestIntersectionObserver;
