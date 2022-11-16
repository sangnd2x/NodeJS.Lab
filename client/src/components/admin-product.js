import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

function AdminProduct() {
    const cookie = new Cookies();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // fetch all products from server
    useEffect(() => {
        axios.get('http://localhost:5000/admin/products').then(res => setProducts(res.data)).catch(err => console.log(err));
    }, []);

    // delete product
    const handleDelete = (productId) => {
        const data = {
            productId: productId
        }

        const url = 'http://localhost:5000/delete-product';

        axios.post(url, data).then(res => {
            navigate('/admin-products');
        }).catch(err => console.log(err));
        
    }

    if (!cookie.get('loggedIn')) {
        return (
            <div>
                <h1>You must log in to view this page!</h1>
            </div>
        )
    } else {
        return (
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
                            <button href="/" className="btn">Details</button>
                            <a href={`/edit-product/${product._id}`} className="btn">Edit</a>
                            <button type="submit" className="btn" onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>
                    </div>
                ))
                }
            </div>
        );
    }
}

export default AdminProduct;