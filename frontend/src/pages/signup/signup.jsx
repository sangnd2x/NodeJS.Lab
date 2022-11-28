import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/nav/nav';
import axios from 'axios';
import './signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/sign-up', user)
      .then(res => {
        if (res.status === 200) {
          navigate('/login');
        } else {
          alert(res.statusText);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="signup-container">
      <Nav /> 
      <div className="signup-form-container">
        <form className='signup-form'>
          <div className="form-control">
            <label htmlFor="email">Your Email</label>
            <input type="text" name="email" onChange={(e) => handleChange(e)}/>
          </div>
          <div className="form-control">
            <label htmlFor="name">Your Name</label>
            <input type="text" name="name" onChange={(e) => handleChange(e)}/>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={(e) => handleChange(e)}/>
          </div>
          <button className='signup-btn' onClick={(e) => handleSignUp(e)}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup