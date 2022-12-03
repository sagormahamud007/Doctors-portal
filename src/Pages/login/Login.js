import React, { useContext, useState } from 'react';
import { useForm, } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/ContextProvider';
import useToken from '../../useToken/useToken';

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { userSignIn } = useContext(AuthContext)
    const [loginUserEmail, setLoginUser] = useState('')
    const [token] = useToken(loginUserEmail)
    const [error, setError] = useState('')
    const { register, formState: { errors }, handleSubmit } = useForm();

    let from = location.state?.from?.pathname || "/";
    if (token) {
        navigate(from, { replace: true });
    }
    const handleLogin = data => {

        console.log(data);
        userSignIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                setError('')
                setLoginUser(data.email)
                console.log(user);
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            })
    }
    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className='text-xl text-center'>Login</h1>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email",
                                { required: "Email Address is required" })
                            }
                            className="input input-bordered w-full max-w-xs" />
                        {
                            errors.email && <p className='text-red-600'>
                                {errors.email?.message}</p>

                        }
                    </div>
                    <p className='text-red-600'>{error}</p>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password",
                            {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6th characters' }
                            })}
                            className="input input-bordered w-full max-w-xs" />

                        <label className="label"><span className="label-text">Forget Password</span></label>

                        {
                            errors.password && <p className='text-red-600'>
                                {errors.password?.message}</p>

                        }
                    </div>
                    <input className='btn btn-accent w-full' value='Login' type="submit" />
                </form>
                <p>New To Doctors Portal <Link className='text-secondary' to='/signup'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;