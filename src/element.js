// <div id="container">
//   <input value="foo" type="text">
//   <a href="/bar" onclick="function(e){e.preventDefault(); alert("nothing")}">link to nowhere</a>
//   <span>Text</span>
// </div>

const createTextElement = (text) => ({
  type: "TEXT ELEMENT",
  props: { nodeValue: text },
});

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
          children: [createTextElement("link to nowhere")],
        },
      },
      { type: "span", props: { children: [createTextElement("Text")] } },
    ],
  },
};
