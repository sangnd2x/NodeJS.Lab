import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/sign-up', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 4000) {
          alert('Email is already used!');
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }
  
  return (
    <div  className='signup-form'>
			<form>
				<label htmlFor="username">Username</label>
				<input type="text" placeholder='Username' name="username" onChange={(e) => handleChange(e)}/>
				<label htmlFor="email">Email</label>
				<input type="text" placeholder='Password' name="email" onChange={(e) => handleChange(e)} />
				<label htmlFor="password">Password</label>
				<input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
				<button onClick={(e) => handleSignUp(e)}>Sign Up</button>
			</form>
		</div>
  )
}

export default SignUp