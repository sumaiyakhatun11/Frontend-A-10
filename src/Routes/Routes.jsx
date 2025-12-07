import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Register from "../Pages/RegistrationPage/RegistrationPage";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";

import Profile from "../Pages/Profile/Profile";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";

import AddServices from "../Pages/AddServices/AddServices";
import ViewDetails from "../Pages/ViewDetails/ViewDetails";
import Services from "../Pages/Services/Services";
import MyServices from "../Pages/MyServices/MyServices";
import UpdateServices from "../Pages/UpdateSercices/UpdateServices";
import MyOrders from "../Pages/MyOrders/MyOrders";
import Terms from "../Components/Terms/Terms";

let router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayouts></HomeLayouts>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {

                path: "/",
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <LoginPage></LoginPage>
            },
            {
                path: '/register',
                element: <RegistrationPage></RegistrationPage>
            },

            {
                path: "/viewDetails/:id",
                element: <PrivateRoutes><ViewDetails></ViewDetails></PrivateRoutes>,
            },
            {
                path: "/profile",
                element: <PrivateRoutes><Profile></Profile></PrivateRoutes>,
            },
            {
                path: "/forgotPassword/:email",
                element: <ForgotPassword></ForgotPassword>,
            },
            {
                path: "/addServices",
                element: <AddServices></AddServices>,
            },
            {
                path: "/services",
                element: <Services></Services>,
            },
            {
                path: "/myServices",
                element: <PrivateRoutes><MyServices></MyServices></PrivateRoutes>,
            },
            {
                path: "/updateServices/:id",
                element: <PrivateRoutes><UpdateServices></UpdateServices></PrivateRoutes>,
            },
            {
                path: "/myOrders",
                element: <PrivateRoutes><MyOrders></MyOrders></PrivateRoutes>,
            },
            {
                path: "/terms",
                element: <Terms></Terms>,
            },




        ]

    },

]);


export default router;