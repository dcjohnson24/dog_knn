import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { dogList, numNeighborList } from './dogOptions';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  // Fxi for Warning message Can't perform a React state update on an unmounted component
  componentWillUnmmount() {
    this.setState = (state, callback) => {
      return;
    };
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
    const result = this.state.result;
    return (
      <Container style = {{ color: "white" }} className="App" >
        <h1>Welcome to the Dog Nearest Neighbors App</h1>
        <Form className="form">
          <Form.Row>
            <Form.Group as={Col}>
                <Autocomplete
                  size='small'
                  id="combo-box"
                  options={dogList}
                  style={{ width: 300, 
                           position: 'absolute', 
                           right: '80px', 
                           top: '40px' }}
                  onInputChange={event => {
                    var formData = this.state.formData;
                    formData['dogName'] = event.target.textContent;
                    this.setState({ formData });
                  }}
                  renderInput={params => (
                    <TextField 
                      {...params}
                      data-testid='dogName' 
                      label="Enter a dog name" 
                      margin="normal"
                      style={{backgroundColor: 'white'}}
                      variant="outlined"
                      fullWidth/>
                    )}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Autocomplete
                  size='small'
                  id="combo-box"
                  options={numNeighborList}
                  style={{ width: 300, 
                           position: 'absolute', 
                           left: '80px', 
                           top: '40px' }}
                  onInputChange={event => {
                    var formData = this.state.formData;
                    formData['numNeighbors'] = event.target.textContent;
                    this.setState({ formData });
                  }}
                  renderInput={params => (
                    <TextField 
                      {...params}
                      data-testid='neighbors'
                      label="Enter number of neighbors" 
                      margin="normal"
                      style={{backgroundColor: 'white'}}
                      variant="outlined"
                      fullWidth/>
                    )}/>
            </Form.Group>
          </Form.Row>
          <Button 
            style={{float: 'center', 
                    position: 'absolute',
                    top: '200px',
                    right: '645px'}}
            onClick={this.handleClick}>
              Submit
          </Button>
        </Form>
        {result === "" ? null: 
        (<Col className="result-container" style={{ top: '230px' }}>
          <h3 id="result">{result}</h3>
        </Col>)}
      </Container>
    );
  }
}

export default App;
