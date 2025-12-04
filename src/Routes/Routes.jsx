import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Register from "../Pages/RegistrationPage/RegistrationPage";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import GameDetails from "../Pages/GameDetails/GameDetails";
import Profile from "../Pages/Profile/Profile";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import AboutUs from "../Components/AboutUs/AboutUs";
import AddServices from "../Pages/AddServices/AddServices";
import ViewDetails from "../Pages/ViewDetails/ViewDetails";
import Services from "../Pages/Services/Services";

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
                path: '/aboutUs',
                element: <AboutUs></AboutUs>
            },
            {
                path: "/games/:id",
                element: <GameDetails />,
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



        ]

    },

]);


export default router;