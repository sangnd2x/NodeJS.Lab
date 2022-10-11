import { Routes, Route, useParams } from 'react-router-dom';
import Nav from './nav';
import Shop from './shop';
import Product from './product';
import Orders from './orders';
import Cart from './cart';
import AddProduct from './add-product';
import AdminProduct from './admin-product';
import EditProduct from './edit-product';
import '../CSS/forms.css';
import '../CSS/product.css';
import '../CSS/main.css';

function Main() {
    const NewEditProduct = () => {
        const params = useParams();
        return (
            <EditProduct productId={params.productId} />
        );
    }

    return (
        <div>
            <Nav />
            <Routes>
                <Route path='/shop' element={<Shop/>} />
                <Route path='/products' element={<Product />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/admin-products' element={<AdminProduct />} />
                <Route path='/edit-product/:productId' element={<NewEditProduct />} />
                <Route index path='/' element={<Shop/>} />
            </Routes>
        </div>
    );
}

export default Main;