import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

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
            .then(data => {
                console.log(data);
                navigate('/cart');
            })
            .catch(err => console.log(err));
    }
    
    // Order
    const handleOrder = () => {
        const url = 'http://localhost:5000/create-order';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(url, options)
            .then(res => console.log(res))
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    return (
        <div className="grid">
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
            <form>
                <button type="submit" className="btn" onClick={() => handleOrder()}>Order Now!</button>
            </form>
        </div>
    );
}

export default Cart;
