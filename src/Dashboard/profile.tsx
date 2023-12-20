/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

const Profile = () => {
  // State to store form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  // Function to handle form input changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission logic here
    // For example, you can send the formData to an API or perform any other action
    console.log('Form data submitted:', formData);
    // Reset the form after submission
    setFormData({ name: '', email: '', age: '' });
  };

  return (
    <div>
      <h2>Add Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Add Information</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
