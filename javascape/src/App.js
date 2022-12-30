import React, { useContext } from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Level01 from './components/Levels/Level01/Level01';
import { MapperContext } from './globalVariables/MapperContextProvider';
import Battle from './components/Battle';
import Level01Intro from './components/Levels/Level01/Level01Intro';
import Rank from './components/Rank';
import AllUserProfile from './components/AllUserProfile';
import Forum from './components/Forum';
import ForumDetail from './components/ForumDetail';

export default function App() {
  // call data from mapper context js
  const {
    currentUserDataSet,
    authUser,
    userData,
    forumData,
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
        <Route path="/forum" element={<Forum />} />
        {/* levels link */}
        <Route path="/battle/level01" element={<Level01Intro />} />
        {/* gameplay link */}
        {
          authUser !== null ?
            <Route path={"/battle/level01/" + currentUserDataSet[1]} element={<Level01 />} /> :
            <></>
        }
        {/* all User Profile Link */}
        {
          userData.map((user) => {
            return (
              <Route path={"/profile/" + user.Username} element={<AllUserProfile />} />
            )
          })
        }
        {/* all forum link */}
        {
          forumData.map((forum) => {
            return (
              <Route path={"/forum/" + forum.id} element={<ForumDetail />} />
            )
          })
        }
      </Routes>
    </Router>
  );
}