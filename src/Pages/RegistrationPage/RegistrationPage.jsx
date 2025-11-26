import React, { useContext, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';


const RegistrationPage = () => {
    const { setUser, createUser, signInWithGoogle } = useContext(AuthContext);


    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(e.target)
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const email = form.email.value;

        console.log(name, photo, email, password)

        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if (password.length < 6) {
            alert("Password Must Have 6 Character ")
        }
        if (!uppercase.test(password)) {
            alert("Password Must Have an Uppercase letter")
        }
        if (!lowercase.test(password)) {
            alert("Password Must Have an Lowercase letter")
        }


        createUser(email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                //console.log(user)
                setUser(user)
                navigate('/');
                alert("Registration Successful")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
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




    return (
        <div className="hero bg-base-200 min-h-screen flex items-center justify-center">

            <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
                <h1 className="font-semibold text-2xl text-center mb-4">
                    Create Your Account
                </h1>

                <form onSubmit={handleRegister} className="space-y-4">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered"
                            name='name'
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Photo URL"
                            className="input input-bordered"
                            required
                            name='photo'
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered"
                            required
                            name='email'
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
                            required
                            name='password'
                        />
                    </div>

                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-neutral w-full">
                            Register
                        </button>
                    </div>

                </form>

                <button onClick={handleContinueWithGoogle}>Sign up with google</button>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-secondary font-semibold"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationPage;