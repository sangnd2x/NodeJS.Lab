import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/shop/shop';
import Product from './pages/products/product';
import Orders from './pages/order/orders';
import Cart from './pages/cart/cart';
import AddProduct from './pages/addProduct/addProduct';
import AdminProduct from './pages/adminProducts/adminProduct';
import EditProduct from './pages/editProduct/editProduct';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/shop' element={<Shop/>} />
        <Route path='/products' element={<Product />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/admin-products' element={<AdminProduct />} />
        <Route path='/edit-product/:productId' element={<EditProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} /> 
        <Route index path='/' element={<Shop/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
