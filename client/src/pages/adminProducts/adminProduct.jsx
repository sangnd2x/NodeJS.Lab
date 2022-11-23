import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Nav from '../../components/navbar/nav';

function AdminProduct() {
  const cookie = new Cookies();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // fetch all products from server
  useEffect(() => {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    axios.get('http://localhost:5000/admin/products', {headers})
      .then(res => {
        setProducts(res.data);
        console.log(res.status)
      })
      .catch(err => console.log(err));
  }, []);

  // delete product
  const handleDelete = (productId) => {
    const data = {
        productId: productId
    }

    const url = 'http://localhost:5000/delete-product';

    axios.post(url, data)
      .then(res => {
        navigate('/admin-products');
      })
      .catch(err => console.log(err));
      
  }

  // edit product
  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`, { state: { productId } })
  }

  if (!cookie.get('loggedIn')) {
    return (
        <div>
            <h1>You must log in to view this page!</h1>
        </div>
    )
  } else {
    return (
      <div>
        <Nav />
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
              <button className="btn" onClick={() => handleEdit(product._id)}>Edit</button>
              <button className="btn" onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))
        }
      </div>
      </div>
    );
  }
}

export default AdminProduct;