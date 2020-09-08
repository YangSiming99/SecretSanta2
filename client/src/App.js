import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [message, setMessage] = useState("no message :(");
  useEffect(()=> {
    fetch('/api/example')
      .then(res => res.json())
      .then(resp => setMessage(resp.message))
  }, [])

  return(
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default App;

