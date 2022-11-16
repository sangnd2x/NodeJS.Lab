import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function AddProduct() {
    const cookie = new Cookies();
    const [productDetails, setProductDetails] = useState({
        title: '',
        imageUrl: '',
        price: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }
    console.log('from add product', productDetails);

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://localhost:5000/add-product';
        const options = {
            method: 'POST',
            body: JSON.stringify(productDetails),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        fetch(url, options).then(res => console.log(res)).catch(err => console.log(err));

        navigate('/shop');

    }

    if (!cookie.get('loggedIn')) {
        return (
            <div>
                <h1>You must log in to view this page!</h1>
            </div>
        );
    } else {
        return (
            <div>
                <div className="product-form">
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" name="imageUrl" id="imageUrl" onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" step="0.01" onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" rows="5" onChange={handleChange}></textarea>
                    </div>

                    <button className="btn" type="submit" onClick={handleSubmit}>Add Product</button>
                </div>
            </div>
        );
    }
}

export default AddProduct;