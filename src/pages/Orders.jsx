import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({}); // temp storage for new status per order

 
  const headers = {
    id : localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://space-caffe-backend.vercel.app/api/order/admin-get-all-orders', { headers });
      setOrders(res.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates(prev => ({ ...prev, [orderId]: newStatus }));
  };

  const updateOrderStatus = async (orderId) => {
    const headers = {
       id : localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
      orderid : orderId
    }

    const newStatus = statusUpdates[orderId];
    try {
      await axios.patch(`https://space-caffe-backend.vercel.app/api/order/admin-update-status/`, 
        { status: newStatus },  {headers}
        
      );
      alert('Order status updated!');
      fetchOrders(); // Refresh orders after update
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="p-6  min-h-screen w-full">
  <h1 className="text-3xl font-bold mb-6 text-white">🛒 All Orders</h1>
  <div className="grid gap-6">
    {orders.map((order, index) => (
      <motion.div
        key={order._id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="w-full bg-[#1b263b] text-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow border border-gray-700"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h2 className="text-xl font-semibold mb-2 md:mb-0">Order #{index + 1}</h2>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${
                (statusUpdates[order._id] || order.status) === 'Delivered' ? 'bg-green-600' :
                (statusUpdates[order._id] || order.status) === 'Out for Delivery' ? 'bg-yellow-500' :
                (statusUpdates[order._id] || order.status) === 'Cancelled' ? 'bg-red-600' :
                'bg-blue-600'
              }`}>
              {statusUpdates[order._id] || order.status}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-1 mb-4">🕒 Placed On: {new Date(order.createdAt).toLocaleString()}</p>

        <div className="mb-4">
          <h3 className="font-semibold text-white mb-1">👤 User Info:</h3>
          <p><strong>Name:</strong> {order.user?.fullname}</p>
          <p><strong>Email:</strong> {order.user?.email}</p>
          <p><strong>Phone:</strong> {order.user?.number}</p>
          <p><strong>Address:</strong> {order.user?.address}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-white mb-1">🍽️ Items:</h3>
          <ul className="list-disc ml-5">
            {order.items.map((item) => (
              <li key={item._id}>
                {item.food?.name || "N/A"} — Qty: {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <select
            className="bg-[#0d1b2a] border border-gray-600 px-4 py-2 rounded text-white focus:outline-none"
            value={statusUpdates[order._id] || order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => updateOrderStatus(order._id)}
            className="bg-amber-500 text-black px-5 py-2 rounded hover:bg-amber-600 font-semibold transition"
          >
            Update Status
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</div>
  );
  
}
