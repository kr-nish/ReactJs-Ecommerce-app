import React, {useState} from "react";


const Counters: React.FC = () => {

    const [count, setCount] = useState<number>(0); // < number > is the data type for this state variable, 0 is thi initial value

    // Count will initially store the initial defined value
    // set count is not storing anything 
    


    // we can define a func to make change to the state

    const increment = () => {
        setCount(count + 1);
        console.log("Set count is being called and 1 increment is being made");
        
    }
    // this func is the event handler
    const decrement = () =>  {
        setCount(count - 1);
        console.log("Set count is being called and 1 decrement is being made");
        
    }

    return (
        <div>
            <h1>Counter : {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )



}


export default Counters