import Meact from "./Meact";
// <div id="container">
//   <input value="foo" type="text">
//   <a href="/bar" onclick="function(e){e.preventDefault(); alert("nothing")}">link to nowhere</a>
//   <span>Text</span>
// </div>

export const element = {
  type: "div",
  props: {
    id: "container",
    children: [
      { type: "input", props: { value: "foo", type: "text" } },
      {
        type: "a",
        props: {
          href: "/bar",
          onClick: function (e) {
            e.preventDefault();
            alert("nothing");
          },
          children: [Meact.createTextElement("link to nowhere")],
        },
      },
      { type: "span", props: { children: [Meact.createTextElement("Text")] } },
    ],
  },
};

export const jsxElement = (
  <div>
    <h1>This is from JSX</h1>
  </div>
);
