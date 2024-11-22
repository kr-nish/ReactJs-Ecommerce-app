// CounterComponent.tsx

import React, { useState } from 'react';

// 1. Define Props Interface
interface CounterProps {
  initialCount?: number;  // optional prop, defaults to 0 if not provided
  step?: number;          // optional prop, defaults to 1 if not provided
}

// 2. Define Component Type
const CounterComponent: React.FC<CounterProps> = ({ initialCount = 0, step = 1 }) => {
  
  // 3. Type the state with `useState`
  const [count, setCount] = useState<number>(initialCount);

  // 4. Define type for the event parameter in the handler function
  const handleIncrement = (): void => {
    setCount(count + step);
  };

  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={handleIncrement}>Increment by {step}</button>
    </div>
  );
};

export default CounterComponent;
