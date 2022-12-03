
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/ContextProvider';
import toast from 'react-hot-toast';
import useToken from '../../useToken/useToken';

const SignUp = () => {
    const { createUser, userName } = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [createdUser, setCreatedUser] = useState('')
    const [token] = useToken(createdUser)
    if (token) {
        navigate('/')
    }
    const { register, formState: { errors }, handleSubmit } = useForm()
    const handleRegister = data => {
        const spacify = data.
            createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast('User Create Successfully');
                const userInfo = {
                    displayName: data.name
                }

                userName(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                    })
                    .catch(err => console.error(err))
            })

            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            })
    }
    const saveUser = (name, email) => {
        const users = { name, email }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(users)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUser(email)
            })
    }


    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className='text-xl text-center'>SignUp</h1>

                <form onSubmit={handleSubmit(handleRegister)} >
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: 'Must be your name'
                        })} className="input input-bordered w-full max-w-xs" />
                        <span>{errors.name && <p className='text-red-600'>{errors.name?.message}</p>}</span>
                    </div>
                    <p className='text-red-600'>{error}</p>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" {...register("email",
                            {
                                required: 'Email is required'
                            })} className="input input-bordered w-full max-w-xs" />
                        <span>{errors.email && <p className='text-red-600'>{errors.email?.message}</p>}</span>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type='password' {...register("password",
                            {
                                minLength: {
                                    value: 6, message: 'Password must be 6th character'
                                },
                                pattern: { value: /^(?=.*[A-Z])/, message: 'Password must be Uppercase' }
                            })} className="input input-bordered w-full max-w-xs" />
                        <span>{errors.password && <p className='text-red-600'>{errors.password?.message}</p>}</span>
                    </div>
                    <input className='btn btn-accent w-full' value='Sign Up' type="submit" />
                </form>
                <p>Already have an account? <Link className='text-secondary' to='/login'>Please login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;