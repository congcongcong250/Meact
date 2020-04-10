import { updateClassNode } from "./render";
class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState) {
    this.state = {
      ...this.state,
      ...partialState,
    };
    updateClassNode(this.__internalVNode);
  }

  render() {}
}

const createTextElement = (text) => ({
  type: "TEXT ELEMENT",
  props: { nodeValue: text },
});

const createElement = (type, nullableProps, ...rawChildren) => {
  const props = nullableProps || {};
  const children = (rawChildren || [])
    .filter((child) => child != null && child !== false)
    .map((child) => {
      return child instanceof Object ? child : createTextElement(child);
    });
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
};

const Meact = {
  createElement,
  createTextElement,
  Component,
};

export default Meact;
