import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO change background color of textfield to white
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
        <h1>Welcome to the Dog Nearest Neighbors App</h1>
        <Form className="form">
          <Form.Row>
            <Form.Group as={Col}>
              {/* <Form.Label>Name of Dog</Form.Label> */}
                <Autocomplete
                  size='small'
                  id="combo-box"
                  options={dogList}
                  style={{ width: 300, 
                           position: 'absolute', 
                           right: '80px', 
                           top: '40px' }}
                  // onChange={this.handleChange}
                  // value={formData.dogName}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      onChange={this.handleChange}
                      value={formData.dogName}
                      label="Enter a dog name" 
                      margin="normal"
                      style={{backgroundColor: 'white'}}
                      variant="outlined"
                      fullWidth/>
                    )}/>
              {/* <Form.Control
              type="text" 
              name="dogName" 
              //placeholder="Labrador Retriever"
              value={formData.dogName}
              onChange={this.handleChange}/> */}
            </Form.Group>
            <Form.Group as={Col}>
              {/* <Form.Label>Number of Neighbors</Form.Label> */}
                <Autocomplete
                  size='small'
                  id="combo-box"
                  options={numNeighborList}
                  style={{ width: 300, 
                           position: 'absolute', 
                           left: '80px', 
                           top: '40px' }}
                  // onChange={this.handleChange}
                  // value={formData.numNeighbors}
                  renderInput={params => (
                    <TextField 
                      {...params} 
                      onChange={this.handleChange}
                      value={formData.numNeighbors}
                      label="Enter number of neighbors" 
                      margin="normal"
                      style={{backgroundColor: 'white'}}
                      variant="outlined"
                      fullWidth/>
                    )}/>
              {/* <Form.Control
                type="number" 
                step="1" 
                min="1"
                name="numNeighbors" 
                //placeholder="3"
                value={formData.numNeighbors} 
                onChange={this.handleChange}/> */}
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
        (<Col className="result-container">
          <h3 id="result">{result}</h3>
        </Col>)}
      </Container>
    );
  }
}

const numNeighborList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(elt => elt.toString());

const dogList =  [
  'Border Collie', 'Border Terrier', 'Brittany', 'Cairn Terrier',
  'Welsh Springer Spaniel', 'English Cocker Spaniel',
  'Cocker Spaniel', 'Papillon', 'Australian Cattle Dog',
  'Shetland Sheepdog', 'Siberian Husky', 'Lhasa Apso',
  'Affenpinscher', 'Dachshund', 'Miniature Schnauzer', 'Chihuahua',
  'Australian Terrier', 'Whippet', 'English Springer Spaniel',
  'West Highland White Terrier', 'Bedlington Terrier', 'Poodle',
  'Bichon Frise', 'German Shorthaired Pointer', 'Pointer',
  'Tibetan Spaniel', 'Labrador Retriever', 'Maltese', 'Pomeranian',
  'Shih Tzu', 'Australian Shepherd', 'Yorkshire Terrier',
  'Irish Setter', 'Pharaoh Hound', 'Brussels Griffon',
  'Golden Retriever', 'Samoyed', 'Beagle',
  'Chesapeake Bay Retriever', 'Tibetan Terrier', 'Gordon Setter',
  'English Setter', 'Pug', 'Briard', 'Norfolk Terrier',
  'Flat-Coated Retriever', 'Boston Terrier', 'Doberman Pinscher',
  'English Toy Spaniel', 'Belgian Tervuren',
  'Cavalier King Charles Spaniel', 'Dalmatian', 'Basset Hound',
  'Basenji', 'Italian Greyhound', 'Staffordshire Bull Terrier',
  'Bouvier des Flandres', 'Pembroke Welsh Corgi', 'Clumber Spaniel',
  'Dandie Dinmont Terrier', 'Saluki', 'Giant Schnauzer', 'Greyhound',
  'Scottish Terrier', 'Rottweiler', 'Kerry Blue Terrier',
  'Afghan Hound', 'Newfoundland', 'German Shepherd', 'Pekingese',
  'Old English Sheepdog', 'Akita', 'Rhodesian Ridgeback',
  'French Bulldog', 'Borzoi', 'Bernese Mountain Dog', 'Bull Terrier',
  'Boxer', 'Alaskan Malamute', 'Chow Chow', 'Bloodhound',
  'Irish Wolfhound', 'Bullmastiff', 'Mastiff', 'Great Dane',
  'Saint Bernard', 'Bulldog', 'Airedale Terrier',
  'American English Coonhound', 'American Eskimo Dog',
  'American Foxhound', 'American Staffordshire Terrier',
  'American Water Spaniel', 'Anatolian Shepherd Dog',
  'Bearded Collie', 'Beauceron', 'Belgian Malinois',
  'Belgian Sheepdog', 'Black and Tan Coonhound',
  'Black Russian Terrier', 'Bluetick Coonhound', 'Boykin Spaniel',
  'Canaan Dog', 'Cane Corso', 'Cardigan Welsh Corgi',
  'Cesky Terrier', 'Chinese Crested', 'Chinese Shar Pei', 'Collie',
  'Curly Coated Retriever', 'English Foxhound',
  'Entlebucher Mountain Dog', 'Field Spaniel', 'Finnish Lapphund',
  'Finnish Spitz', 'German Pinscher', 'German Wirehaired Pointer',
  'Glen of Imaal Terrier', 'Great Pyrenees',
  'Greater Swiss Mountain Dog', 'Harrier', 'Havanese',
  'Ibizan Hound', 'Icelandic Sheepdog', 'Irish Red and White Setter',
  'Irish Terrier', 'Irish Water Spaniel', 'Japanese Chin',
  'Keeshond', 'Komondor', 'Kuvasz', 'Lakeland Terrier', 'Leonberger',
  'Looked - nothing', 'Löwchen', 'Manchester Terrier',
  'Miniature Bull Terrier', 'Miniature Pinscher',
  'Neapolitan Mastiff', 'Norwegian Buhund', 'Norwegian Elkhound',
  'Norwegian Lundehund', 'Norwich Terrier',
  'NOT POSSIBLE IF NO INTELLIGENCE DATA',
  'Nova Scotia Duck Tolling Retriever', 'Otterhound',
  'Parson Russell Terrier', 'Petit Basset Griffon Vendeen', 'Plott',
  'Polish Lowland Sheepdog', 'Portuguese Water Dog', 'Puli',
  'Pyrenean Shepherd', 'Redbone Coonhound', 'Schipperke',
  'Scottish Deerhound', 'Sealyham Terrier', 'Shiba Inu',
  'Silky Terrier', 'Skye Terrier', 'Smooth Fox Terrier',
  'Soft-Coated Wheaten Terrier', 'Spinone Italiano',
  'Standard Schnauzer', 'Sussex Spaniel', 'Swedish Vallhund',
  'Tibetan Mastiff', 'Toy Fox Terrier', 'Vizsla', 'Weimaraner',
  'Welsh Terrier', 'Wire Fox Terrier', 'Wirehaired Pointing Griffon',
  'Xoloitzcuintli'
];


export default App;
