import React, { useContext } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Stage from './Stage';
import { MapperContext } from '../globalVariables/MapperContextProvider';

export default function App() {
  // call data from mapper context js
  const {
    currentUserDataSet,
    authUser,
  } = useContext(MapperContext);

  return (
    <Router>
      <Routes>
        {/* Set up link path */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        {
          authUser === null ?
            <Route path="/stage" element={<Stage />} />
            :
            <Route path={"/stage/" + currentUserDataSet[1]} element={<Stage />} />
        }
      </Routes>
    </Router>
  );
}