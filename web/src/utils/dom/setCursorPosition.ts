// Credits: http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
export default function setCursorPosition(input: any, pos: number) {
  if (!input) return;

  // Modern browsers
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(pos, pos);

  // IE8 and below
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}