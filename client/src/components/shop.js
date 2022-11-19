import { useState, useEffect } from "react";
import axios from 'axios';
import '../CSS/product.css';
import '../CSS/main.css';
import Nav from "./nav";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

function Shop() {
  const cookie = new Cookies();
  const [products, setProducts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(cookie.get('loggedIn'));

	useEffect(() => {
		axios.get('http://localhost:5000/products').then(res => setProducts(res.data)).catch(err => console.log(err));
	}, []);

	const addToCart = (productId) => {

		const data = {
				productId: productId
		}
		const url = 'http://localhost:5000/cart';
		const options = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
					'Content-Type': 'application/json'
      },
      credentials: 'include'
		};

		fetch(url, options).then(res => res.json()).catch(err => console.log(err));
	}

	return (
    <div className="grid">
      <Nav loggedIn={loggedIn} />
			{products.map(product => (
				<div className="card product-item" key={product._id}>
						<div className="card__header">
								<h1 className="product__title">
										{ product.title }
								</h1>
						</div>
						<div className="card__image">
								<img src={product.imageUrl} alt={product.title}/>
						</div>
						<div className="card__content">
								<h2 className="product__price">
										{ product.price }
								</h2>
								<p className="product__description">
										{ product.description }
								</p>
						</div>
						<div className="card__actions">
								<a href="/" className="btn">Details</a>
								<a href="/cart" className="btn" onClick={() => addToCart(product._id)}>Add to Cart</a>
						</div>
				</div>
				))
			}
		</div>
	);
}

export default Shop;