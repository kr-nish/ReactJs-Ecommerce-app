import React, { Component } from "react";

interface CounterProps {
  count: number;
}

class Counter extends Component<CounterProps> {
  shouldComponentUpdate(nextProps: CounterProps): boolean {
    // it will only rerender if the 'count' prop has changed

    return nextProps.count !== this.props.count;
  }

  render() {
    console.log("Rendering....");
    return <div>Count: {this.props.count}</div>;
  }
}

export default Counter;
