let rootNode = null;

export function render(element, containerDom) {
  const prevRoot = rootNode;
  const newRoot = reconcile(containerDom, prevRoot, element);
  rootNode = newRoot;
}

function reconcile(parentDom, oldVNode, element) {
  if (oldVNode == null) {
    // Create VNode
    const newVNode = createVNode(element);
    parentDom.appendChild(newVNode.dom);
    return newVNode;
  } else if (element == null) {
    // Delete VNode/dom
    parentDom.removeChild(oldVNode.dom);
    return null;
  } else if (oldVNode.element.type === element.type) {
    // Update VNode
    updateDomProperties(oldVNode.dom, oldVNode.element.props, element.props);
    // Reconcile children
    oldVNode.childrenVNodes = reconcileChildren(oldVNode, element);
    oldVNode.element = element;
    return oldVNode;
  } else {
    // Replace VNode
    const newVNode = createVNode(element);
    parentDom.replaceChild(newVNode.dom, oldVNode.dom);
    return newVNode;
  }
}

function createVNode(element) {
  const { type, props = {} } = element;
  // create dom element
  const dom =
    type === "TEXT ELEMENT"
      ? document.createTextNode("")
      : document.createElement(type);

  updateDomProperties(dom, {}, props);

  // recurrsivly creat children VNode
  const childrenVNodes = (props.children || []).map((child) =>
    createVNode(child)
  );
  childrenVNodes.forEach((child) => {
    dom.appendChild(child.dom);
  });

  return {
    dom,
    element,
    childrenVNodes,
  };
}

function updateDomProperties(dom, prevProps, nextProps) {
  const isEvent = (key) => key.startsWith("on");
  const isAttribute = (key) => !isEvent(key) && key != "children";

  let prevPropKeys = Object.keys(prevProps);
  let nextpropKeys = Object.keys(nextProps);
  const allPropKeys = prevPropKeys.concat(nextpropKeys);
  allPropKeys.forEach((key) => {
    if (prevProps[key] === nextProps[key]) {
      return;
    }
    if (isEvent(key)) {
      const eventType = key.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[key]);
      nextProps[key] && dom.addEventListener(eventType, nextProps[key]);
    } else if (isAttribute(key)) {
      dom[key] = nextProps[key];
    }
  });
}

function reconcileChildren(oldVNode, element) {
  const parentDom = oldVNode.dom;
  const oldChildrenVNodes = oldVNode.childrenVNodes;
  const childrenElements = element.props.children || [];
  const count = Math.max(oldChildrenVNodes.length, childrenElements.length);
  const newChildrenVNodes = [];
  for (let i = 0; i < count; i++) {
    const newVNode = reconcile(
      parentDom,
      oldChildrenVNodes[i],
      childrenElements[i]
    );
    newChildrenVNodes.push(newVNode);
  }
  return newChildrenVNodes;
}
