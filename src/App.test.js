import React from 'react';

// import react testing methods
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
// the component to test
import App from './App';

 global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });

test('renders the title text', () => {  
  render(<App />);
  expect(screen.getByText(/Welcome to the Dog Nearest Neighbors App/i)).toBeInTheDocument();

  expect(screen.getByText(/Submit/i)).toBeInTheDocument();

  const [ dogNameLinkElement ] = screen.getAllByText(
    (_, { textContent }) => textContent === 'Enter a dog name')
  expect(dogNameLinkElement.textContent).toBe('Enter a dog name');

  const [ numNeighborsLinkElelment ] = screen.getAllByText(
    (_, { textContent }) => textContent === 'Enter number of neighbors')
  expect(numNeighborsLinkElelment.textContent).toBe('Enter number of neighbors')
});


test('userEvent test', () => {
  render(<App />);
  
  userEvent.type(screen.getByTestId('dogName').querySelector('input'), 'Labrador Retriever');

  expect(screen.getByText('Labrador Retriever')).toBeInTheDocument();
  
  userEvent.type(screen.getByTestId('neighbors').querySelector('input'), '3');
  
  expect(screen.getByText('3')).toBeInTheDocument();

  userEvent.click(screen.getByText('Submit'));

});

