import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/nav/nav';
import './postDetails.css'

const PostDetails = () => {
  const location = useLocation();
  const [postId, setPostId] = useState(location.state.id);
  const [postDetails, setPostDetails] = useState({});
  const headers = {
    'authorization': 'Bearer ' + localStorage.getItem('token')
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${postId}`, {headers})
      .then(res => {
        // console.log(res);
        setPostDetails(res.data);
      })
      .catch(err => console.log(err));
  },[])

  return (
    <div>
      <Nav />
      <div className="postDetails">
        <div className="postDetails-header">
          <h1 className="postDetails-header-title">{postDetails.title}</h1>
          <p className="postDetails-header-date">Created on {new Date(postDetails.date).toLocaleDateString('en-GB')}</p>
        </div>
        <hr />
        <div className="postDetails-body">
          <img src={postDetails.imageUrl} alt="" />
          <p className="postDetails-body-content">{postDetails.content}</p>
        </div>
      </div>
    </div>
  )
}

export default PostDetails