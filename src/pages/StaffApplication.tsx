import React, { useState } from "react";

const StaffApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    discord: "",
    age: "",
    experience: "",
    availability: "",
    motivation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add submission logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Staff Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Discord Username</label>
            <input
              type="text"
              name="discord"
              value={formData.discord}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Previous Staff Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded h-24"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium">Availability (hours per week)</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Why do you want to be staff?</label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded h-24"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffApplication;
