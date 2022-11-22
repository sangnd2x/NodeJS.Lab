import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/navbar/nav';
import axios from "axios";
import './cart.css'

function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    }

    axios.get('http://localhost:5000/cart', {headers}, {withCredentials:true})
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // Delete cart item
  const handleDelete = (productId) => {
    const data = {
      productId: productId
    }

    const url = 'http://localhost:5000/cart/delete-product';

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
    };
    
    fetch(url, options)
      .then(res => {
        console.log(res);
        if (res.status === 200) navigate('/cart');
      })
      .catch(err => console.log(err));
  }
  
  // Order
  const handleOrder = (e) => {
    const url = 'http://localhost:5000/create-order';

    // const options = {
    //   method: 'POST',
    //   headers: {
    //       'Content-Type': 'application/json'
    //   }
    // };

    axios.post(url)
      .then(res => {
        if (res.status === 200) navigate('/orders');
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Nav />
      <div className="cart-container">
        <div className="product-container">
        {products.map(product => (
          <div className="card product-item" key={product.productId._id}>
            <div className="card__header">
              <h1 className="product__title">
                  { product.productId.title }
              </h1>
            </div>
            <div className="card__image">
              <img src={product.productId.imageUrl} alt={product.productId.title}/>
            </div>
            <div className="card__content">
              <h2 className="product__price">$
                  { product.productId.price }
              </h2>
              <p className="product__description">
                  { product.productId.description }
              </p>
              <p className="product__description">
                  Quantity: { product.quantity }
              </p>
            </div>
            <div className="card__actions">
              <a href="/" className="btn">Details</a>
              <a href={`/edit-product/${product.id}`} className="btn">Edit</a>
              <button className="btn" onClick={() => handleDelete(product.productId._id)}>Delete</button>
            </div>
          </div>
          ))
        }
      </div>
          <button className="btn" onClick={(e) => handleOrder(e)}>Order Now!</button>
      </div>
    </div>
  );
}

export default Cart;
