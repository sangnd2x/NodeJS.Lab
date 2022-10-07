import { Routes, Route, useParams } from 'react-router-dom';
import Nav from './nav';
import Shop from './shop';
import Product from './product';
import Orders from './orders';
import Cart from './cart';
import AddProduct from './add-product';
import AdminProduct from './admin-product';
import EditProduct from './edit-product';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Main() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios('http://localhost:5000/products');

            setProducts(result.data);
        }

        fetch();
    }, []);

    const NewEditProduct = () => {
        const params = useParams();
        console.log(params)
        return (
            <EditProduct product={products.filter(product => product.id === params.productId)} />
        );
    }

    
    return (
        <div>
            <Nav />
            <Routes>
                <Route path='/shop' element={<Shop products={products} />} />
                <Route path='/products' element={<Product />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/admin-product' element={<AdminProduct />} />
                <Route path='/edit-product/:productId' element={<NewEditProduct />} />
                <Route index path='/' element={<Shop products={products}/>} />
            </Routes>
        </div>
    );
}

export default Main;