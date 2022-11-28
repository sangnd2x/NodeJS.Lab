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
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/login', user)
      .then(res => {
        console.log(res);
        if (res.status !== 200) {
          return 
        } else {
          localStorage.setItem('token', res.data.accessToken);
          navigate('/feed');
        }
      })
      .catch(err => {
        if (err.response.statusText.includes('email')) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }

        if (err.response.statusText.includes('password')) {
          setPasswordError(true);
        } else {
          setPasswordError(false);
        }
      });
  }

  return (
    <div className="login-container">
      <Nav /> 
      <div className="login-form-container">
        <form className='login-form'>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="text" name='email'
              onChange={(e) => handleChange(e)}
              style={{border: emailError? '2px solid red' : ''}} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={(e) => handleChange(e)}
              style={{ border: passwordError ? '2px solid red' : '' }} />
          </div>
          <button className='login-btn' onClick={(e) => handleLogin(e)}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login