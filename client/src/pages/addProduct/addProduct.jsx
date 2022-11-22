import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Nav from '../../components/navbar/nav';
import axios from 'axios';

function AddProduct() {
  const cookie = new Cookies();
  // const [productDetails, setProductDetails] = useState({
  //   title: '',
  //   price: '',
  //   img: '',
  //   description: ''
  // });
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDesciprtion] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("description", description);

    const url = 'http://localhost:5000/add-product';

    axios.post(url, formData)
      .then(res => {
        console.log(res);
      if (res.status === 200) {
          navigate('/shop')
      } else {
        alert(res.statusText);
        }
    })
      .catch(err => console.log(err));
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
        <Nav />
        <form className="product-form">
            <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control">
                <label htmlFor="image">Image URL</label>
                <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" step="0.01" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" rows="5" onChange={(e) => setDesciprtion(e.target.value)}></textarea>
            </div>

            <button className="btn" type="submit" onClick={handleSubmit}>Add Product</button>
        </form>
      </div>
    );
  }
}

export default AddProduct;