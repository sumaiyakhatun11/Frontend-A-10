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

  // Fetch service
  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get(`https://backend-a10.vercel.app/services/${id}`)
      .then((res) => {
        setService(res.data);
        setServiceLoading(false);
      })
      .catch((err) => {
        console.error("Service fetch failed:", err);
        setServiceLoading(false);
      });
  }, [user, loading, id, navigate]);

  // Dynamic page title
  useEffect(() => {
    document.title = service?.name
      ? `${service.name} | Service Details`
      : "Service Details";
  }, [service]);

  if (loading || serviceLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-neutral-700 dark:text-neutral-200">
        Loading...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center mt-10 text-xl text-red-500">
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
    <div className="container-custom py-10">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {service.name}
        </motion.h1>

        {/* Image */}
        <motion.img
          src={service.image}
          alt={service.name}
          className="w-[200px] md:w-[400px] h-[200px] md:h-[500px] object-cover rounded-xl shadow-lg mb-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Price */}
        <p className="text-2xl md:text-3xl font-semibold text-orange-800 mb-6">
          Price: {service.price} tk
        </p>

        {/* Service Info */}
        <motion.div
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Category:</strong> {service.category}
            </p>
            <p>
              <strong>Location:</strong> {service.location}
            </p>
            <p>
              <strong>Posted:</strong> {service.date}
            </p>
            <p>
              <strong>Contact:</strong> {service.email}
            </p>
          </div>
          <p className="mt-4">
            <strong>Description:</strong> {service.description}
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <motion.button
            onClick={() => navigate("/services")}
            className="px-6 py-3 bg-neutral-600 hover:bg-neutral-500 text-white rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Services
          </motion.button>

          <motion.button
            className="btn-primary px-6 py-3 bg-[#af6723] hover:bg-orange-200 text-white rounded-lg"
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

      {/* Modal */}
      <dialog id="my_modal_3" className="modal backdrop-blur-sm">
        <motion.div
          className="modal-box max-w-lg p-10 mt-6 rounded-xl shadow-lg bg-white dark:bg-neutral-900"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Close Button */}
          <form method="dialog" className="flex justify-end">
            <button className="text-xl font-bold hover:text-red-500 transition-colors">
              ✕
            </button>
          </form>

          <h3 className="text-2xl font-semibold mb-6">
            Adopt / Order Now
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              readOnly
              name="productName"
              defaultValue={service.name}
              className="input input-bordered w-full rounded-lg"
            />

            <input
              name="buyerName"
              defaultValue={user.displayName}
              required
              className="input input-bordered w-full rounded-lg"
              placeholder="Your Name"
            />

            <input
              name="buyerEmail"
              defaultValue={user.email}
              required
              className="input input-bordered w-full rounded-lg"
              placeholder="Email"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="quantity"
                min="1"
                required
                className="input input-bordered w-full rounded-lg"
                placeholder="Quantity"
              />
              <input
                readOnly
                name="price"
                defaultValue={service.price}
                className="input input-bordered w-full rounded-lg"
                placeholder="Price"
              />
            </div>

            <input
              name="address"
              required
              className="input input-bordered w-full rounded-lg"
              placeholder="Address"
            />
            <input
              name="phone"
              required
              className="input input-bordered w-full rounded-lg"
              placeholder="Phone"
            />
            <textarea
              name="note"
              className="textarea textarea-bordered w-full rounded-lg"
              placeholder="Additional note"
            />

            <button
              type="submit"
              disabled={orderLoading}
              className="btn-primary w-full py-3"
            >
              {orderLoading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </motion.div>
      </dialog>
    </div>
  );
};

export default ViewDetails;
