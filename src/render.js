let rootNode = null;

export function render(element, containerDom) {
  const prevRoot = rootNode;
  const newRoot = reconcile(containerDom, prevRoot, element);
  rootNode = newRoot;
}

function reconcile(parentDom, oldVNode, element) {
  // Create VNode
  if (oldVNode == null) {
    const newVNode = createVNode(element);
    parentDom.appendChild(newVNode.dom);
    return newVNode;
  }
  // Delete VNode/dom
  if (element == null) {
    parentDom.removeChild(oldVNode.dom);
    return null;
  }
  // Update VNode
  if (oldVNode.element.type === element.type) {
    if (typeof element.type === "string") {
      // Update Dom VNode
      updateDomProperties(oldVNode.dom, oldVNode.element.props, element.props);
      // Reconcile children
      oldVNode.childrenVNodes = reconcileChildren(oldVNode, element);
      oldVNode.element = element;
    } else {
      // Update Class Component VNode
      // updateProps lifeCycle
      oldVNode.classInstance.props = element.props;
      const childElement = oldVNode.classInstance.render();
      const oldChildVNode = oldVNode.childrenVNodes[0];
      const childVNode = reconcile(parentDom, oldChildVNode, childElement);
      oldVNode.dom = childVNode.dom;
      oldVNode.childrenVNodes = [childVNode];
      oldVNode.element = element;
    }
    return oldVNode;
  }
  // Replace VNode
  const newVNode = createVNode(element);
  parentDom.replaceChild(newVNode.dom, oldVNode.dom);
  return newVNode;
}

function createVNode(element) {
  const { type, props = {} } = element;
  const VNode = { element };
  let dom;
  let childrenVNodes;
  const isDomVNode = typeof type === "string";
  if (isDomVNode) {
    // Create Dom VNode
    // create dom element
    dom =
      type === "TEXT ELEMENT"
        ? document.createTextNode("")
        : document.createElement(type);

    updateDomProperties(dom, {}, props);

    // recurrsivly creat children VNode
    childrenVNodes = (props.children || []).map((child) => createVNode(child));
    childrenVNodes.forEach((child) => {
      dom.appendChild(child.dom);
    });
  } else {
    // Create Class Component VNode
    const classInstance = new type(props);
    const childElement = classInstance.render();
    childrenVNodes = [createVNode(childElement)];
    dom = childrenVNodes[0].dom;

    VNode.classInstance = classInstance;
    classInstance.__internalVNode = VNode;
  }

  VNode.dom = dom;
  VNode.element = element;
  VNode.childrenVNodes = childrenVNodes;

  return VNode;
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
    newVNode && newChildrenVNodes.push(newVNode);
  }
  return newChildrenVNodes;
}

// forceUpdate
// Update state lifecycle
export function updateClassNode(componentVNode) {
  const parentDom = componentVNode.dom.parentDom;
  // update with ONLY current cached props
  const element = componentVNode.element;
  reconcile(parentDom, componentVNode, element);
}
