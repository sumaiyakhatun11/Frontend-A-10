import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { showToast } from '../../Shared/toast';

const RegistrationPage = () => {
    const { setUser, createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        photo: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.title = "Sign Up | PawMart";
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.photo.trim()) {
            newErrors.photo = 'Photo URL is required';
        } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.photo)) {
            newErrors.photo = 'Please enter a valid image URL';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else {
            if (formData.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters';
            } else if (!/[A-Z]/.test(formData.password)) {
                newErrors.password = 'Password must contain at least one uppercase letter';
            } else if (!/[a-z]/.test(formData.password)) {
                newErrors.password = 'Password must contain at least one lowercase letter';
            }
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            const userCredential = await createUser(formData.email, formData.password);
            
            // Update profile with name and photo
            await updateUserProfile(formData.name, formData.photo);
            
            setUser(userCredential.user);
            showToast('Registration successful! Welcome to PawMart! 🎉', 'success');
            navigate('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            if (errorCode === 'auth/email-already-in-use') {
                showToast('This email is already registered. Please login instead.', 'error');
            } else {
                showToast(`Registration failed: ${errorMessage}`, 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleContinueWithGoogle = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            showToast('Registration successful! Welcome! 🎉', 'success');
            navigate('/');
        } catch (error) {
            showToast(`Google sign-up failed: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const passwordStrength = () => {
        const { password } = formData;
        if (!password) return { strength: 0, label: '' };
        
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
        const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
        
        return { 
            strength: Math.min(strength, 4), 
            label: labels[Math.min(strength, 4)],
            color: colors[Math.min(strength, 4)]
        };
    };

    const strength = passwordStrength();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                        Join PawMart! 🐾
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Create your account and start your journey
                    </p>
                </div>

                {/* Card */}
                <div className="card-standard">
                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="enter your full name"
                                className={`input-standard ${errors.name ? 'border-red-500' : ''}`}
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your.email@example.com"
                                className={`input-standard ${errors.email ? 'border-red-500' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Photo URL Field */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                name="photo"
                                placeholder="https://example.com/photo.jpg"
                                className={`input-standard ${errors.photo ? 'border-red-500' : ''}`}
                                value={formData.photo}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            {errors.photo && (
                                <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
                            )}
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                Provide a URL to your profile picture
                            </p>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Create a strong password"
                                    className={`input-standard pr-12 ${errors.password ? 'border-red-500' : ''}`}
                                    value={formData.password}
                                    onChange={handleChange}
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
                            
                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded ${
                                                    level <= strength.strength ? strength.color : 'bg-neutral-200 dark:bg-neutral-700'
                                                }`}
                                            ></div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                        Password strength: {strength.label}
                                    </p>
                                </div>
                            )}
                            <ul className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 space-y-1">
                                <li>• At least 6 characters</li>
                                <li>• Include uppercase and lowercase letters</li>
                            </ul>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Re-enter your password"
                                className={`input-standard ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
                                Or sign up with
                            </span>
                        </div>
                    </div>

                    {/* Google Sign Up */}
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

                    {/* Login Link */}
                    <p className="text-center mt-6 text-neutral-600 dark:text-neutral-400">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-primary font-semibold hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    <p>By signing up, you agree to our</p>
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

export default RegistrationPage;