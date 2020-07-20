import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
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
    const formData = this.state.formData;
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
        <h1>Welcome to the <br></br>Dog Nearest Neighbors App</h1>
        <Form className="form">
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name of Dog</Form.Label>
              <Form.Control
              type="text" 
              name="dogName" 
              //placeholder="Labrador Retriever"
              value={formData.dogName}
              onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Number of Neighbors</Form.Label>
              <Form.Control
                type="number" 
                step="1" 
                min="1"
                name="numNeighbors" 
                //placeholder="3"
                value={formData.numNeighbors} 
                onChange={this.handleChange}/>
              </Form.Group>
          </Form.Row>
          <Button onClick={this.handleClick}>Submit</Button>
        </Form>
        {result === "" ? null: 
        (<Col className="result-container">
          <h3 id="result">{result}</h3>
        </Col>)}
      </Container>
    );
  }
}

export default App;
