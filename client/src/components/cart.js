import { useState, useEffect } from "react";
import axios from 'axios';

function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios('http://localhost:5000/cart').catch(err => console.log(err));
            setProducts(result.data);
        }
        fetch();
    }, []);

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
                    </div>
                </div>
                ))
            }
        </div>
    );
}

export default Cart;
