import { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/order')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOrders(data);
            })
            .catch(err => console.log(err));
    },[]);

    return (
        <div className="grid">
            {orders.map(order => (
                <div key={order._id}>
                    {order.items.map(item => (
                    <div className="card product-item" key={item._id}>
                        <div className="card__header">
                            <h1 className="product__title">
                                { item.title }
                            </h1>
                        </div>
                        <div className="card__image">
                            <img src={item.imageUrl} alt={item.title}/>
                        </div>
                        <div className="card__content">
                            <h2 className="product__price">$
                                { item.price }
                            </h2>
                            <p className="product__description">
                                { item.description }
                            </p>
                            <p className="product__description">
                                Quantity: { item.quantity }
                            </p>
                        </div>
                        <div className="card__actions">
                            <a href="/" className="btn">Details</a>
                            <a href={`/edit-product/${item._id}`} className="btn">Edit</a>
                            <button className="btn">Delete</button>
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
    );
}

export default Orders;