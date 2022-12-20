import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './components/App';
import MapperContextProvider from './globalVariables/MapperContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MapperContextProvider>
    {/* Mapper context component added */}
    <App />
  </MapperContextProvider>
);