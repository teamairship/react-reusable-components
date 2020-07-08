
import getDOMBody from "./getDOMBody";

const DEBUG = false;

const DEBUG_LOG = (text: string) => {
  if (DEBUG) {
    console.log(`HAS_SCROLLBARS >> ${text}`);
  }
}

export default function hasScrollbars(node = getDOMBody()) {
  if (!node || !node.scrollHeight || !node.clientHeight) {
    DEBUG_LOG('node not found');
    return false;
  }
  const couldOverflow = node.scrollHeight > node.clientHeight;
  if (!couldOverflow) {
    DEBUG_LOG('content not overflowing');
    return false;
  }
  // @ts-ignore
  const style = node.style || window.getComputedStyle(node, "");
  if (!style) {
    DEBUG_LOG('node style not found');
    return false;
  }
  const hasScrollbars = (
    (style.overflow === "" && style.overflowY === "") ||
    style.overflow === "visible" ||
    style.overflow === "auto" ||
    style.overflowY === "visible" ||
    style.overflowY === "auto"
  );
  if (hasScrollbars) {
    DEBUG_LOG('yep, has scrollbars alright');
  } else {
    DEBUG_LOG('welp, content could overflow but styling prevented scrollbars from appearing.');
  }
  return hasScrollbars;
}
