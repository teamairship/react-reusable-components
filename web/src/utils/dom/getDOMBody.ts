export default function getDOMBody() {
  return (document && document.body) || document.getElementsByTagName('BODY')[0];
}
