import React, { Component, ChangeEvent } from 'react';

interface TaxCalculatorProps {
  initialIncome?: number;  // optional initial income as prop
}

interface TaxCalculatorState {
  income: number;
  taxRate: number;
  tax: number;
}

class TaxCalculator extends Component<TaxCalculatorProps, TaxCalculatorState> {
  constructor(props: TaxCalculatorProps) {
    super(props);
    this.state = {
      income: props.initialIncome || 0,
      taxRate: 0.1,  // 10% tax rate
      tax: 0
    };
    console.log("Constructor: Initializing state and binding methods");
  }

  /**
   * Mounting Phase Methods
   */

  static getDerivedStateFromProps(nextProps: TaxCalculatorProps, prevState: TaxCalculatorState) {
    console.log("getDerivedStateFromProps: Checking if income needs to be updated from props");
    if (nextProps.initialIncome !== undefined && nextProps.initialIncome !== prevState.income) {
      return {
        income: nextProps.initialIncome,
        tax: nextProps.initialIncome * prevState.taxRate
      };
    }
    // GetderivedStateFromProps is a static method it exists only to update a component's state
    return null; // No state change
  }

  componentDidMount() {
    console.log("componentDidMount: Component mounted. Initializing tax calculation.");
    this.calculateTax();
  }

  /**
   * Custom Methods
   */

  handleIncomeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newIncome = parseFloat(event.target.value);
    this.setState({
      income: newIncome,
      tax: newIncome * this.state.taxRate
    });
  };

  calculateTax = () => {
    const tax = this.state.income * this.state.taxRate;
    if (tax !== this.state.tax) {
      this.setState({ tax });
    }
  };

  /**
   * Render Method
   */

  render() {
    console.log("Render: Rendering the component");
    return (
      <div>
        <h2>Tax Calculator</h2>
        <label>
          Income:
          <input
            type="number"
            value={this.state.income}
            onChange={this.handleIncomeChange}
          />
        </label>
        <p>Tax Rate: {this.state.taxRate * 100}%</p>
        <p>Calculated Tax: ${this.state.tax.toFixed(2)}</p>
      </div>
    );
  }
}

export default TaxCalculator;
