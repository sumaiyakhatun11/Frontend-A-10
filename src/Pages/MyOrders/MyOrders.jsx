import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Tooltip } from "react-tooltip";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    // ✅ Dynamic title
    useEffect(() => {
        document.title = "My Orders | PawMart";
    }, []);

    // ✅ Fetch orders
    useEffect(() => {
        axios
            .get("http://localhost:3000/orders")
            .then((res) => setOrders(res.data))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unable to load orders",
                });
            });
    }, []);

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
        <div className="m-4 md:m-8">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-center md:text-left">
                    My Orders
                </h2>

                {/* ✅ PDF Button Tooltip */}
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
                                    No orders found
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
                    <p className="text-center mt-10 text-gray-500">
                        No orders found
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
