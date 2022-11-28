import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './modal.css';

const Modal = ({ isOpen, hide, isEdit, postId }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [postDetails, setPostDetails] = useState({});

  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${postId}`, {headers})
      .then(res => {
        setPostDetails(res.data);
      })
      .catch(err => console.log(err));
  }, [isEdit]);


  const handlePost = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('content', content);

    axios.post('http://localhost:5000/new-post', formData, {headers})
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          // navigate('/feed');
        } else {
          alert(res.statusText);
        }
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (postId) => {
    const id = postId;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('content', content);
    
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };

    axios.post(`http://localhost:5000/posts/edit/${id}`, formData, {headers})
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          navigate('/feed');
        } else {
          alert(res.statusText);
        }
      })
      .catch(err => console.log(err));
  };

  if (isOpen && isEdit) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">New Post</h4>
          </div>
          <div className="modal-body">
            <label htmlFor="">Title</label>
            <input type="text" name='title'
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={postDetails.title} />
            <label htmlFor="">Image</label>
            <input type="file" name='image'
              onChange={(e) => setImage(e.target.files[0])} />
            <label htmlFor="">Content</label>
            <textarea name="content" id="content" cols="30" rows="10"
              onChange={(e) => setContent(e.target.value)}
              defaultValue={postDetails.content}></textarea>
          </div>
          <div className="modal-footer">
            <button onClick={hide}>Cancel</button>
            <button onClick={() => handleEdit(postDetails._id)}>Update</button>
          </div>
        </div>
      </div>
    );
  } else if (isOpen) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">New Post</h4>
          </div>
          <div className="modal-body">
            <label htmlFor="">Title</label>
            <input type="text" name='title' onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="">Image</label>
            <input type="file" name='image' onChange={(e) => setImage(e.target.files[0])} />
            <label htmlFor="">Content</label>
            <textarea name="content" id="content" cols="30" rows="10" onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
          <div className="modal-footer">
            <button onClick={hide}>Cancel</button>
            <button onClick={() => handlePost()}>Post</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal