import React from 'react';
import './App.css';
import Store from './Store'
import Layout from './Layout'

console.log(process.env.REACT_APP_PORT)

function App() {
  
  
  
  
  
  
  return (
    <div className="App">
      <Store>
        <Layout></Layout>
      </Store>
    </div>
  );
}

export default App;
