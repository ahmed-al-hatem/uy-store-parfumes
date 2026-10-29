/** Mock network delay so loading states are real. Remove when wiring a real backend. */
export function simulateLatency(min = 250, max = 450) {
  return new Promise((resolve) => setTimeout(resolve, min + Math.random() * (max - min)));
}
