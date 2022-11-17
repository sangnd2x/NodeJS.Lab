import '../CSS/main.css';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Nav() {
	const navigate = useNavigate();
	const cookie = new Cookies();
	const [sessionCookie, setSessionCookie] = useState(cookie.get('loggedIn'));

	// useEffect(() => {
	//     setSessionCookie(cookie.get('loggedIn'));
	// }, [])
	
  console.log(sessionCookie);
  
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
        if (res.status === 200) {
          cookie.remove('loggedIn');
          navigate('/login');
				}
			})
			.catch(err => console.log(err));
}

	if (sessionCookie === 'true') {
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
						<button className='main-header__item-button' onClick={() => handleLogIn()}>Log in</button>
						<button className='main-header__item-button' onClick={() => handleSignUp()}>Sign Up</button>
					</ul>
				</nav>
			</div>
		);
	}
}

export default Nav;