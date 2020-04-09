export function render(element, parentDom) {
  const { type, props = {} } = element;

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
  (props.children || []).forEach((child) => render(child, el));
  // attach Dom element to parent node
  parentDom.appendChild(el);
}

export function createVNode(element) {
  const { type, props = {} } = element;
  // create dom element
  const dom =
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
      dom.addEventListener(eventName, props[key]);
    } else {
      // map normal DOM properties
      dom[key] = props[key];
    }
  });

  // recurrsivly initiate children
  const childInstances = (props.children || []).map((child) =>
    createVNode(child)
  );
  childInstances.forEach((child) => {
    dom.appendChild(child.dom);
  });

  return {
    dom,
    element,
    childInstances,
  };
}
