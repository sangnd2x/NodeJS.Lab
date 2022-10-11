import { useState, useEffect } from "react";
import axios from 'axios';
import '../CSS/product.css';
import '../CSS/main.css';

function Shop(props) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const result = await axios('http://localhost:5000/products').catch(err => console.log(err));
            setProducts(result.data);
        }
        fetch();
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
            }
        };

        fetch(url, options).then(res => res.json()).catch(err => console.log(err));
    }

    return (
        <div className="grid">
            {products.map(product => (
                <div className="card product-item" key={product.id}>
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
                        <a href="/cart" className="btn" onClick={() => addToCart(product.id)}>Add to Cart</a>
                    </div>
                </div>
            ))
            }
        </div>
    );
}

export default Shop;