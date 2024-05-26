import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { FiShoppingCart } from "react-icons/fi";
import useCart from '../../../hooks/useCart'

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    const [carts] = useCart();

    const handleLogOut = () => {    
        logOut()
        .then((result) => {
            console.log(result)
            navigate('/');

        })
        .catch((error) => {
            console.log(error.message)
        })
    }
    const navOptions = <div className='flex items-center'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/order/salad">Order Food</Link></li>
        <li><Link to="/secret">Secret</Link></li>
        <li><Link to="/dashboard/cart"><button className="btn"><FiShoppingCart /><div className="badge badge-secondary">{carts.length}</div></button>
        </Link></li>
        {
            user ? <>
                <button onClick={handleLogOut} className='btn btn-ghost'>LogOut</button>
            </> :
            <>
                <li><Link to="/login">Login</Link></li>
            </>
        }
    </div>

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <div className="navbar max-w-screen-xl fixed text-white z-10 bg-opacity-0 bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-[24px] text-white font-bold">BISTRO BOSS</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                {user ? (
                        user.photoURL ? (
                            <img className='w-[50px] h-[50px] rounded-full' src={user.photoURL} alt="User Profile" />
                        ) : (
                            <div></div>
                        )
                    ) : (
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    )}
                </div>
                </div>
        </div>
    );
};

export default Navbar;