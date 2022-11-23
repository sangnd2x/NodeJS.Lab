import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './nav.css';

function Nav(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = new Cookies();
  const [loggedIn, setLoggedIn] = useState(cookie.get('loggedIn'));
  
  const handleSignUp = () => {
    navigate('/sign-up')
  }

	const handleLogIn = () => {
			navigate('/login');
	}

	const handleLogOut = () => {
		fetch('http://localhost:5000/logout', {
			method: 'POST',
			body: '',
			headers: {
					'Content-Type' : 'application/json'
			}
		})
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          cookie.remove('loggedIn');
          localStorage.removeItem('token');
          navigate('/login');
				}
			})
			.catch(err => console.log(err));
}

	if (loggedIn === 'true') {
		return (
			<div className='main-header'>
				<nav className='main-header__nav'>
					<ul className='main-header__item-list'>
						<li className='main-header__item'><a href="/shop">Shop</a></li>
						<li className='main-header__item'><a href="/products">Products</a></li>
						<li className='main-header__item'><a href="/cart">Cart</a></li>
						<li className='main-header__item'><a href="/orders">Orders</a></li>
						<li className='main-header__item'><a href="/add-product">Add Product</a></li>
						<li className='main-header__item'><a href="/admin-products">Admin Products</a></li>
					</ul>
					<ul className='main-header__item-buttons'>
						<button className='main-header__item-button' onClick={() => handleLogOut()} >Log Out</button>
					</ul>
				</nav>
			</div>
		);
	} else {
		return (
			<div className='main-header'>
				<nav className='main-header__nav'>
					<ul className='main-header__item-list'>
						<li className='main-header__item'><a href="/shop">Shop</a></li>
						<li className='main-header__item'><a href="/products">Products</a></li>
					</ul>
					<ul className='main-header__item-buttons'>
						<button className='main-header__item-button' onClick={() => handleLogIn()}>Log In</button>
						<button className='main-header__item-button' onClick={() => handleSignUp()}>Sign Up</button>
					</ul>
				</nav>
			</div>
		);
	}
}

export default Nav;