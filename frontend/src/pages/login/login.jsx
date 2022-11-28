import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/nav/nav';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/login', user)
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          localStorage.setItem('token', res.data.accessToken);
          navigate('/feed');
        } else {
          alert(res.statusText);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="login-container">
      <Nav /> 
      <div className="login-form-container">
        <form className='login-form'>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="text" name='email' onChange={(e) => handleChange(e)}/>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={(e) => handleChange(e)}/>
          </div>
          <button className='login-btn' onClick={(e) => handleLogin(e)}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login