import '../CSS/main.css';

function Nav() {
    return (
        <div className='main-header'>
            <nav className='main-header__nav'>
            <ul className='main-header__item-list'>
                <li className='main-header__item'><a href="/shop">Shop</a></li>
                <li className='main-header__item'><a href="/product">Products</a></li>
                <li className='main-header__item'><a href="/cart">Cart</a></li>
                <li className='main-header__item'><a href="/orders">Orders</a></li>
                <li className='main-header__item'><a href="/add-product">Add Product</a></li>
                <li className='main-header__item'><a href="/admin-product">Admin Products</a></li>
            </ul>
            </nav>
      </div>
    );
}

export default Nav;