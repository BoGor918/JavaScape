import React from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapperContextProvider from '../globalVariables/MapperContextProvider';

function App() {

  return (
    <MapperContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </MapperContextProvider>
  );
}

export default App;
