import '../CSS/main.css';

function Nav() {
    return (
        <div className='main-header'>
            <nav className='main-header__nav'>
                <ul className='main-header__item-list'>
                    {/* <div className='main-header__item-left'> */}
                        <li className='main-header__item'><a href="/shop">Shop</a></li>
                        <li className='main-header__item'><a href="/products">Products</a></li>
                        <li className='main-header__item'><a href="/cart">Cart</a></li>
                        <li className='main-header__item'><a href="/orders">Orders</a></li>
                        <li className='main-header__item'><a href="/add-product">Add Product</a></li>
                        <li className='main-header__item'><a href="/admin-products">Admin Products</a></li>
                    {/* </div> */}
                    {/* <div className="main-header__item-right"> */}
                        <li className='main-header__item'><a href="/login">Login</a></li>
                    {/* </div> */}
                </ul>
            </nav>
      </div>
    );
}

export default Nav;