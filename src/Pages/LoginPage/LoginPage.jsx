import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const LoginPage = () => {
    const { user, login, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                console.log(user)

                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorCode, errorMessage)
            });

    }

    const handleContinueWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result)

                navigate('/');
            })
            .catch(error => {
                alert(error.code + " - " + error.message);
            });


    }

    const handleForgot = () => {
        navigate(`/forgotPassword/${email}`)
    }

    return (

        <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
            <div>
                {user ? user.email : "nope"}
            </div>

            <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
                <h1 className="font-semibold text-2xl text-center mb-4">
                    Log in to Your Account
                </h1>

                <form onSubmit={handleLogin} className="space-y-4">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered"
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                            name='password'
                        />
                        <label className="label " onClick={handleForgot}>
                            <a className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-neutral w-full">
                            Login
                        </button>
                    </div>

                </form>
                <button onClick={handleContinueWithGoogle}>Continue with google</button>

                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-secondary font-semibold"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;