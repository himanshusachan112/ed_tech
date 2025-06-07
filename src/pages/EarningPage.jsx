import React, { useState, useEffect } from 'react';
import { apiConnector } from '../utils/Apiconnecter';
import { toast } from 'react-toastify';
import { playlist_earning } from '../apis/apis';
import { useSelector } from 'react-redux';

const dummyTransactions = [
  { id: 1, date: '2025-06-01 14:32', amount: 50, status: 'Completed' },
  { id: 2, date: '2025-05-28 09:10', amount: 25, status: 'Completed' },
];

const EarningPage = () => {
  const [videos, setVideos] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalEarning, settotalEarning] = useState(0);
  const [withdrawing, setWithdrawing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', vpa: '' });

  const { token } = useSelector((state) => state.Auth);

  const formatWatchTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const fetchvideos = async () => {
    const toastid = toast.loading("...Loading");
    try {
      const response = await apiConnector("POST", playlist_earning.GET_PLAYLIST, {}, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) throw new Error("Error fetching videos");
      const objarr = Object.values(response.data.data);
      let newvideos = [];
      objarr.forEach(play => newvideos = [...newvideos, ...play.videos]);
      let netearning = 0;
      newvideos.forEach(vid => netearning += (vid.watchtime / 60));
      settotalEarning(netearning);
      setVideos(newvideos);
    } catch (err) {
      toast.error(err.message);
    }
    toast.dismiss(toastid);
  };

  useEffect(() => {
    fetchvideos();
    setTransactions(dummyTransactions);
  }, []);

  const handleWithdraw = async () => {
    setWithdrawing(true);
    const toastid = toast.loading("Processing withdrawal...");
    try {
      const { name, phone, vpa } = formData;
      const response = await apiConnector("POST", playlist_earning.WITHDRAW_AMOUNT, {
        name,
        phone,
        vpa,
        amount: totalEarning
      }, {
        Authorization: `Bearer ${token}`
      });

      if (!response.data.success) throw new Error("Withdrawal failed");

      toast.success("Money Withdrawn Successfully");
      setFormData({ name: '', phone: '', vpa: '' });
      fetchvideos();
    } catch (err) {
      toast.error(err.message);
    }
    setShowForm(false);
    toast.dismiss(toastid);
    setWithdrawing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-5 md:p-10 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Your Earnings</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map(({ id, thumbnail_url, title, description, watchtime }) => (
            <div key={id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src={thumbnail_url} alt={title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{title}</h3>
                <p className="text-gray-400 text-sm my-1 truncate">{description}</p>
                <p className="text-sm"><span className="font-medium">Watchtime:</span> {formatWatchTime(watchtime)}</p>
                <p className="text-sm mt-1"><span className="font-medium">Earnings:</span> ₹{(watchtime / 60).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 max-w-md mx-auto md:mx-0">
        <h2 className="text-xl font-semibold mb-4">Total Earnings</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p className="text-4xl font-bold mb-4">₹{totalEarning.toFixed(2)}</p>
          <button
            disabled={withdrawing || totalEarning === 0}
            onClick={() => setShowForm(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {withdrawing ? 'Processing...' : 'Withdraw to Bank Account'}
          </button>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Enter Withdrawal Details</h2>
            <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 mb-3 bg-gray-800 text-white rounded" />
            <input type="text" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2 mb-3 bg-gray-800 text-white rounded" />
            <input type="text" placeholder="VPA (e.g., yourname@upi)" value={formData.vpa} onChange={(e) => setFormData({ ...formData, vpa: e.target.value })} className="w-full p-2 mb-4 bg-gray-800 text-white rounded" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
              <button onClick={handleWithdraw} className="px-4 py-2 bg-indigo-600 text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      )}

      <section className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Amount (₹)</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            {/* <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">No transactions found.</td>
                </tr>
              ) : (
                transactions.map(({ id, date, amount, status }) => (
                  <tr key={id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-3 px-4 whitespace-nowrap">{date}</td>
                    <td className="py-3 px-4">₹{amount.toFixed(2)}</td>
                    <td className="py-3 px-4">{status}</td>
                  </tr>
                ))
              )}
            </tbody> */}
          </table>
        </div>
      </section>
    </div>
  );
};

export default EarningPage;
