import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts";
import DashboardLayout from "../Layouts/DashboardLayout";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/LoginPage/LoginPage";
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
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import DashboardOverview from "../Pages/Dashboard/DashboardOverview";

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
                path: "/about",
                element: <About></About>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/viewDetails/:id",
                element: <PrivateRoutes><ViewDetails></ViewDetails></PrivateRoutes>,
            },
            {
                path: "/forgotPassword/:email",
                element: <ForgotPassword></ForgotPassword>,
            },
            {
                path: "/services",
                element: <Services></Services>,
            },
            {
                path: "/terms",
                element: <Terms></Terms>,
            },
            {
                path: "/privacy",
                element: <Terms></Terms>, // Reusing Terms component for now
            },
            {
                path: "/help",
                element: <Terms></Terms>, // Reusing Terms component for now
            },
            {
                path: "/cookies",
                element: <Terms></Terms>, // Reusing Terms component for now
            },
        ]
    },
    // Dashboard Routes - Protected with Dashboard Layout
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <DashboardOverview />
            },
            {
                path: "add-listing",
                element: <AddServices />
            },
            {
                path: "my-listings",
                element: <MyServices />
            },
            {
                path: "update-listing/:id",
                element: <UpdateServices />
            },
            {
                path: "my-orders",
                element: <MyOrders />
            },
            {
                path: "profile",
                element: <Profile />
            }
        ]
    }
        ]
);

export default router;