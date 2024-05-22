import {NavLink, Outlet} from 'react-router-dom';
import {FaHome, FaSearch} from 'react-icons/fa';
import {FaShoppingCart} from 'react-icons/fa';
import {FaCalendar} from 'react-icons/fa';
import { MdRateReview } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import useCart from '../../hooks/useCart';


const Dashboard = () => {
    const [cart] = useCart()
    return (
        <div className='flex text-black bg-slate-300'>
            {/* Dashboard Sidebar */}
            <div className="w-64 min-h-full bg-orange-400">
                <ul className='menu'>
                    <li>
                        <NavLink to="/dashboard/userHome">
                        <FaHome></FaHome>
                        User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reservation">
                        <FaCalendar></FaCalendar>
                        Reservation</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review">
                        <MdRateReview />
                        My Review</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart">
                        <FaShoppingCart></FaShoppingCart>
                        My Cart {cart.length}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart">
                        <FaClipboardList />
                        My Bookings</NavLink>
                    </li>
                    <div className='divider'>OR</div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <FaSearch></FaSearch>
                            Menu
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Dashboard Content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;