import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { showToast } from '../../Shared/toast';

const AddServices = () => {

    const { user } = useContext(AuthContext)

    useEffect(() => {
        document.title = "Add Service | PawMart";
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const price = parseInt(form.price.value);
        const location = form.location.value;
        const description = form.description.value;
        const image = form.image.value;
        const date = form.date.value;
        const email = form.email.value;

        const services = {
            name, category, price, location, description, image, date, email
        };

        console.log(services);

        axios.post('http://localhost:3000/services', services)
            .then(res => {
                console.log(res.data);
                showToast('Service added successfully', 'success');
                form.reset();
            })
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg m-10 text-black">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Add Product / Pet
            </h2>

            <form className="space-y-4 bg-white text-black" onSubmit={handleSubmit}>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Product / Pet Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option>Pets</option>
                        <option>Food</option>
                        <option>Accessories</option>
                        <option>Care Products</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Price
                    </label>
                    <input
                        name="price"
                        type="number"
                        placeholder="0"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Location
                    </label>
                    <input
                        name="location"
                        type="text"
                        placeholder="Enter location"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Enter description"
                        rows="4"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Image URL
                    </label>
                    <input
                        name="image"
                        type="text"
                        placeholder="Enter image URL"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Pick Up Date
                    </label>
                    <input
                        name="date"
                        type="date"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Submit */}
                <div className="text-center mt-4">
                    <button
                        type="submit"
                        className="bg-[#5b2501] text-white px-6 py-2 rounded hover:bg-[#7a3a01] transition"
                    >
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddServices;
