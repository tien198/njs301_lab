import { NavLink } from "react-router-dom";

// import '../../pages/root.css'
function NavBar() {
    return (
        <>
            <header className='main-header'>
                {/* <button id  ='side-menu-toggle'>Menu</button> */}
                <nav className="main-header__nav">
                    <ul className="main-header__item-list">
                        <li className="main-header__item">
                            <NavLink to={'/'} className={({ isActive }) => isActive ? 'active' : ''}>Shop</NavLink>
                        </li>
                        <li className="main-header__item">
                            <NavLink to='/products' className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink>
                        </li>
                        <li className="main-header__item">
                            <NavLink to='/cart' className={({ isActive }) => isActive ? 'active' : ''}>Cart</NavLink>
                        </li>
                        <li className="main-header__item">
                            <NavLink to='/order' className={({ isActive }) => isActive ? 'active' : ''}>Orders</NavLink>
                        </li>
                        <li className="main-header__item">
                            <NavLink to='/admin/add-product' className={({ isActive }) => isActive ? 'active' : ''}>Add Product</NavLink>
                        </li>
                        <li className="main-header__item">
                            <NavLink to='/admin/products' className={({ isActive }) => isActive ? 'active' : ''}>Admin Products</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>

            {/*
             <nav className="mobile-nav">
                <ul className="mobile-nav__item-list">
                    <li className="mobile-nav__item">
                        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/">Shop</NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/products">Products</NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/cart">Cart</NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/orders">Orders</NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/admin/add-product">Add Product</NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/admin/products">Admin Products</NavLink>
                    </li>
                </ul>
            </nav> 
            */}
        </>
    );
}

export default NavBar;