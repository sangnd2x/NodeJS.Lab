import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/forms.css';
import '../CSS/product.css';

function EditProduct(props) {
    const [productDetails, setProductDetails] = useState({
        title: '',
        imageUrl: '',
        price: '',
        description: ''
    });


    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }


    return (
        <div>
            {props.product.map(prod => (
                <form className="product-form" key={prod.id}>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" value={prod.title} onChange={handleChange}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" name="imageUrl" id="imageUrl" value={prod.imageUrl} onChange={handleChange}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" step="0.01" value={prod.price} onChange={handleChange}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" rows="5" value={prod.description} onChange={handleChange}></textarea>
                    </div>

                    <button className="btn" type="submit">Update Product</button>
                </form>
            ))}
        </div>
    );
}

export default EditProduct;