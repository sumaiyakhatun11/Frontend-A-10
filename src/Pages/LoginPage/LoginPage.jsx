import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { showToast } from '../../Shared/toast';

const LoginPage = () => {
    const { user, login, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.title = "Login | PawMart";
    }, []);

    const validate = () => {
        const newErrors = {};
        
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            await login(email, password);
            showToast('Login successful!', 'success');
            navigate('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            showToast(`Login failed: ${errorMessage}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async () => {
        setEmail('demo@pawmart.com');
        setPassword('Demo321');
        
        setLoading(true);
        try {
            await login('demo@pawmart.com', 'Demo321');
            showToast('Logged in as demo user!', 'success');
            navigate('/');
        } catch (error) {
            showToast('Demo login failed. Please try manual login.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleContinueWithGoogle = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            showToast('Login successful!', 'success');
            navigate('/');
        } catch (error) {
            showToast(`Google login failed: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleForgot = () => {
        if (!email) {
            showToast('Please enter your email first', 'error');
            return;
        }
        navigate(`/forgotPassword/${email}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                        Welcome Back! 👋
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Log in to continue to PawMart
                    </p>
                </div>

                {/* Card */}
                <div className="card-standard">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                className={`input-standard ${errors.email ? 'border-red-500' : ''}`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors({ ...errors, email: '' });
                                }}
                                disabled={loading}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className={`input-standard pr-12 ${errors.password ? 'border-red-500' : ''}`}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors({ ...errors, password: '' });
                                    }}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={handleForgot}
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Demo Credentials Button */}
                    <button
                        type="button"
                        onClick={handleDemoLogin}
                        disabled={loading}
                        className="w-full mt-3 px-6 py-3 bg-accent/10 text-accent border-2 border-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        🎯 Try Demo Account
                    </button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        onClick={handleContinueWithGoogle}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span className="text-neutral-700 dark:text-neutral-200">
                            Continue with Google
                        </span>
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-center mt-6 text-neutral-600 dark:text-neutral-400">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-primary font-semibold hover:underline"
                        >
                            Sign up now
                        </Link>
                    </p>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    <p>By logging in, you agree to our</p>
                    <div className="flex gap-2 justify-center mt-1">
                        <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
                        <span>·</span>
                        <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;