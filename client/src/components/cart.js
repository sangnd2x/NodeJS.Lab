import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/cart')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, []);

    console.log('from cart', products);

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
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    return (
        <div className="grid">
            {products.map(product => (
                <div className="card product-item" key={product.productData.id}>
                    <div className="card__header">
                        <h1 className="product__title">
                            { product.productData.title }
                        </h1>
                    </div>
                    <div className="card__image">
                        <img src={product.productData.imageUrl} alt={product.productData.title}/>
                    </div>
                    <div className="card__content">
                        <h2 className="product__price">$
                            { product.productData.price }
                        </h2>
                        <p className="product__description">
                            { product.productData.description }
                        </p>
                    </div>
                    <div className="card__actions">
                        <a href="/" className="btn">Details</a>
                        <a href={`/edit-product/${product.productData.id}`} className="btn">Edit</a>
                        <button className="btn" onClick={() => handleDelete(product.productData.id)}>Delete</button>
                    </div>
                </div>
                ))
            }
        </div>
    );
}

export default Cart;
