import React, { useContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MapperContext } from './globalVariables/MapperContextProvider';

// import all lazy load component
const Login = lazy(() => import('./components/Authentication/Login'));
const SignUp = lazy(() => import('./components/Authentication/SignUp'));
const Rank = lazy(() => import('./components/Rank/Rank'));
const Home = lazy(() => import('./components/Home'));
const Battle = lazy(() => import('./components/Battle'));
const Level01Intro = lazy(() => import('./components/Levels/Level01/Level01Intro'));
const Level02Intro = lazy(() => import('./components/Levels/Level02/Level02Intro'));
const Level01 = lazy(() => import('./components/Levels/Level01/Level01'));
const Level01Mobile = lazy(() => import('./components/Levels/Level01/Level01_Mobile'));
const Level02 = lazy(() => import('./components/Levels/Level02/Level02'));
const Level02Mobile = lazy(() => import('./components/Levels/Level02/Level02_Mobile'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const AllUserProfile = lazy(() => import('./components/Profile/AllUserProfile'));
const Forum = lazy(() => import('./components/Forum/ForumComponents/Forum'));
const ForumDetail = lazy(() => import('./components/Forum/ForumDetail'));
const Topic = lazy(() => import('./components/Topic/Topic'));
const AutoResearchSystem = lazy(() => import('./components/AutoResearchSystem'));
const Compiler = lazy(() => import('./components/Topic/Compiler'));
const Shop = lazy(() => import('./components/Shop/Shop'));
const Ability = lazy(() => import('./components/Shop/Ability'));
const PageNotFound = lazy(() => import('./components/PageNotFound'));

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
      <Suspense fallback={<></>}>
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
          <Route path="/ability" element={<Ability />} />
          <Route path="*" element={<PageNotFound />} />
          {/* levels link */}
          <Route path="/battle/level01" element={<Level01Intro />} />
          <Route path="/battle/level02" element={<Level02Intro />} />
          {/* gameplay link route */}
          {
            authUser !== null ?
              <>
                <Route path={"/battle/level01/" + currentUserDataSet[1]} element={<Level01 />} />
                <Route path={"/battle/level01/" + currentUserDataSet[1] + "/mobile"} element={<Level01Mobile />} />
                <Route path={"/battle/level02/" + currentUserDataSet[1]} element={<Level02 />} />
                <Route path={"/battle/level02/" + currentUserDataSet[1] + "/mobile"} element={<Level02Mobile />} />
              </> : <></>
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
      </Suspense>
    </Router>
  );
}