"use client"
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2 } from 'lucide-react';
import Image from 'next/image';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = async () => {
      // Replace this with actual API call
      const data = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phone: '(555) 987-6543',
        address: '456 Wellness Blvd, Healthtown, HT 67890',
      };
      setUserData(data);
      setFormState(data);
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Implement save logic here (e.g., API call)
    setUserData(formState);
    setIsEditing(false);
  };

  if (!userData) {
    return <div className="text-center py-12">Loading profile...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <div className="bg-[#206645] rounded-full p-3 mr-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Personal Information</h2>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#206645] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#206645] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#206645] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#206645] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formState.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#206645] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#206645] hover:bg-[#0066b0] dark:bg-[#206645] dark:hover:bg-[#0088e0] text-white font-medium rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-[#206645] dark:text-[#3b9ede] mr-2" />
                <span className="text-gray-800 dark:text-white">{userData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-[#206645] dark:text-[#3b9ede] mr-2" />
                <span className="text-gray-800 dark:text-white">{userData.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-[#206645] dark:text-[#3b9ede] mr-2" />
                <span className="text-gray-800 dark:text-white">{userData.address}</span>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 inline-flex items-center px-6 py-3 bg-[#206645] hover:bg-[#0066b0] dark:bg-[#206645] dark:hover:bg-[#0088e0] text-white font-medium rounded-lg transition-colors"
              >
                <Edit2 className="h-5 w-5 mr-2" />
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
