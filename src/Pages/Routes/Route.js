import { createBrowserRouter } from "react-router-dom";
import Appoinment from "../Appointment/Appointment/Appoinment"
import Home from "../Home/Home/Home";
import AddDoctor from "../Layout/Main/DashbordLayout/AddDoctor/AddDoctor";
import AllUser from "../Layout/Main/DashbordLayout/AllUser";
import DashbordLayout from "../Layout/Main/DashbordLayout/DashbordLayout";
import ManageDoctors from "../Layout/Main/DashbordLayout/manageDoctors/ManageDoctors";
import MyAppointment from "../Layout/Main/DashbordLayout/MyAppointment/MyAppointment";
import Payment from "../Layout/Main/DashbordLayout/Payment/Payment";
import Main from "../Layout/Main/Main";
import Login from "../login/Login";
import AdminRouter from "../PrivateRouter/AdminRouter/AdminRouter";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import DisplayError from "../Shere/DisplayError/DisplayError";
import SignUp from "../SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <DisplayError></DisplayError>,
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
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
                path: '/appointment',
                element: <Appoinment></Appoinment>
            }
        ]
    },
    {
        path: '/dashboard',
        errorElement: <DisplayError></DisplayError>,
        element: <PrivateRouter><DashbordLayout></DashbordLayout></PrivateRouter>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/users',
                element: <AllUser></AllUser>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AddDoctor></AddDoctor>
            },
            {
                path: '/dashboard/manageDoctors',
                element: <AdminRouter><ManageDoctors></ManageDoctors></AdminRouter>
            },
            {
                path: '/dashboard/payment/:id',
                element: <AdminRouter><Payment></Payment></AdminRouter>,
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`)
            },
        ]
    }
])