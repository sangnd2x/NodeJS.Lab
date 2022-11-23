import { useEffect, useState } from "react";
import Nav from '../../components/navbar/nav';
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    axios('http://localhost:5000/orders', {headers})
      .then(res => {
          console.log(res.data);
          setOrders(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  
  const getInvoice = (orderId) => {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-type': 'application/pdf'
    }

    fetch(`http://localhost:5000/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-type': 'application/pdf'
      }
    })
      .then(res => res.blob())
      .then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.dowload = 'order.json';
        a.click();
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Nav />
      <div className="grid">
        {orders.map(order => (
          <div key={order._id}>
            {order.products.map(product => (
            <div className="card product-item" key={product._id}>
              <div className="card__header">
                <h1 className="product__title">
                    { product.product.title }
                </h1>
              </div>
              <div className="card__image">
                <img src={product.product.imageUrl} alt={product.product.title}/>
              </div>
              <div className="card__content">
                <h2 className="product__price">$
                    { product.product.price }
                </h2>
                <p className="product__description">
                    { product.product.description }
                </p>
                <p className="product__description">
                    Quantity: { product.quantity }
                </p>
              </div>
              <div className="card__actions">
                <a href="/" className="btn">Details</a>
                <a href={`/edit-product/${product._id}`} className="btn">Edit</a>
                <button className="btn">Delete</button>
                <button className="btn" onClick={() => getInvoice(order._id)}>Invoice</button>
              </div>
            </div>
            ))}
          </div>
            // <div className="card product-item" key={product.products.id}>
            //     <div className="card__header">
            //         <h1 className="product__title">
            //             { product.products.title }
            //         </h1>
            //     </div>
            //     <div className="card__image">
            //         <img src={product.products.imageUrl} alt={product.products.title}/>
            //     </div>
            //     <div className="card__content">
            //         <h2 className="product__price">$
            //             { product.products.price }
            //         </h2>
            //         <p className="product__description">
            //             { product.products.description }
            //         </p>
            //         <p className="product__description">
            //             Quantity: { product.products.orderItem.quantity }
            //         </p>
            //     </div>
            //     <div className="card__actions">
            //         <a href="/" className="btn">Details</a>
            //         <a href={`/edit-product/${product.products.id}`} className="btn">Edit</a>
            //         <button className="btn">Delete</button>
            //     </div>
            // </div>
            ))
        }
      </div>
    </div>
  );
}

export default Orders;