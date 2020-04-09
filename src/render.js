let rootNode = null;

export function render(element, containerDom) {
  const prevRoot = rootNode;
  const newRoot = reconcile(containerDom, prevRoot, element);
  rootNode = newRoot;
}

function reconcile(parentDom, vnode, element) {
  if (vnode == null) {
    const newVNode = createVNode(element);
    parentDom.appendChild(newVNode.dom);
    return newVNode;
  } else {
    const newVNode = createVNode(element);
    parentDom.replaceChild(newVNode.dom, vnode.dom);
    return newVNode;
  }
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
