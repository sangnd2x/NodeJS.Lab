import { useState, useEffect } from "react";
import axios from 'axios';

function AdminProduct() {
    const [products, setProducts] = useState([]);

    // fetch all products from server
    useEffect(() => {
        const fetch = async () => {
            const result = await axios('http://localhost:5000/products').catch(err => console.log(err));
            setProducts(result.data);
        }
        fetch();
    }, []);

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
                        <a href={`/edit-product/${product.id}`} className="btn">Edit</a>
                    </div>
                </div>
            ))
            }
        </div>
    );
}

export default AdminProduct;