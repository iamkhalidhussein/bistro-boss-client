import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaEnvelope, FaHome, FaList, FaSearch, FaUser, FaUtensils } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa';
import { MdRateReview } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart();

    //TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    return (
        <div className='flex min-h-screen text-black bg-slate-300'>
            {/* Dashboard Sidebar */}
            <div className="w-64 min-h-full bg-orange-400 fixed left-0 top-0 bottom-0 ">
                <ul className='menu'>
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaUtensils></FaUtensils>
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaBook></FaBook>
                                    Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems">
                                    <FaList></FaList>
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUser></FaUser>
                                    All Users
                                </NavLink>
                            </li>
                        </> :
                        <>
                            <li>
                                <NavLink to="/dashboard/userHome">
                                    <FaHome></FaHome>
                                    User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/history">
                                    <FaCalendar></FaCalendar>
                                    Not History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/review">
                                    <MdRateReview />
                                    My Review
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/cart">
                                    <FaShoppingCart></FaShoppingCart>
                                    My Cart {cart.length}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymentHistory">
                                    <FaClipboardList />
                                    Real Payment History
                                </NavLink>
                            </li>
                        </>
                    }
                    {/* shared nav links */}
                    <div className='divider'>OR</div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Dashboard Content */}
            <div className='flex-1 ml-64 w-full'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
