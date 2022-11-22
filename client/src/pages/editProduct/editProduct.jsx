import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import '../../CSS/forms.css';
import '../../CSS/product.css';
import './editProduct.css';
import Nav from '../../components/navbar/nav';

function EditProduct(props) {
  const location = useLocation()
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    image: '',  
    price: '',
    description: ''
  });
  const [productId, setProductId] = useState(location.state.productId);
  const [errors, setErrors] = useState({
    title: false,
    imageUrl: false,
    price: false,
    description: false
  });
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDesciprtion] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetch = () => {
      axios(`http://localhost:5000/edit-product/${productId}`)
        .then(res => {
          setProduct(res.data);
          navigate(`/edit-product/${productId}`, { state: { product } });
        })
        .catch(err => console.log(err));
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target
    setProduct({ ...product, [name]: value });
  }

  // console.log(productDetails)

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_id", productId);
    formData.append("title", title);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("description", description);

    axios.post('http://localhost:5000/edit-product', formData)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          navigate('/admin-products');
        } else {
          console.log(res)
          if (res.statusText.toLocaleLowerCase().includes('title')) {
            setErrors({...errors, title : true});
          } else if (res.statusText.toLocaleLowerCase().includes('url')) {
            setErrors({...errors, imageUrl : true})
          } else if (res.statusText.toLocaleLowerCase().includes('price')) {
            setErrors({...errors, price : true})
          } else if (res.statusText.toLocaleLowerCase().includes('description')) {
            setErrors({...errors, description : true})
          }
          alert(res.statusText);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Nav />
      <div>
        <form className="product-form">
          <div className={errors.title? 'form-control-error' : 'form-control'}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title"
              defaultValue={product.title}
              // value={productDetails.title}
              onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={errors.imageUrl? 'form-control-error' : 'form-control'}>
            <label htmlFor="image">Image URL</label>
            <input type="file" name="image" id="image"
              defaultValue={product.imageUrl}
              // value={productDetails.imageUrl}
              onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className={errors.price? 'form-control-error' : 'form-control'}>
            <label htmlFor="price">Price</label>
            <input type="number" name="price" id="price" step="0.01"
              defaultValue={product.price}
              // value={productDetails.price}
              onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className={errors.description? 'form-control-error' : 'form-control'}>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" rows="5"
              defaultValue={product.description}
              // value={productDetails.description}
              onChange={(e) => setDesciprtion(e.target.value)}></textarea>
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