import React from 'react';
import ReactDOM from 'react-dom';
import logo from './dog_tree.jpg';
import './App.css';


function App() {
  let nearest_neighbors = ['Poodles', 'Dalmations', 'Golden Retrievers'];
  const display = nearest_neighbors.map((number) => 
    <li>{number}</li>
  );

  return (
    <div classname="App">
      <header classname="App-header">
        <img src={logo} alt="logo" />
        <h1>Welcome to the Dog KNN App!</h1>
        <h2>Find the nearest neighbors of your favorite dogs</h2>
      </header>
      <Input/>
      <p> The nearest neighbors of Rotweiler are 
        <ul>
          {display}
        </ul>
      </p>
    </div>
    
  );
}

function Input() {
  return (
    <div>
      Dogs: <input type="text" classname="Search" placeholder="Search..." /><br></br><br></br>
      Number of Neighbors: <input type="text" classname="input" placeholder="Number of neighbors e.g. 3..." />
      <p>
        <input type="submit"></input>
      </p>
    </div>

  );
}


ReactDOM.render(
  <App/>,
  document.getElementById('root')
)

export default App;
