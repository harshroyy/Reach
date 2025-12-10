import { useState } from 'react';
import api from '../../services/api';

const CreateRequestModal = ({ helper, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Education', // Default
    reason: '',
    details: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to backend
      await api.post('/requests', {
        helperId: helper._id,
        ...formData
      });

      alert('Request sent successfully!');
      onClose(); // Close modal
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. Overlay (Dark background)
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      
      {/* 2. Modal Box */}
      <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Ask {helper.name} for Help</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Education">Education / Mentoring</option>
              <option value="Financial">Financial Support</option>
              <option value="Food">Food / Groceries</option>
              <option value="Career">Career Guidance</option>
              <option value="Emotional">Emotional Support</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Reason (Short Title) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Short Reason (Title)</label>
            <input
              type="text"
              name="reason"
              required
              maxLength="50"
              placeholder="e.g. Need help with React project"
              value={formData.reason}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Details (Long Story) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Detailed Explanation</label>
            <textarea
              name="details"
              rows="4"
              required
              placeholder="Explain your situation in detail..."
              value={formData.details}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`text-white px-4 py-2 rounded-md ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateRequestModal;