import { render } from "./render";
import Meact from "./Meact";

let count = 0;

const handleClick = () => {
  count++;
  render(getElement(), document.getElementById("root"));
};

const getElement = () => {
  return (
    <div id="container">
      <h2>Counter</h2>
      <button onClick={() => handleClick()}>Increment</button>
      <p>{count}</p>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  render(getElement(), document.getElementById("root"));
});
