import React, { useContext } from 'react';
import SignUp from './components/Authentication/SignUp';
import Login from './components/Authentication/Login';
import Profile from './components/Profile/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Level01 from './components/Levels/Level01/Level01';
import { MapperContext } from './globalVariables/MapperContextProvider';
import Battle from './components/Battle';
import Level01Intro from './components/Levels/Level01/Level01Intro';
import Rank from './components/Rank';
import AllUserProfile from './components/Profile/AllUserProfile';
import Forum from './components/Forum/Forum';
import ForumDetail from './components/Forum/ForumDetail';
import Topic from './components/Topic/Topic';
import AutoResearchSystem from './components/AutoResearchSystem';
import Compiler from './components/Topic/Compiler';
import Shop from './components/Shop/Shop';

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
        <Route path="/autoresearch" element={<AutoResearchSystem />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/shop" element={<Shop />} />
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
          userData.map((user, i) => {
            return (
              <Route key={i} path={"/profile/" + user.Username} element={<AllUserProfile />} />
            )
          })
        }
        {/* all forum link */}
        {
          forumData.map((forum, i) => {
            return (
              <Route key={i} path={"/forum/" + forum.id} element={<ForumDetail />} />
            )
          })
        }
      </Routes>
    </Router>
  );
}