import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [isStaffFormOpen, setIsStaffFormOpen] = useState(true);

  useEffect(() => {
    // Fetch the current form status from the server when the component mounts
    fetch('/api/staff-form-status')
      .then(response => response.json())
      .then(data => setIsStaffFormOpen(data.isOpen))
      .catch(error => console.error('Error fetching form status:', error));
  }, []);

  const toggleStaffForm = () => {
    const newState = !isStaffFormOpen;
    setIsStaffFormOpen(newState);

    // Send the updated status to the server
    fetch('/api/staff-form-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isOpen: newState }),
    }).catch(error => console.error('Error updating form status:', error));
  };

  return (
    <div className="admin-dashboard p-6 bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl mb-4">Toggle Staff Form</h2>
        <button
          onClick={toggleStaffForm}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            isStaffFormOpen ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {isStaffFormOpen ? 'Turn Off Staff Form' : 'Turn On Staff Form'}
        </button>
      </div>

      <div>
        <h2 className="text-xl mb-4">Current Status:</h2>
        <p className={`text-lg font-medium ${isStaffFormOpen ? 'text-green-400' : 'text-red-400'}`}>
          {isStaffFormOpen ? 'Staff Form is OPEN' : 'Staff Form is CLOSED'}
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
