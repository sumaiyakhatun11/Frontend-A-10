import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { sendPasswordResetEmail } from 'firebase/auth';
import { showToast } from '../../Shared/toast';

const ForgotPassword = () => {
  const { auth } = useContext(AuthContext);

  const handleReset = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      showToast('Password reset link sent. Check your email.', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="flex justify-center items-center p-10 bg-white min-h-screen">
      <form
        onSubmit={handleReset}
        className="card shadow-xl p-6 space-y-4 w-full max-w-sm bg-base-100"
      >
        <h2 className="text-xl font-semibold text-center">
          Reset Password
        </h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email Address</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered"
            name="email"
            required
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
                     