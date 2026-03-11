import "@testing-library/jest-dom";

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(globalThis as any).IntersectionObserver = IntersectionObserverMock;
