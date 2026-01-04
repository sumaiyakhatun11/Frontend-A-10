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

    // ✅ Fetch orders filtered by user email
    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        setLoading(true);
        axios
            .get(`https://backend-a10.vercel.app/orders?email=${user.email}`)
            .then((res) => {
                setOrders(res.data);
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
        <div className="container-custom section-padding">

            {/* Loading State */}
            {loading ? (
                <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading your orders...</p>
                </div>
            ) : (
                <>
            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">\n                <h2 className="text-2xl font-bold text-center md:text-left text-neutral-900 dark:text-white">
                    My Orders {orders.length > 0 && <span className="text-primary">({orders.length})</span>}
                </h2>

                {/* ✅ PDF Button Tooltip */}
                {orders.length > 0 && (
                <button
                    data-tooltip-id="pdfTip"
                    data-tooltip-content="Download all your orders as a PDF report"
                    onClick={downloadPDF}
                    className="
            px-4 py-2 rounded-lg font-semibold text-white
            bg-gradient-to-r from-[#713600] via-[#8a4200] to-[#a64e00]
            hover:from-[#5a2b00] hover:via-[#713600] hover:to-[#8a4200]
            transition-all duration-300 shadow-md hover:shadow-lg active:scale-95
            w-full md:w-auto
          "
                >
                    🧾 Download PDF
                </button>
                )}
                <Tooltip id="pdfTip" />
            </div>

            {/* ================= DESKTOP TABLE VIEW ================= */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra table-sm w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>

                            {/* ✅ Header Tooltip */}
                            <th
                                data-tooltip-id="noteHeader"
                                data-tooltip-content="Special notes or instructions for this order"
                                className="cursor-help"
                            >
                                Note ℹ️
                            </th>

                            <th>Price</th>
                            <th>Address</th>

                            {/* ✅ Header Tooltip */}
                            <th
                                data-tooltip-id="phoneHeader"
                                data-tooltip-content="Customer contact phone number"
                                className="cursor-help"
                            >
                                Phone ℹ️
                            </th>

                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id}>
                                    <th>{index + 1}</th>

                                    <td>{order.productName}</td>

                                    {/* ✅ Note tooltip cell */}
                                    <td
                                        data-tooltip-id={`note-${order._id}`}
                                        data-tooltip-content={order.note || "No note"}
                                        className="truncate max-w-[160px] cursor-help"
                                    >
                                        {order.note || "-"}
                                    </td>

                                    <td>${order.price}</td>

                                    {/* ✅ Address tooltip */}
                                    <td
                                        data-tooltip-id={`address-${order._id}`}
                                        data-tooltip-content={order.address}
                                        className="truncate max-w-[160px] cursor-help"
                                    >
                                        {order.address}
                                    </td>

                                    {/* ✅ Phone tooltip */}
                                    <td
                                        data-tooltip-id={`phone-${order._id}`}
                                        data-tooltip-content={`Call: ${order.phone}`}
                                        className="cursor-help"
                                    >
                                        {order.phone}
                                    </td>

                                    <td>
                                        {order.date
                                            ? new Date(order.date).toLocaleDateString()
                                            : "N/A"}
                                    </td>

                                    {/* Dynamic tooltips */}
                                    <Tooltip id={`note-${order._id}`} />
                                    <Tooltip id={`address-${order._id}`} />
                                    <Tooltip id={`phone-${order._id}`} />
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-6">
                                    <div className="flex flex-col items-center gap-4">
                                        <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <div>
                                            <p className="text-neutral-600 dark:text-neutral-400 mb-2">No orders found</p>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-500">Start shopping to see your orders here!</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Static header tooltips */}
                <Tooltip id="noteHeader" />
                <Tooltip id="phoneHeader" />
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden space-y-4">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div
                            key={order._id}
                            className="bg-white p-4 rounded-xl shadow-md border"
                        >
                            <p className="font-bold mb-2">
                                #{index + 1} — {order.productName}
                            </p>

                            <p>
                                <span className="font-semibold">Note:</span>{" "}
                                <span
                                    data-tooltip-id={`mobile-note-${order._id}`}
                                    data-tooltip-content={order.note || "No note"}
                                    className="cursor-help"
                                >
                                    {order.note || "-"}
                                </span>
                            </p>

                            <p>
                                <span className="font-semibold">Price:</span> ${order.price}
                            </p>

                            <p
                                data-tooltip-id={`mobile-address-${order._id}`}
                                data-tooltip-content={order.address}
                                className="cursor-help"
                            >
                                <span className="font-semibold">Address:</span> {order.address}
                            </p>

                            <p>
                                <span className="font-semibold">Phone:</span>{" "}
                                <span
                                    data-tooltip-id={`mobile-phone-${order._id}`}
                                    data-tooltip-content={`Call: ${order.phone}`}
                                    className="cursor-help"
                                >
                                    {order.phone}
                                </span>
                            </p>

                            <p>
                                <span className="font-semibold">Date:</span>{" "}
                                {order.date
                                    ? new Date(order.date).toLocaleDateString()
                                    : "N/A"}
                            </p>

                            {/* Mobile tooltips */}
                            <Tooltip id={`mobile-note-${order._id}`} />
                            <Tooltip id={`mobile-address-${order._id}`} />
                            <Tooltip id={`mobile-phone-${order._id}`} />
                        </div>
                    ))
                ) : (
                    <div className="text-center mt-10 p-8 bg-white dark:bg-neutral-800 rounded-xl shadow-md">
                        <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-2">No orders found</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-500">Start shopping to see your orders here!</p>
                    </div>
                )}
            </div>
            </>
            )}
        </div>
    );
};

export default MyOrders;
