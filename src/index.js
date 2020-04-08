import { render } from "./render";
import { element } from "./element";
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  render(element, document.getElementById("root"));
});
