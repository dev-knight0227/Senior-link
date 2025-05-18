"use client"
import React, { useState, useRef } from "react";

const AddListingPage = () => {
  // State for form data
  const [formData, setFormData] = useState({
    entryType: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    description: "",
    // Dynamic fields for different entry types
    careHome: {
      capacity: "",
      monthlyPrice: "",
      amenities: [],
      medicalSupport: false,
      acceptsInsurance: false,
    },
    caregiver: {
      experience: "",
      hourlyRate: "",
      specializations: [],
      availability: "",
      canDrive: false,
    },
    transport: {
      vehicleType: "",
      serviceArea: "",
      wheelchairAccessible: false,
      pricePerKm: "",
      operatingHours: "",
    },
    store: {
      productCategories: [],
      deliveryAvailable: false,
      openingHours: "",
      websiteUrl: "",
    },
  });

  // State for photos
  const [photos, setPhotos] = useState([]);
  const [photoPreview, setPhotoPreview] = useState([]);
  const fileInputRef = useRef(null);

  // State for form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested properties for dynamic fields
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Handle multi-select changes (for arrays like amenities, specializations)
  const handleMultiSelect = (category, item) => {
    const [parent, child] = category.split(".");
    const currentItems = [...formData[parent][child]];
    
    if (currentItems.includes(item)) {
      // Remove item if already selected
      const updatedItems = currentItems.filter(i => i !== item);
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: updatedItems,
        },
      });
    } else {
      // Add item if not already selected
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: [...currentItems, item],
        },
      });
    }
  };

  // Handle photo uploads
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 10) {
      alert("You can upload a maximum of 10 photos");
      return;
    }

    setPhotos([...photos, ...files]);

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPhotoPreview([...photoPreview, ...newPreviews]);
  };

  // Remove a photo
  const removePhoto = (index) => {
    const updatedPhotos = [...photos];
    const updatedPreviews = [...photoPreview];
    
    updatedPhotos.splice(index, 1);
    URL.revokeObjectURL(updatedPreviews[index]); // Clean up the URL
    updatedPreviews.splice(index, 1);
    
    setPhotos(updatedPhotos);
    setPhotoPreview(updatedPreviews);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.entryType) newErrors.entryType = "Please select an entry type";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.description) newErrors.description = "Description is required";
    
    // Type-specific validation
    if (formData.entryType === "careHome") {
      if (!formData.careHome.capacity) newErrors["careHome.capacity"] = "Capacity is required";
      if (!formData.careHome.monthlyPrice) newErrors["careHome.monthlyPrice"] = "Monthly price is required";
    } else if (formData.entryType === "caregiver") {
      if (!formData.caregiver.experience) newErrors["caregiver.experience"] = "Experience is required";
      if (!formData.caregiver.hourlyRate) newErrors["caregiver.hourlyRate"] = "Hourly rate is required";
      if (!formData.caregiver.availability) newErrors["caregiver.availability"] = "Availability is required";
    } else if (formData.entryType === "transport") {
      if (!formData.transport.vehicleType) newErrors["transport.vehicleType"] = "Vehicle type is required";
      if (!formData.transport.serviceArea) newErrors["transport.serviceArea"] = "Service area is required";
      if (!formData.transport.pricePerKm) newErrors["transport.pricePerKm"] = "Price per km is required";
    } else if (formData.entryType === "store") {
      if (formData.store.productCategories.length === 0) newErrors["store.productCategories"] = "At least one product category is required";
      if (!formData.store.openingHours) newErrors["store.openingHours"] = "Opening hours are required";
    }
    
    // Photo validation
    if (photos.length === 0) newErrors.photos = "Please upload at least one photo";
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    setErrors(formErrors);
    
    // If no errors, submit form
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      
      // Create form data for submission (including files)
      const submissionData = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
          // Handle nested objects
          Object.keys(formData[key]).forEach(nestedKey => {
            if (Array.isArray(formData[key][nestedKey])) {
              // Handle arrays
              submissionData.append(`${key}.${nestedKey}`, JSON.stringify(formData[key][nestedKey]));
            } else {
              submissionData.append(`${key}.${nestedKey}`, formData[key][nestedKey]);
            }
          });
        } else {
          submissionData.append(key, formData[key]);
        }
      });
      
      // Add photos
      photos.forEach((photo, index) => {
        submissionData.append(`photo${index}`, photo);
      });
      
      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", submissionData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            entryType: "",
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            description: "",
            careHome: {
              capacity: "",
              monthlyPrice: "",
              amenities: [],
              medicalSupport: false,
              acceptsInsurance: false,
            },
            caregiver: {
              experience: "",
              hourlyRate: "",
              specializations: [],
              availability: "",
              canDrive: false,
            },
            transport: {
              vehicleType: "",
              serviceArea: "",
              wheelchairAccessible: false,
              pricePerKm: "",
              operatingHours: "",
            },
            store: {
              productCategories: [],
              deliveryAvailable: false,
              openingHours: "",
              websiteUrl: "",
            },
          });
          setPhotos([]);
          setPhotoPreview([]);
          setSubmitSuccess(false);
        }, 3000);
      }, 1500);
    }
  };
  // Render error message
  const renderError = (field) => {
    return errors[field] ? (
      <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
    ) : null;
  };

  // Render dynamic fields based on entry type
  const renderDynamicFields = () => {
    switch (formData.entryType) {
      case "careHome":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Care Home Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="careHome.capacity" className="block text-sm font-medium text-gray-700">
                  Capacity (number of residents)
                </label>
                <input
                  type="number"
                  id="careHome.capacity"
                  name="careHome.capacity"
                  value={formData.careHome.capacity}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
                {renderError("careHome.capacity")}
              </div>
              
              <div>
                <label htmlFor="careHome.monthlyPrice" className="block text-sm font-medium text-gray-700">
                  Monthly Price Range (PLN)
                </label>
                <input
                  type="text"
                  id="careHome.monthlyPrice"
                  name="careHome.monthlyPrice"
                  placeholder="e.g., 4500-6000"
                  value={formData.careHome.monthlyPrice}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
                {renderError("careHome.monthlyPrice")}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities & Services
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Private Rooms", "Shared Rooms", "Garden", "Rehabilitation", "Activities Program", 
                  "Dining Service", "Laundry Service", "Housekeeping", "Wi-Fi", "TV Room", 
                  "Library", "Gym", "Swimming Pool"].map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity}`}
                      checked={formData.careHome.amenities.includes(amenity)}
                      onChange={() => handleMultiSelect("careHome.amenities", amenity)}
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
                    />
                    <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
              {renderError("careHome.amenities")}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="careHome.medicalSupport"
                  name="careHome.medicalSupport"
                  checked={formData.careHome.medicalSupport}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
                />
                <label htmlFor="careHome.medicalSupport" className="ml-2 text-sm text-gray-700">
                  24/7 Medical Support Available
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="careHome.acceptsInsurance"
                  name="careHome.acceptsInsurance"
                  checked={formData.careHome.acceptsInsurance}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
                />
                <label htmlFor="careHome.acceptsInsurance" className="ml-2 text-sm text-gray-700">
                  Accepts Insurance
                </label>
              </div>
            </div>
          </div>
        );
        
      case "caregiver":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Caregiver Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="caregiver.experience" className="block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="caregiver.experience"
                  name="caregiver.experience"
                  value={formData.caregiver.experience}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
                {renderError("caregiver.experience")}
              </div>
              
              <div>
                <label htmlFor="caregiver.hourlyRate" className="block text-sm font-medium text-gray-700">
                  Hourly Rate (PLN)
                </label>
                <input
                  type="text"
                  id="caregiver.hourlyRate"
                  name="caregiver.hourlyRate"
                  placeholder="e.g., 30-35"
                  value={formData.caregiver.hourlyRate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
                {renderError("caregiver.hourlyRate")}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specializations
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Elderly Care", "Dementia Care", "Alzheimer's Care", "Mobility Assistance", 
                  "Medication Management", "Meal Preparation", "Personal Hygiene", "Companionship", 
                  "Rehabilitation Support", "Post-Hospital Care", "Palliative Care"].map((spec) => (
                  <div key={spec} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`spec-${spec}`}
                      checked={formData.caregiver.specializations.includes(spec)}
                      onChange={() => handleMultiSelect("caregiver.specializations", spec)}
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
                    />
                    <label htmlFor={`spec-${spec}`} className="ml-2 text-sm text-gray-700">
                      {spec}
                    </label>
                  </div>
                ))}
              </div>
              {renderError("caregiver.specializations")}
            </div>
            
            <div>
              <label htmlFor="caregiver.availability" className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                id="caregiver.availability"
                name="caregiver.availability"
                value={formData.caregiver.availability}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
              >
                <option value="">Select availability</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
                <option value="Mornings">Mornings</option>
                <option value="24/7">24/7</option>
                <option value="Flexible">Flexible</option>
              </select>
              {renderError("caregiver.availability")}
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="caregiver.canDrive"
                name="caregiver.canDrive"
                checked={formData.caregiver.canDrive}
                onChange={handleChange}
                className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
              />
              <label htmlFor="caregiver.canDrive" className="ml-2 text-sm text-gray-700">
                Can drive / has own transportation
              </label>
            </div>
          </div>
        );
        
      case "transport":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Transport Service Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="transport.vehicleType" className="block text-sm font-medium text-gray-700">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  id="transport.vehicleType"
                  name="transport.vehicleType"
                  placeholder="e.g., Van, Ambulance"
                  value={formData.transport.vehicleType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
                {renderError("transport.vehicleType")}
              </div>
              
              <div>
                <label htmlFor="transport.serviceArea" className="block text-sm font-medium text-gray-700">
                  Service Area
                </label>
                <input
                  type="text"
                  id="transport.serviceArea"
                  name="transport.serviceArea"
                  placeholder="e.g., Kraków and surrounding areas"
                  value={formData.transport.serviceArea}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
                {renderError("transport.serviceArea")}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="transport.pricePerKm" className="block text-sm font-medium text-gray-700">
                  Price per km (PLN)
                </label>
                <input
                  type="text"
                  id="transport.pricePerKm"
                  name="transport.pricePerKm"
                  value={formData.transport.pricePerKm}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
                {renderError("transport.pricePerKm")}
              </div>
              
              <div>
                <label htmlFor="transport.operatingHours" className="block text-sm font-medium text-gray-700">
                  Operating Hours
                </label>
                <input
                  type="text"
                  id="transport.operatingHours"
                  name="transport.operatingHours"
                  placeholder="e.g., 8:00-20:00, 24/7"
                  value={formData.transport.operatingHours}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
                {renderError("transport.operatingHours")}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="transport.wheelchairAccessible"
                name="transport.wheelchairAccessible"
                checked={formData.transport.wheelchairAccessible}
                onChange={handleChange}
                className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
              />
              <label htmlFor="transport.wheelchairAccessible" className="ml-2 text-sm text-gray-700">
                Wheelchair Accessible
              </label>
            </div>
          </div>
        );
        
      case "store":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Senior Store Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Categories
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Mobility Aids", "Medical Equipment", "Daily Living Aids", "Incontinence Products", 
                  "Orthopedic Products", "Nutrition & Supplements", "Personal Care", "Bedroom & Bathroom", 
                  "Therapy & Fitness", "Clothing & Footwear"].map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={formData.store.productCategories.includes(category)}
                      onChange={() => handleMultiSelect("store.productCategories", category)}
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              {renderError("store.productCategories")}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="store.openingHours" className="block text-sm font-medium text-gray-700">
                  Opening Hours
                </label>
                <input
                  type="text"
                  id="store.openingHours"
                  name="store.openingHours"
                  placeholder="e.g., Mon-Fri: 9-17, Sat: 10-14"
                  value={formData.store.openingHours}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
                {renderError("store.openingHours")}
              </div>
              
              <div>
                <label htmlFor="store.websiteUrl" className="block text-sm font-medium text-gray-700">
                  Website URL (optional)
                </label>
                <input
                  type="url"
                  id="store.websiteUrl"
                  name="store.websiteUrl"
                  placeholder="e.g., https://www.example.com"
                  value={formData.store.websiteUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="store.deliveryAvailable"
                name="store.deliveryAvailable"
                checked={formData.store.deliveryAvailable}
                onChange={handleChange}
                className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
              />
              <label htmlFor="store.deliveryAvailable" className="ml-2 text-sm text-gray-700">
                Delivery Available
              </label>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Add Your <span className="text-[#206645]">Care Service</span> Listing
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Share your care services with thousands of families looking for the right care solution for their loved ones.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {submitSuccess ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Listing Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for adding your listing. Our team will review your submission and it will be published soon.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#206645] hover:bg-[#185536] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645]"
              >
                Add Another Listing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="space-y-8">
                  {/* Entry Type Selection */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Type of Entry</h2>
                    <p className="text-gray-600 mb-4">Select the type of service you want to list.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { id: "careHome", label: "Care Home", icon: "🏠" },
                        { id: "caregiver", label: "Caregiver", icon: "👨‍⚕️" },
                        { id: "transport", label: "Transport Service", icon: "🚑" },
                        { id: "store", label: "Senior Store", icon: "🛒" },
                      ].map((type) => (
                        <div
                          key={type.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.entryType === type.id
                              ? "border-[#206645] bg-[#206645]/10"
                              : "border-gray-200 hover:border-[#206645]/50 hover:bg-[#206645]/5"
                          }`}
                          onClick={() => setFormData({ ...formData, entryType: type.id })}
                        >
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{type.icon}</div>
                            <div>
                              <h3 className="font-medium text-gray-900">{type.label}</h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {renderError("entryType")}
                  </div>
                  
                  {/* Contact Information */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                    <p className="text-gray-600 mb-4">Provide your contact details so potential clients can reach you.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name / Business Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                        />
                        {renderError("name")}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                        />
                        {renderError("email")}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                        />
                        {renderError("phone")}
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                        />
                        {renderError("address")}
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                        />
                        {renderError("city")}
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <p className="text-xs text-gray-500 mb-1">
                      Provide a detailed description of your services, experience, and what makes you unique.
                    </p>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                    />
                    {renderError("description")}
                  </div>
                  
                  {/* Dynamic Fields */}
                  {formData.entryType && renderDynamicFields()}
                  
                  {/* Photo Upload */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
                    <p className="text-gray-600 mb-4">
                      Upload photos of your facility, services, or yourself. You can upload up to 10 photos.
                    </p>
                    
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#206645] hover:text-[#185536] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#206645]"
                          >
                            <span>Upload photos</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              multiple
                              accept="image/*"
                              className="sr-only"
                              onChange={handlePhotoUpload}
                              ref={fileInputRef}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                      </div>
                    </div>
                    {renderError("photos")}
                    
                    {/* Photo Previews */}
                    {photoPreview.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Photos</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {photoPreview.map((preview, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                                <img
                                  src={preview || "/placeholder.svg"}
                                  alt={`Preview ${index + 1}`}
                                  className="object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-500 hover:text-red-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    </div>
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row-reverse gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#206645] hover:bg-[#185536] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645] ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Listing"
                  )}
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645]"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to cancel? All your data will be lost.")) {
                      window.location.href = "/search-care";
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          
          {/* Help Box */}
          <div className="mt-8 bg-[#206645]/10 rounded-xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#206645]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Need help with your listing?</h3>
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    If you need assistance with creating your listing or have questions about the process, our team is here to help.
                  </p>
                  <p className="mt-2">
                    <a href="#" className="text-[#206645] font-medium hover:text-[#185536]">
                      Contact Support
                    </a>
                    {" or call us at "}
                    <a href="tel:+48123456789" className="text-[#206645] font-medium hover:text-[#185536]">
                      +48 123 456 789
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListingPage;