
interface State {
  previousStyleTag: any,
}
const state: State = {
  previousStyleTag: null,
};

export default function injectDOMStyle(css: string = '') {
  if (state.previousStyleTag) {
    state.previousStyleTag.remove();
  }
  const head = document.head || document.getElementsByTagName('head')[0];
  const styleTag = document.createElement('style');
  state.previousStyleTag = styleTag;

  head.appendChild(styleTag);

  styleTag.type = 'text/css';
  // @ts-ignore
  if (styleTag.styleSheet){
    // This is required for IE8 and below.
    // @ts-ignore
    styleTag.styleSheet.cssText = css;
  } else {
    styleTag.appendChild(document.createTextNode(css));
  }
}
