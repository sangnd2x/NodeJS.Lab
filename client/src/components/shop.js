import { useState, useEffect } from "react";
import '../CSS/product.css';
import '../CSS/main.css';

function Shop() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products').then(res => res.json()).then(data => {
            setProducts(data);
        });
    },[])
    
    console.log(products);
    return (
        <div className="grid">
            {products.map(product => (
                <div className="card product-item" key={products.indexOf(product)}>
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
                    </div>
                </div>
            ))
            }
        </div>
    );
}

export default Shop;