import Meact from "./Meact";

export class Counter extends Meact.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div id="counter">
        <h2>Counter</h2>
        <button
          onClick={() => {
            this.handleClick();
          }}
        >
          Increment
        </button>
        <p>{this.state.count}</p>
      </div>
    );
  }
}
