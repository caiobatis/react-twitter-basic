import React, { useState, useEffect } from 'react';

function Hook() {
  // Declare a new state variable, which we'll call "count"
  // Declarando uma nova variável de estado, que chamamos de "count"
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}


export default Hook;