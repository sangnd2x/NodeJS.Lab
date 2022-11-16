import { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Login = () => {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

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
                console.log(res);
                if (res.status === 200) {
                    cookie.set('loggedIn', true, { path: '/' });
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div  className='login-form'>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder='Username' name="username" onChange={(e) => handleChange(e)}/>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
                <button onClick={(e) => handleLogIn(e)}>Login</button>
            </form>
        </div>
  )
}

export default Login