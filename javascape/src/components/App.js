import React, { useContext } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Level01 from './Levels/Level01/Level01';
import { MapperContext } from '../globalVariables/MapperContextProvider';
import Battle from './Battle';
import Level01Intro from './Levels/Level01/Level01Intro';
import Rank from './Rank';

export default function App() {
  // call data from mapper context js
  const {
    currentUserDataSet,
    authUser,
  } = useContext(MapperContext);

  return (
    <Router>
      <Routes>
        {/* common link */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/rank" element={<Rank />} />
        {/* levels link */}
        <Route path="/battle/level01" element={<Level01Intro />} />
        {/* gameplay link */}
        {
          authUser !== null ?
            <Route path={"/battle/level01/" + currentUserDataSet[1]} element={<Level01 />} /> :
            <></>
        }
      </Routes>
    </Router>
  );
}