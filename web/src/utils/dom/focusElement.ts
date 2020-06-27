
export default function focusElement(elem: any) {
  if (!elem || !elem.focus || typeof elem.focus !== 'function') return;
  elem.focus();
}
