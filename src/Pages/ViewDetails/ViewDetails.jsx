import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import axios from "axios";

const ViewDetails = () => {
    const { user, loading } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [serviceLoading, setServiceLoading] = useState(true);

    //  Auth + Fetch service by ID
    useEffect(() => {
        if (!user && !loading) {
            navigate("/login");
            return;
        }

        fetch(`http://localhost:3000/services/${id}`)
            .then(res => res.json())
            .then(data => {
                setService(data);
                setServiceLoading(false);
            })
            .catch(err => {
                console.error("Service fetch failed ", err);
                setServiceLoading(false);
            });

    }, [user, loading, id, navigate]);

    //  Fix document title
    useEffect(() => {
        if (service?.name) {
            document.title = `${service.name} | Service Details`;
        } else {
            document.title = "Service Details";
        }
    }, [service]);


    if (loading || serviceLoading) {
        return (
            <div className="text-center mt-10 text-xl text-white">
                Loading...
            </div>
        );
    }

    if (!service) {
        return (
            <div className="text-center mt-10 text-xl text-red-400">
                Service not found!
            </div>
        );
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const id = service._id;
        const productName = form.productName.value;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const quantity = parseInt(form.quantity.value);
        const price = parseInt(form.price.value);
        const address = form.address.value;
        const phone = form.phone.value;
        const note = form.note.value;
        const date = new Date().toLocaleDateString();

        const order = {
            id,
            productName,
            buyerName,
            buyerEmail,
            quantity,
            price,
            address,
            phone,
            note,
            date
        }

        axios.post('http://localhost:3000/orders', order)
            .then(res => {
                console.log(res.data);
                alert('Order placed successfully');
                form.reset();
                // navigate('/myOrders');
            })
    }

    return (
        <motion.div
            className="max-w-4xl mx-auto px-6 py-10 text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            {/* Title */}
            <motion.h1
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
            >
                {service.name}
            </motion.h1>


            {/*Image */}
            <motion.img
                src={service.image}
                alt={service.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            />

            {/*Price */}
            <p className="text-yellow-400 text-lg font-semibold mb-3">
                Price: ${service.price}
            </p>


            {/*Info Card */}
            <motion.div
                className="bg-gray-900 p-5 rounded-lg mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >

                <p className="mb-2">
                    <span className="font-semibold">Category:</span> {service.category}
                </p>

                <p className="mb-2">
                    <span className="font-semibold">Location:</span> {service.location}
                </p>

                <p className="mb-2">
                    <span className="font-semibold">Posted:</span> {service.date}
                </p>

                <p className="mb-3">
                    <span className="font-semibold">Contact:</span> {service.email}
                </p>

                <p className="text-gray-300">
                    <span className="font-semibold text-white">Description:</span>{" "}
                    {service.description}
                </p>

            </motion.div>


            {/*Buttons */}
            <motion.div className="flex gap-4">

                <motion.button
                    onClick={() => navigate("/services")}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Back to Services
                </motion.button>

                <motion.button className="text-black">
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box p-4">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                                <p className="text-lg font-semibold mb-2">Order Details</p>

                                {/* Product Name */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        name="productName"
                                        defaultValue={service?.name}
                                        readOnly
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Buyer Name */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1">Buyer Name</label>
                                    <input
                                        type="text"
                                        name="buyerName"
                                        defaultValue={user?.displayName}
                                        className="input input-bordered w-full"
                                        placeholder="Your name"
                                    />
                                </div>

                                {/* Buyer Email */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1">Buyer Email</label>
                                    <input
                                        type="email"
                                        name="buyerEmail"
                                        defaultValue={user?.email}
                                        className="input input-bordered w-full"
                                        placeholder="Email"
                                    />
                                </div>

                                {/* Quantity */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        className="input input-bordered w-full"
                                        placeholder="Quantity"
                                        min="1"
                                    />
                                </div>

                                {/* Price */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        defaultValue={`${service?.price}`}
                                        readOnly
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Address */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="input input-bordered w-full"
                                        placeholder="Address"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="input input-bordered w-full"
                                        placeholder="Phone"
                                    />
                                </div>

                                {/* Additional Note */}
                                <div className="flex flex-col items-start">
                                    <label className="text-sm mb-1">Additional Note</label>
                                    <textarea
                                        name="note"
                                        rows="2"
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Additional Note"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button type="submit" className="btn btn-primary w-full mt-3">
                                    Place Order
                                </button>
                            </form>
                        </div>
                    </dialog>

                </motion.button>

            </motion.div>



        </motion.div>

    );
};

export default ViewDetails;
