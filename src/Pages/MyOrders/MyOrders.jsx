import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../../Provider/AuthProvider";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Dynamic title
    useEffect(() => {
        document.title = "My Orders | PawMart";
    }, []);

    // ✅ Fetch & FILTER orders by logged-in user email
    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        setLoading(true);
        axios
            .get("https://backend-a10.vercel.app/orders")
            .then((res) => {
                // ✅ FRONTEND FILTER (IMPORTANT FIX)
                const userOrders = res.data.filter(
                    (order) => order.buyerEmail === user.email
                );
                setOrders(userOrders);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading orders:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unable to load orders. Please try again.",
                });
                setLoading(false);
            });
    }, [user?.email]);

    // ✅ Download PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("My Orders Report", 14, 18);

        const columns = ["Product", "Note", "Price", "Address", "Phone", "Date"];
        const rows = orders.map((order) => [
            order.productName,
            order.note || "-",
            `$${order.price}`,
            order.address,
            order.phone,
            order.date ? new Date(order.date).toLocaleDateString() : "N/A",
        ]);

        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 28,
        });

        doc.save("my_orders.pdf");
    };

    return (
        <div className="container-custom section-padding px-4 md:px-8 lg:px-12">
            {loading ? (
                <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="mt-4 text-neutral-600">Loading your orders...</p>
                </div>
            ) : (
                <>
                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-neutral-900">
                            My Orders{" "}
                            {orders.length > 0 && (
                                <span className="text-primary">
                                    ({orders.length})
                                </span>
                            )}
                        </h2>

                        {orders.length > 0 && (
                            <button
                                data-tooltip-id="pdfTip"
                                data-tooltip-content="Download your orders as PDF"
                                onClick={downloadPDF}
                                className="px-4 py-2 rounded-lg font-semibold text-white
                                bg-gradient-to-r from-[#713600] via-[#8a4200] to-[#a64e00]
                                hover:from-[#5a2b00] hover:to-[#8a4200]
                                transition-all duration-300 shadow-md w-full md:w-auto"
                            >
                                🧾 Download PDF
                            </button>
                        )}
                        <Tooltip id="pdfTip" />
                    </div>

                    {/* DESKTOP TABLE */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="table table-zebra table-sm w-full">
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
                                            <td className="truncate max-w-[160px]">
                                                {order.note || "-"}
                                            </td>
                                            <td>${order.price}</td>
                                            <td className="truncate max-w-[160px]">
                                                {order.address}
                                            </td>
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

                    {/* MOBILE VIEW */}
                    <div className="md:hidden space-y-4">
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <div
                                    key={order._id}
                                    className="p-4 rounded-xl shadow-md border"
                                >
                                    <p className="font-bold mb-2">
                                        #{index + 1} — {order.productName}
                                    </p>
                                    <p><b>Note:</b> {order.note || "-"}</p>
                                    <p><b>Price:</b> ${order.price}</p>
                                    <p><b>Address:</b> {order.address}</p>
                                    <p><b>Phone:</b> {order.phone}</p>
                                    <p>
                                        <b>Date:</b>{" "}
                                        {order.date
                                            ? new Date(order.date).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-8 rounded-xl shadow-md border">
                                No orders found
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyOrders;
