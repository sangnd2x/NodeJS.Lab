import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Feed from './pages/feed/feed';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import PostDetails from './pages/postDetails/postDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/post/:postId' element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
