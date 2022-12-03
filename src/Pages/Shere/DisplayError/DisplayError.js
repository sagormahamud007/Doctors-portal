import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/ContextProvider';


const DisplayError = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(result => {

            })
            .catch(() => {

            })
    }
    return (
        <div>
            <p className='text-red-500'>Something went wrong!!!</p>
            <p className='text-red-500'>{error.statusText || error.message}</p>
            <h4 className='text-3xl'><button onClick={handleLogOut}>Sign Out</button> and log beck in</h4>
        </div>
    );
};

export default DisplayError;