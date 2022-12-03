import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../../Context/ContextProvider';
import useAdmin from '../../../../Hooks/UseAdmin/UseAdmin';
import Navbar from '../../../Shere/Navbar/Navbar';

const DashbordLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="Dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="Dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to='/dashboard'>My Appointment</Link></li>
                        <li><Link to='/dashboard/users'>All Users</Link></li>


                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/adddoctor'>Add a doctor</Link></li>
                                <li><Link to='/dashboard/manageDoctors'>Manage Doctors</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashbordLayout;