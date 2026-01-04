import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [message, setMessage] = useState("");

    const handleUpdate = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateUserProfile(name, photo)
            .then(() => setMessage("Profile updated successfully"))
            .catch(() => setMessage("Update failed"));
    };
    useEffect(() => {
        document.title = "Profile | Game Hub";
    }, []);
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center">
            <div className="container-custom section-padding w-full flex justify-center">
            <div className="max-w-md w-full p-6 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

                {user?.photoURL && (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || "User Photo"}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                )}

                <p className="mb-2"><strong>Name:</strong> {user?.displayName || "N/A"}</p>
                <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
                <button
                    onClick={handleUpdate}
                    className="btn-primary w-full"
                >
                    Update Your Profile
                </button>
            </div>



            {isOpen && (

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md w-80 text-neutral-900 dark:text-white"
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New Name"
                        className="border w-full p-2 mb-3 rounded-xl"
                        required
                    />

                    <input
                        type="text"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        placeholder="New Photo URL"
                        className="border w-full p-2 mb-3 rounded-xl"
                        required
                    />

                    <button
                        type="submit"
                        className="btn-primary w-full"
                    >
                        Save Changes
                    </button>

                    {message && <p className="mt-3 text-center">{message}</p>}
                </form>
            )}
            </div>
            
        </div>
    );
};

export default Profile;
