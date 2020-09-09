
const INITIAL_WAIT_TIME_MS = 100;

export default function scrollToAnchorElementIfExists() {
  setTimeout(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const element = document.querySelector(hash);
    if (!element) return;
    element.scrollIntoView(true);
  }, INITIAL_WAIT_TIME_MS);
}
