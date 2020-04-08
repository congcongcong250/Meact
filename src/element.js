// <div id="container">
//   <input value="foo" type="text">
//   <a href="/bar"></a>
//   <span></span>
// </div>

const element = {
  type: "div",
  props: {
    id: "container",
    children: [
      { type: "input", props: { value: "foo", type: "text" } },
      { type: "a", props: { href: "/bar" } },
      { type: "span", props: {} },
    ],
  },
};
