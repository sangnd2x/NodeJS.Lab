import { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Nav from '../../components/navbar/nav';

const Login = () => {
	const navigate = useNavigate();
	const cookie = new Cookies();
	const [user, setUser] = useState({
		username: '',
		password: ''
  });
  const [loggedIn, setLoggedIn] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
  }

	const handleLogIn = (e) => {
		e.preventDefault(); 
		axios.post('http://localhost:5000/login', user)
      .then(res => {
        // res.json()
        console.log(res)
				if (res.status !== 200) {
          return alert(res.statusText);
        } else {
          cookie.set('loggedIn', true, { path: '/' });
          setLoggedIn(cookie.get('loggedIn'));
          localStorage.setItem('token', res.data.accessToken);
          navigate('/', { state: loggedIn });
        }
      })
      // .then(data => console.log(data))
			.catch(err => console.log(err));
  }

	return (
    <div>
      <Nav loggedIn={loggedIn} /> 
      <div  className='login-form'>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder='Username' name="username" onChange={(e) => handleChange(e)}/>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
          <button onClick={(e) => handleLogIn(e)}>Login</button>
        </form>
		  </div>
    </div>
  )
}

export default Login