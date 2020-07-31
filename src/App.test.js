import React from 'react';
// import API mocking utilities from Mock Service worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// import react testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
// the component to test
import App from './App';

const server = setupServer(
  // Capture /api/dogs requests
  rest.post('/api/dogs', (req, res, ctx) => {
    return res(ctx.json({dogName: 'Labrador Retriever', numNeighbors: '3'}))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('some shit test', () => {
  expect(true).toBe(true);
});

describe('Screen text', () => {
  test('renders the title text', () => {  
    const { getByText, getAllByText } = render(<App />);
    screen.debug()
    const linkElement = getByText(/Welcome to the Dog Nearest Neighbors App/i);
    expect(linkElement).toBeInTheDocument();
  
    const someOtherElement = getByText(/Submit/i)
    expect(someOtherElement).toBeInTheDocument();
  
    const [ dogNameLinkElement ] = getAllByText(
      (_, { textContent }) => textContent === 'Enter a dog name')
    expect(dogNameLinkElement.textContent).toBe('Enter a dog name');

    const [ numNeighborsLinkElelment ] = getAllByText(
      (_, { textContent }) => textContent === 'Enter number of neighbors')
    expect(numNeighborsLinkElelment.textContent).toBe('Enter number of neighbors')
  });
});