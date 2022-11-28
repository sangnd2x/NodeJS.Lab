import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/nav/nav';
import Modal from '../../components/modal/modal';
import './feed.css';

const Feed = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(res => {
        console.log(res);
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  },[])

  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
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
            <Modal isOpen={isOpen} hide={toggle} />
          </div>
        </form>
      </div>
      <div className="post-container">
        {posts.map((post, i) => (
          <div className="post" key={i}>
            <div className="post-info">
              <h6 className="post-date">{post.date}</h6>
              <h3 className="post-title">{post.title}</h3>
            </div>
            <div className="post-buttons">
              <button>View</button>
              <button>Edit</button>
              <button>Delete</button>
            </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Feed;