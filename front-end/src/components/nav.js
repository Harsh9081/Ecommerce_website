import React from "react"
import { Link,useNavigate } from 'react-router-dom';
const Nav=()=>{
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup');
    }
    return(
        <div>
        <img alt="logo" className="logo" src="https://mpng.subpng.com/20180329/ase/kisspng-e-commerce-logo-business-web-design-cart-5abcd106e16586.1004000715223237189232.jpg"></img>
        {    auth ? <ul className="nav-ul">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/list'>Products</Link></li>
            <li><Link to='/add'>Add Product</Link></li>
            <li><Link to='/update'>Update Product</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
        </ul>
        :
        <ul className="nav-ul nav-right">
        <li><Link to='/signup'>Sign up</Link></li>
        <li><Link to='/login'>Login</Link></li>
        </ul>
    }
    </div>

    )
}

export default Nav;