import { useState, useEffect } from "react";
import '../CSS/product.css';
import '../CSS/main.css';

function Shop(props) {
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

    // post a edit request to server
    const handleEdit = (productId) => {
        const id = {
            productId: productId
        };

        fetch(`http://localhost:5000/edit-product/${id}?edit=true`, {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
        console.log('clicked');
    }

    return (
        <div className="grid">
            {props.products.map(product => (
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
                        <a href={`/edit-product/${product.id}`} className="btn">Edit</a>
                    </div>
                </div>
            ))
            }
        </div>
    );
}

export default Shop;