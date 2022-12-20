import React from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapperContextProvider from '../globalVariables/MapperContextProvider';
import Home from './Home';
import Stage from './Stage';

function App() {

  return (
    <Router>
      {/* Mapper context component added */}
      <MapperContextProvider>
        <Routes>
          {/* Set up link path */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stage" element={<Stage />} />
        </Routes>
      </MapperContextProvider>
    </Router>
  );
}

export default App;
