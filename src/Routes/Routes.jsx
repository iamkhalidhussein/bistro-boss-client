import { Suspense, lazy } from "react";
import {
    createBrowserRouter,
} from "react-router-dom";

import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from '../pages/Secret/Secret';

const Dashboard = lazy(() => import("../Layout/Dashboard/Dashboard"));
const Cart = lazy(() => import("../pages/Dashboard/Dashboard/Cart/Cart"));
const AllUsers = lazy(() => import("../Layout/Dashboard/AllUsers/AllUsers"));
const AddItems = lazy(() => import("../Layout/Dashboard/AddItems/AddItems"));
const ManageItems = lazy(() => import("../pages/Dashboard/ManageItems/ManageItems"));
const UpdateItem = lazy(() => import("../pages/Dashboard/UpdateItem/UpdateItem"));
const Payment = lazy(() => import("../pages/Dashboard/Payment/Payment"));
const PaymentHistory = lazy(() => import("../pages/Dashboard/PaymentHistory/PaymentHistory"));
const UserHome = lazy(() => import("../pages/Dashboard/UserHome/UserHome"));
import AdminRoute from '../Routes/AdminRoute'
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import { Review } from '@/pages/Dashboard/Dashboard/review/review';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category', 
                element: <Order></Order>
            }, 
            {
                path: '/login', 
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
                    <Suspense fallback={'loading'}>
                        <Dashboard/>
                    </Suspense>
                </PrivateRoute>,
        children: [
            //normal user routes
            {
                path: 'userHome',
                element: <Suspense><UserHome/></Suspense>
            },
            {
                path: 'review',
                element: <PrivateRoute>
                            <Suspense>
                                <Review/>
                            </Suspense>
                        </PrivateRoute>
            },
            {
                path: 'cart',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <PrivateRoute><Cart /></PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: 'payment',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Payment />
                    </Suspense>
                )
            },
            {
                path: 'paymentHistory',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <PaymentHistory />
                    </Suspense>
                )
            },
        
            // Admin only routes
            {
                path: 'adminHome',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminRoute><AdminHome /></AdminRoute>
                    </Suspense>
                )
            },
            {
                path: 'addItems',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminRoute><AddItems /></AdminRoute>
                    </Suspense>
                )
            },
            {
                path: 'users',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminRoute><AllUsers /></AdminRoute>
                    </Suspense>
                )
            },
            {
                path: 'manageItems',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminRoute><ManageItems /></AdminRoute>
                    </Suspense>
                )
            },
            {
                path: 'updateItem/:id',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminRoute><UpdateItem /></AdminRoute>
                    </Suspense>
                ),
                loader: ({ params }) => fetch(`https://bistro-boss-server-sigma-ruddy.vercel.app/menu/${params.id}`)
            }
        ]
    }
]);
