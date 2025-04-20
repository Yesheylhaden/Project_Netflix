import React from 'react'; // Importing the React library
import ReactDOM from 'react-dom/client'; // Importing the modern ReactDOM client API for rendering
import App from './App.jsx'; // Importing the main App component

// Rendering the App component inside the HTML element with the id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Helps highlight potential problems in an application */}
    <App /> {/* Rendering the main App component */}
  </React.StrictMode>,
);
