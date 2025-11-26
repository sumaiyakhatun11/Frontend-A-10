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
                path: "/games/:id",
                element: <GameDetails />,
            },
            {
                path: "/profile",
                element: <PrivateRoutes><Profile></Profile></PrivateRoutes>,
            },
            {
                path: "/forgotPassword/:email",
                element: <ForgotPassword></ForgotPassword>,
            },



        ]

    },

]);


export default router;