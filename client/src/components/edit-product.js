import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../CSS/forms.css';
import '../CSS/product.css';

function EditProduct(props) {
    const [product, setProduct] = useState({});
    const [productDetails, setProductDetails] = useState({
        id: '',
        title: '',
        imageUrl: '',
        price: '',
        description: ''
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const result = await axios(`http://localhost:5000/edit-product/${props.productId}?edit=true`);

            setProduct(result.data);
        }

        fetch();
        setProductDetails({
            id: product._id,
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            description: product.description
        })
    },[props.productId, product._id, product.title, product.imageUrl, product.price, product.description]);

    

    // console.log(product);
    console.log(productDetails);

    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
        console.log(productDetails);
    }

    const handleUpdate = (e) => {
        // e.preventDefault();

        fetch('http://localhost:5000/edit-product', {
            method: 'POST',
            body: JSON.stringify(productDetails),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            navigate('/admin-product');
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <form className="product-form">
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" defaultValue={product.title} onChange={handleChange}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" name="imageUrl" id="imageUrl" defaultValue={product.imageUrl} onChange={handleChange}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" step="0.01" defaultValue={product.price} onChange={handleChange}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" rows="5" defaultValue={product.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-control">
                    <input type="hidden" name="productId" id="productId" defaultValue={product._id} onChange={handleChange} />
                    </div>
                    <button className="btn" type="submit" onClick={handleUpdate}>Update Product</button>
                </form>
        </div>
    );
}

export default EditProduct;