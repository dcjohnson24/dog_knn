import React from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

//TODO Write a class for this with a render method following this guy's stuff
// https://github.com/kb22/ML-React-App-Template/blob/master/ui/src/App.js
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        'dogName': '',
        'numNeighbors': ''
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handleClick = (event) => {
    const formData = this.formData;
    fetch('/api/dogs',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      }
    
    ).then(response => response.json()).then(response => {
      this.setState({
        result: response.result
      });
    });
  }

  render() {
    const formData = this.state.formData;
    const result = this.state.result;
    return (
      <Container style = {{ color: "white" }} className="App" >
        <h1>Welcome to the Dog Nearest Neighbors App</h1>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Name of Dog</Label>
              <Input 
              type="text" 
              name="dogName" 
              placeholder="Labrador Retriever"
              value={formData.dogName}
              onChange={this.handleChange}
              ></Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="3">Number of Neighbors</Label>
              <Input 
              type="number" 
              step="1" 
              min="1"
              name="numNeighbors" 
              placeholder="3"
              value={formData.numNeighbors} 
              onChange={this.handleChange}>
              </Input>
            </FormGroup>
          </Col>
          <Button onclick={this.handleClick}>Submit</Button>
        </Form>
        {result === "" ? null: 
        (<Col className="result-container">
          <h3 id="result">{result}</h3>
        </Col>)}
      </Container>
    );
  }
}



// function App() {
//   let nearest_neighbors = ['Poodles', 'Dalmations', 'Golden Retrievers'];
//   const display = nearest_neighbors.map((number) => 
//     <li>{number}</li>
//   );

//   return (
//     <div classname="App">
//       <header classname="App-header">
        
//         <title>Welcome to the Dog KNN App!</title>
//         <h1>Find the nearest neighbors of your favorite dogs</h1>
//       </header>
//       <p> The nearest neighbors of Rotweiler are 
//         <ul>
//           {display}
//         </ul>
//       </p>
//     </div>
    
//   );
// }

// function Input() {
//   return (
//     <div>
//       Dogs: <input type="text" classname="Search" placeholder="Search..." /><br></br><br></br>
//       Number of Neighbors: <input type="text" classname="input" placeholder="Number of neighbors e.g. 3..." />
//       <p>
//         <input type="submit"></input>
//       </p>
//     </div>

//   );
// }

export default App;
