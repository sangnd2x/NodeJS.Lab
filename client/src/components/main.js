import { Routes, Route } from 'react-router-dom';
import Nav from './nav';
import Shop from './shop';
import Product from './product';
import Orders from './orders';
import Cart from './cart';
import AddProduct from './add-product';
import AdminProduct from './admin-product';

function Main() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path='/shop' element={<Shop />} />
                <Route path='/product' element={<Product />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/admin-product' element={<AdminProduct />} />
                <Route index path='/' element={<Shop />} />
            </Routes>
        </div>
    );
}

export default Main;