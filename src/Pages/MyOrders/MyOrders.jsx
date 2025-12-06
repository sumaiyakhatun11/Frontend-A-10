import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { generateOrdersPDF } from "../../Shared/pdfGenerator";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load orders
    useEffect(() => {
        axios
            .get("http://localhost:3000/orders")
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.error("Failed to load orders:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unable to load orders",
                });
            });
    }, []);

    // Download PDF
    const handleDownloadPDF = async () => {
        if (!orders.length) {
            return Swal.fire({
                icon: "warning",
                title: "No Orders",
                text: "You have no orders to download",
            });
        }

        setLoading(true);

        try {
            generateOrdersPDF(
                orders,
                user?.displayName || user?.email || "User"
            );

            Swal.fire({
                icon: "success",
                title: "PDF Downloaded",
                text: "Your orders were saved successfully!",
            });
        } catch {
            Swal.fire({
                icon: "error",
                title: "PDF Failed",
                text: "Could not generate PDF. Check console for details.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Orders</h2>

                <button
                    onClick={handleDownloadPDF}
                    disabled={loading || orders.length === 0}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
                >
                    {loading ? (
                        <span className="flex gap-2 items-center">
                            <span className="loading loading-spinner loading-sm" />
                            Generating PDF...
                        </span>
                    ) : (
                        "📥 Download PDF Report"
                    )}
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Note</th>
                            <th>Price</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id}>
                                    <th>{index + 1}</th>
                                    <td>{order.productName}</td>
                                    <td>{order.note || "-"}</td>
                                    <td>${order.price}</td>
                                    <td>{order.address}</td>
                                    <td>{order.phone}</td>
                                    <td>
                                        {order.date
                                            ? new Date(
                                                order.date
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-6">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
