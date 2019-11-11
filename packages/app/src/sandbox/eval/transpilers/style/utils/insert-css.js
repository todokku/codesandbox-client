const wrapper = (id, css, webpackHMREnabled = false) => `
function createStyleNode(id, content) {
  var styleNode =
    document.getElementById(id) || document.createElement('style');

  styleNode.setAttribute('id', id);
  styleNode.type = 'text/css';
  if (styleNode.styleSheet) {
    styleNode.styleSheet.cssText = content;
  } else {
    styleNode.innerHTML = '';
    styleNode.appendChild(document.createTextNode(content));
  }
  document.head.appendChild(styleNode);
}

createStyleNode(
  ${JSON.stringify(id)},
  ${JSON.stringify(css)}
);

${webpackHMREnabled ? 'module.hot.accept()' : ''}
`;

export default function(id, css, webpackHMREnabled) {
  const result = wrapper(id, css || '', webpackHMREnabled);
  return result;
}
