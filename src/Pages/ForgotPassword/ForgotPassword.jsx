import React, { } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../../Firebase/firebase.config';

const ForgotPassword = () => {
    const { email } = useParams()
    const auth = getAuth(app)
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset link has been sent')
                navigate('/login');

            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className='flex flex-col justify-center items-center p-30 bg-white'>
            <form onSubmit={handleReset} className="card bg-base-100 shadow-xl p-6 space-y-4 w-full max-w-sm   bg-gray-400">

                <h2 className="text-xl font-semibold text-center">
                    Reset Password
                </h2>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email Address</span>
                    </label>
                    <input
                        type="email"
                        placeholder='enter email'
                        className="input input-bordered"
                        defaultValue={email}
                        name='email'
                    />
                </div>

                <button type="submit" className="btn btn-neutral w-full">
                    Send Reset Link
                </button>

            </form>


        </div>
    );
};

export default ForgotPassword;