import { render } from "./render";
import { element, jsxElement } from "./element";
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  render(element, document.getElementById("root"));
  render(jsxElement, document.getElementById("addition"));
});
