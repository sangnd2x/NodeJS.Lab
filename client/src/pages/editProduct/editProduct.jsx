import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import '../../CSS/forms.css';
import '../../CSS/product.css';
import Nav from '../../components/navbar/nav';

function EditProduct(props) {
  const location = useLocation()
  // const [product, setProduct] = useState({});
  const [product, setProduct] = useState({
    title: '',
    imageUrl: '',
    price: '',
    description: ''
  });
  const [productId, setProductId] = useState(location.state.productId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = () => {
      axios(`http://localhost:5000/edit-product/${productId}`)
        .then(res => {
          setProduct(res.data);
          navigate(`/edit-product/${productId}`, { state: { product } });
        })
        .catch(err => console.log(err));
    }
    fetch();
  }, [])
  
  console.log(product);

  const handleChange = (e) => {
    const {name, value} = e.target
    setProduct({ ...product, [name]: value });
  }

  // console.log(productDetails)

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/edit-product', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(res => {
        console.log(res)
        navigate('/admin-products');
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Nav />
      <div>
        <form className="product-form">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title"
              defaultValue={product.title}
              // value={productDetails.title}
              onChange={(e) => handleChange(e)} />
          </div>
          <div className="form-control">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" name="imageUrl" id="imageUrl"
              defaultValue={product.imageUrl}
              // value={productDetails.imageUrl}
              onChange={(e) => handleChange(e)} />
          </div>
          <div className="form-control">
            <label htmlFor="price">Price</label>
            <input type="number" name="price" id="price" step="0.01"
              defaultValue={product.price}
              // value={productDetails.price}
              onChange={(e) => handleChange(e)} />
          </div>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" rows="5"
              defaultValue={product.description}
              // value={productDetails.description}
              onChange={(e) => handleChange(e)}></textarea>
          </div>
          {/* <div className="form-control">
            <input type="hidden" name="productId" id="productId"
              defaultValue={product._id}
              // value={productDetails.id}
              onChange={(e) => handleChange(e)} />
          </div> */}
          <button className="btn" onClick={(e) => handleUpdate(e)}>Update Product</button>
      </form>
      </div>
    </div>
  );
}

export default EditProduct;