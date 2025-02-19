import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaEnvelope, FaHome, FaList, FaSearch, FaUser, FaUtensils } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { MdRateReview } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from 'react';

const adminLinks = [
    { to: "/dashboard/adminHome", icon: <FaHome />, text: "Admin Home" },
    { to: "/dashboard/addItems", icon: <FaUtensils />, text: "Add Items" },
    { to: "/dashboard/bookings", icon: <FaBook />, text: "Manage Bookings" },
    { to: "/dashboard/manageItems", icon: <FaList />, text: "Manage Items" },
    { to: "/dashboard/users", icon: <FaUser />, text: "All Users" },
];

const sharedLinks = [
    { to: "/", icon: <FaHome />, text: "Home" },
    { to: "/order/salad", icon: <FaSearch />, text: "Menu" },
    { to: "/order/contact", icon: <FaEnvelope />, text: "Contact" },
];


const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    return (
        <div className='flex min-h-screen text-black bg-slate-300'>
            <DashboardSidebar isAdmin={isAdmin} cart={cart} />
            <div className='flex-1 ml-64 w-full'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

const DashboardSidebar = ({ isAdmin, cart }) => {
    const userLinks = [
        { to: "/dashboard/userHome", icon: <FaHome />, text: "User Home" },
        { to: "/dashboard/review", icon: <MdRateReview />, text: "My Review" },
        { to: "/dashboard/cart", icon: <FaShoppingCart />, text: `My Cart ${cart.length}` },
        { to: "/dashboard/paymentHistory", icon: <FaClipboardList />, text: "Real Payment History" },
    ];

    
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("bistro-boss-theme") === "dark";
    });

    const handleThemeChange = () => {
        setTheme(!theme);
        localStorage.setItem("bistro-boss-theme", !theme ? "dark" : "light");
    };

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme);
    }, [theme]);

    return (
        <div className="w-72 min-h-full bg-white fixed left-0 top-0 bottom-0">
            <ul className='menu'>
                {(isAdmin ? adminLinks : userLinks).map((link, index) => (
                    <li key={index}>
                        <NavLink to={link.to}>
                            {link.icon}
                            {link.text}
                        </NavLink>
                    </li>
                ))}
                <div className='divider'>OR</div>
                {sharedLinks.map((link, index) => (
                    <li key={index}>
                        <NavLink to={link.to}>
                            {link.icon}
                            {link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="flex items-center pl-6 space-x-2">
                <Switch id="airplane-mode" onClick={handleThemeChange}/>
                <label>Dark Theme</label>
            </div>
        </div>
    );
};