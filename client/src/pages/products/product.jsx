import { useState, useEffect } from "react";
import axios from 'axios';
import Nav from '../../components/navbar/nav';
import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  console.log(products);

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
        }
    };

    fetch(url, options)
      .then(res => {
        if (res.status === 200) navigate('/cart')
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Nav />
      <div className="grid">
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
              <h2 className="product__price">$
                  { product.price }
              </h2>
              <p className="product__description">
                  { product.description }
              </p>
            </div>
            <div className="card__actions">
              <a href="/" className="btn">Details</a>
              <button className="btn" onClick={() => addToCart(product._id)}>Add to Cart</button>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default Product;