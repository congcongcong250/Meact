export function render(node, parentDom) {
  const { type, props = {} } = node;

  // create dom element
  const el =
    type === "TEXT ELEMENT"
      ? document.createTextNode("")
      : document.createElement(type);

  // map element props to dom properties
  Object.keys(props).forEach((key) => {
    if (key === "children") {
      return;
    }
    // bind event listeners
    if (key.startsWith("on")) {
      const eventName = key.toLowerCase().substring(2);
      el.addEventListener(eventName, props[key]);
    } else {
      // map normal DOM properties
      el[key] = props[key];
    }
  });
  // recurrsivly render children
  (props.children || []).map((child) => render(child, el));
  // attach Dom element to parent node
  parentDom.appendChild(el);
}
