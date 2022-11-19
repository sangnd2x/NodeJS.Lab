import { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Nav from './nav';

const Login = () => {
	const navigate = useNavigate();
	const cookie = new Cookies();
	const [user, setUser] = useState({
		email: '',
		password: ''
  });
  const [loggedIn, setLoggedIn] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
  }

	const handleLogIn = (e) => {
		e.preventDefault(); 
		fetch('http://localhost:5000/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
					'Content-Type': 'application/json'
			}
		})
      .then(res => {
        // res.json()
        console.log(res)
				if (res.status !== 200) {
          return alert(res.statusText);
        } else {
          cookie.set('loggedIn', true, { path: '/' });
          setLoggedIn(cookie.get('loggedIn'));
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
          <label htmlFor="email">Email</label>
          <input type="text" placeholder='Email' name="email" onChange={(e) => handleChange(e)}/>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
          <button onClick={(e) => handleLogIn(e)}>Login</button>
        </form>
		  </div>
    </div>
  )
}

export default Login