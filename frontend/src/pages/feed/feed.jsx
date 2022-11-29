import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import openSocket from 'socket.io-client';
import axios from 'axios';
import Nav from '../../components/nav/nav';
import Modal from '../../components/modal/modal';
import './feed.css';

const Feed = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [posts, setPosts] = useState([])
  const [postId, setPostId] = useState('');
  const [render, setRender] = useState(false);
  const headers = {
    'authorization': 'Bearer ' + localStorage.getItem('token')
  }

  useEffect(() => {
    axios.get('http://localhost:5000/posts', {headers})
    .then(res => {
      console.log(res);
      setPosts(res.data);
    })
    .catch(err => console.log(err));
    
    const socket = openSocket('http://localhost:5000');
    socket.on('posts', data => {
      if (data.action === 'create') {
        setPosts(data.post);
      } else if (data.action === 'update') {
        setPosts(data.post);
      }
    });
  }, [render]);

  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    setIsEdit(false);
    setPostId('');
  }

  const handleView = (postId) => {
    const id = postId;
    navigate(`/feed/post/${postId}`, { state: { id } });
  }

  const handleEdit = (postId) => {
    setIsOpen(true);
    setIsEdit(true);
    setPostId(postId);
  }

  const handleDelete = (postId) => {
    axios.post(`http://localhost:5000/post/delete/${postId}`, {}, {headers})
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setRender(!render);
          setPostId('');
          setIsEdit(false);
        } else {
          alert(res.statusText);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="feed-container">
      <Nav />
      <div className="new-post-container">
        <form action="" className='new-post-form'>
          <div className="new-post-form-control">
            <input type="text" name="newPost" id="newPost" />
            <button>UPDATE</button>
          </div>
          <div>
            <button className='new-post-btn' onClick={(e) => toggle(e)} >New Post</button>
            <Modal isOpen={isOpen} hide={toggle} isEdit={isEdit} postId={postId} />
          </div>
        </form>
      </div>
      <div className="post-container">
        {posts.length > 0 ? posts.map((post, i) => (
          <div className="post" key={i}>
            <div className="post-info">
              <h6 className="post-date">Created on {new Date(post.date).toLocaleDateString('en-gb')}</h6>
              <h3 className="post-title">{post.title}</h3>
            </div>
            <div className="post-buttons">
              <button onClick={() => handleView(post._id)}>View</button>
              <button onClick={() => handleEdit(post._id)}>Edit</button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
        </div>
        )): <div>No post found</div>}
      </div>
    </div>
  )
}

export default Feed;