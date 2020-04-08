// <div id="container">
//   <input value="foo" type="text">
//   <a href="/bar"></a>
//   <span>Text</span>
// </div>

const textElement = {
  type: "TEXT ELEMENT",
  props: { nodeValue: "Text" },
};

export const element = {
  type: "div",
  props: {
    id: "container",
    children: [
      { type: "input", props: { value: "foo", type: "text" } },
      { type: "a", props: { href: "/bar" } },
      { type: "span", props: { children: [textElement] } },
    ],
  },
};
