// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mocking the components used in the routes to simplify the tests
jest.mock('../navbarcomponents/HomePage', () => () => <div>Home Page</div>);
jest.mock('../navbarcomponents/ShopPage', () => () => <div>Shop Page</div>);
jest.mock('../navbarcomponents/CartPage', () => () => <div>Cart Page</div>);
jest.mock('../navbarcomponents/Admin', () => () => <div>Admin Page</div>);
jest.mock('../navbarcomponents/Navbar', () => () => <div>Navbar</div>);

describe('App Component', () => {
  test('renders HomePage component for "/" route', () => {
    render(<App />);
    
    // Since the App uses BrowserRouter, we can use the screen to get the text
     // Act: Check if the Home Page is displayed
    // Assert: Verify the HomePage component is rendered
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  test('renders ShopPage component for "/shop" route', () => {
        // Arrange: Set the browser history to the /shop route
    window.history.pushState({}, 'Shop Page', '/shop');
    render(<App />);
     // Act: Check if the shop Page is displayed
    // Assert: Verify the shopPage component is rendered
    expect(screen.getByText(/Shop Page/i)).toBeInTheDocument();
  });

  test('renders CartPage component for "/cart" route', () => {
    window.history.pushState({}, 'Cart Page', '/cart');
    render(<App />);
    
    expect(screen.getByText(/Cart Page/i)).toBeInTheDocument();
  });

  test('renders Admin component for "/admin" route', () => {
    window.history.pushState({}, 'Admin Page', '/admin');
    render(<App />);
    
    expect(screen.getByText(/Admin Page/i)).toBeInTheDocument();
  });
});