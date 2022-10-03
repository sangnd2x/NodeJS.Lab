import { useRef, useEffect, useState } from 'react';
import '../CSS/forms.css';
import '../CSS/product.css';

function AddProduct() {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState({
        title: '',
        imageUrl: '',
        price: '',
        description: ''
    });
    // const render = useRef(true);

    // useEffect(() => {
    //     if (render.current) {
    //         render.current = false;
    //     } else {
    //         fetch('http://localhost:5000/add-product', {
    //             method: 'POST',
    //             body: JSON.stringify(products),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //     }
    // }, [products]);

    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        const url = 'http://localhost:5000/add-product';
        const options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(products),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };
        
        setProducts(prev => ([...prev, productDetails]));

        fetch(url, options).then(res => console.log(res)).catch(err => console.log(err));

        e.preventDefault();
    }
    console.log(productDetails);
    console.log(products);

    return (
        <div>
            <div className="product-form">
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" onChange={handleChange}/>
                </div>
                <div className="form-control">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" name="imageUrl" id="imageUrl" onChange={handleChange}/>
                </div>
                <div className="form-control">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" step="0.01" onChange={handleChange}/>
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

export default AddProduct;