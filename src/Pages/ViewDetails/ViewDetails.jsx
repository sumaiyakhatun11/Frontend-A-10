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
    const [orderLoading, setOrderLoading] = useState(false);

    // Auth + Fetch Service
    useEffect(() => {
        if (loading) return;

        if (!user) {
            navigate("/login");
            return;
        }

        fetch(`https://backend-a10.vercel.app/services/${id}`)
            .then(res => res.json())
            .then(data => {
                setService(data);
                setServiceLoading(false);
            })
            .catch(err => {
                console.error("Service fetch failed:", err);
                setServiceLoading(false);
            });
    }, [user, loading, id, navigate]);

    // Dynamic title
    useEffect(() => {
        document.title = service?.name
            ? `${service.name} | Service Details`
            : "Service Details";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOrderLoading(true);

        const form = e.target;

        const order = {
            serviceId: service._id,
            productName: service.name,
            buyerName: form.buyerName.value,
            buyerEmail: form.buyerEmail.value,
            quantity: Number(form.quantity.value),
            price: Number(form.price.value),
            address: form.address.value,
            phone: form.phone.value,
            note: form.note.value,
            date: new Date().toLocaleDateString(),
        };

        try {
            await axios.post("https://backend-a10.vercel.app/orders", order);
            alert("Order placed successfully");
            form.reset();
            document.getElementById("my_modal_3").close();
        } catch (err) {
            console.error(err);
            alert("Failed to place order");
        } finally {
            setOrderLoading(false);
        }
    };

    return (
        <div className="container-custom section-padding">
            <motion.div
                className="max-w-4xl mx-auto"
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

                {/* Image */}
                <motion.img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                />

                {/* Price */}
                <p className="text-yellow-400 text-lg font-semibold mb-3">
                    Price: {service.price} tk
                </p>

                {/* Info */}
                <motion.div
                    className="bg-neutral-100 dark:bg-neutral-800 p-5 rounded-lg mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p><strong>Category:</strong> {service.category}</p>
                    <p><strong>Location:</strong> {service.location}</p>
                    <p><strong>Posted:</strong> {service.date}</p>
                    <p><strong>Contact:</strong> {service.email}</p>
                    <p className="mt-2">
                        <strong>Description:</strong> {service.description}
                    </p>
                </motion.div>

                {/* Buttons */}
                <div className="flex gap-4 flex-wrap">
                    <motion.button
                        onClick={() => navigate("/services")}
                        className="px-6 py-3 bg-neutral-600 hover:bg-neutral-500 text-white rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Back to Services
                    </motion.button>

                    <motion.button
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                        }
                    >
                        Adopt / Order Now
                    </motion.button>
                </div>
            </motion.div>

            {/* MODAL */}
            <dialog id="my_modal_3" className="modal backdrop-blur-sm">
                <motion.div
                    className="modal-box max-w-lg p-10 mt-6"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    {/* Close */}
                    <form method="dialog" className="flex justify-end">
                        <button className="text-xl font-bold">✕</button>
                    </form>

                    <h3 className="text-2xl font-semibold mb-6">
                        Adopt / Order Now
                    </h3>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                readOnly
                                name="productName"
                                defaultValue={service.name}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <input
                                name="buyerName"
                                defaultValue={user.displayName}
                                required
                                className="input input-bordered w-full"
                                placeholder="Your Name"
                            />
                        </div>

                        <div>
                            <input
                                name="buyerEmail"
                                defaultValue={user.email}
                                required
                                className="input input-bordered w-full"
                                placeholder="Email"
                            />
                        </div>

                        <div>
                            <input
                                type="number"
                                name="quantity"
                                min="1"
                                required
                                className="input input-bordered w-full"
                                placeholder="Quantity"
                            />
                        </div>

                        <div>
                            <input
                                readOnly
                                name="price"
                                defaultValue={service.price}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <input
                                name="address"
                                required
                                className="input input-bordered w-full"
                                placeholder="Address"
                            />
                        </div>

                        <div>
                            <input
                                name="phone"
                                required
                                className="input input-bordered w-full"
                                placeholder="Phone"
                            />
                        </div>

                        <div>
                            <textarea
                                name="note"
                                className="textarea textarea-bordered w-full"
                                placeholder="Additional note"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                disabled={orderLoading}
                                className="btn-primary w-full"
                            >
                                {orderLoading ? "Placing Order..." : "Place Order"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </dialog>
        </div>
    );
};

export default ViewDetails;
