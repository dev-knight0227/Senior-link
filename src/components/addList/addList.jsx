"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";

const AddListingPage = ({ category = "" }) => {
  const { messages } = useLang();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    router.push("/signin");
  }
  // State for form data
  const [formData, setFormData] = useState({
    entryType: category,
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    description: "",
    reviews: [],
    // Dynamic fields for different entry types
    careHome: {
      specializations: "",
      capacity: "",
      monthlyPrice: "",
      amenities: [],
      map: "",
    },
    caregiver: {
      experience: "",
      hourlyRate: "",
      specializations: [],
      availability: "",
      certifications: "",
      telegram: "",
    },
    nurse: {
      experience: "",
      hourlyRate: "",
      specializations: [],
      availability: "",
      certifications: "",
      telegram: "",
    },
    volunteer: {
      experience: "",
      hourlyRate: "",
      specializations: "",
      availability: "",
      certifications: "",
      telegram: "",
    },
    transport: {
      serviceArea: "",
      hourlyRate: "",
      availability: "",
      telegram: "",
    },
    store: {
      productCategories: [],
      openingHours: "",
      websiteUrl: "",
      map: "",
    },
    institution: {
      category: "",
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

  const addReview = () => {
    setFormData((prev) => ({
      ...prev,
      reviews: [
        ...prev.reviews,
        {
          name: "",
          phone: "",
          text: "",
        },
      ],
    }));
  };

  const handleReviewChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedReviews = [...prev.reviews];
      updatedReviews[index][field] = value;

      return {
        ...prev,
        reviews: updatedReviews,
      };
    });
  };

  const saveReviews = async () => {
    if (formData.reviews.length === 0) {
      alert("Please add at least one review before saving.");
      return;
    }

    try {
      // Example: send to Firestore
      // await setDoc(doc(db, "reviewsCollection", userId), { reviews: formData.careHome.reviews });

      console.log("Saving reviews:", formData.reviews);
      alert("Reviews saved successfully!");
    } catch (error) {
      console.error("Error saving reviews:", error);
      alert("Failed to save reviews. Please try again.");
    }
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews.splice(index, 1);
    setFormData({ ...formData, reviews: updatedReviews });
  };

  // Handle multi-select changes (for arrays like amenities, specializations)
  const handleMultiSelect = (category, item) => {
    const [parent, child] = category.split(".");
    const currentItems = [...formData[parent][child]];

    if (currentItems.includes(item)) {
      // Remove item if already selected
      const updatedItems = currentItems.filter((i) => i !== item);
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
    const newPreviews = files.map((file) => URL.createObjectURL(file));
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
    if (!formData.entryType)
      newErrors.entryType = "Please select an entry type";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.description)
      newErrors.description = "Description is required";

    // Type-specific validation
    if (formData.entryType === "careHome") {
      if (!formData.careHome.capacity)
        newErrors["careHome.capacity"] = "Capacity is required";
      if (!formData.careHome.monthlyPrice)
        newErrors["careHome.monthlyPrice"] = "Monthly price is required";
    } else if (formData.entryType === "caregiver") {
      if (!formData.caregiver.experience)
        newErrors["caregiver.experience"] = "Experience is required";
      if (!formData.caregiver.hourlyRate)
        newErrors["caregiver.hourlyRate"] = "Hourly rate is required";
      if (!formData.caregiver.availability)
        newErrors["caregiver.availability"] = "Availability is required";
    } else if (formData.entryType === "transport") {
      if (!formData.transport.vehicleType)
        newErrors["transport.vehicleType"] = "Vehicle type is required";
      if (!formData.transport.serviceArea)
        newErrors["transport.serviceArea"] = "Service area is required";
      if (!formData.transport.pricePerKm)
        newErrors["transport.pricePerKm"] = "Price per km is required";
    } else if (formData.entryType === "store") {
      if (formData.store.productCategories.length === 0)
        newErrors["store.productCategories"] =
          "At least one product category is required";
      if (!formData.store.openingHours)
        newErrors["store.openingHours"] = "Opening hours are required";
    }

    // Photo validation
    if (photos.length === 0)
      newErrors.photos = "Please upload at least one photo";

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
      Object.keys(formData).forEach((key) => {
        if (
          typeof formData[key] === "object" &&
          !Array.isArray(formData[key])
        ) {
          // Handle nested objects
          Object.keys(formData[key]).forEach((nestedKey) => {
            if (Array.isArray(formData[key][nestedKey])) {
              // Handle arrays
              submissionData.append(
                `${key}.${nestedKey}`,
                JSON.stringify(formData[key][nestedKey])
              );
            } else {
              submissionData.append(
                `${key}.${nestedKey}`,
                formData[key][nestedKey]
              );
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
            entryType: category,
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            description: "",
            reviews: [],
            // Dynamic fields for different entry types
            careHome: {
              specializations: [],
              capacity: "",
              monthlyPrice: "",
              amenities: [],
              map: "",
            },
            caregiver: {
              experience: "",
              hourlyRate: "",
              specializations: [],
              availability: "",
              certifications: "",
              telegram: "",
            },
            nurse: {
              experience: "",
              hourlyRate: "",
              specializations: [],
              availability: "",
              certifications: "",
              telegram: "",
            },
            volunteer: {
              experience: "",
              hourlyRate: "",
              specializations: "",
              availability: "",
              certifications: "",
              telegram: "",
            },
            transport: {
              serviceArea: "",
              hourlyRate: "",
              availability: "",
              telegram: "",
            },
            store: {
              productCategories: [],
              openingHours: "",
              websiteUrl: "",
              map: "",
            },
            institution: {
              category: "",
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
          <div className="space-y-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {messages["carehomeinputTitle"]}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="careHome.capacity"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                >
                  {messages["capacityLabel"]}
                </label>
                <input
                  type="number"
                  id="careHome.capacity"
                  name="careHome.capacity"
                  value={formData.careHome.capacity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-[#206645] focus:outline-none"
                />
                {renderError("careHome.capacity")}
              </div>

              <div>
                <label
                  htmlFor="careHome.monthlyPrice"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                >
                  {messages["monthlypriceLabel"]}
                </label>
                <input
                  type="text"
                  id="careHome.monthlyPrice"
                  name="careHome.monthlyPrice"
                  value={formData.careHome.monthlyPrice}
                  onChange={handleChange}
                  placeholder="e.g., 4500-6000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-[#206645] focus:outline-none"
                />
                {renderError("careHome.monthlyPrice")}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                {messages["accessibilityLabel"]}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {messages["carehomeAccessibility"].map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity}`}
                      checked={formData.careHome.amenities.includes(amenity)}
                      onChange={() =>
                        handleMultiSelect("careHome.amenities", amenity)
                      }
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`amenity-${amenity}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-200"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
              {renderError("careHome.amenities")}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="careHome.specializations"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                >
                  {messages["specializationsLabel"]}
                </label>
                <input
                  type="text"
                  id="careHome.specializations"
                  name="careHome.specializations"
                  value={formData.careHome.specializations}
                  onChange={handleChange}
                  placeholder="e.g. Alzheimer, Parkinson"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-[#206645] focus:outline-none"
                />
                {renderError("careHome.specializations")}
              </div>

              <div>
                <label
                  htmlFor="careHome.map"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                >
                  {messages["mapLabel"]}
                </label>
                <input
                  type="text"
                  id="careHome.map"
                  name="careHome.map"
                  placeholder="https://www.google.com/maps/.."
                  value={formData.careHome.map}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-[#206645] focus:outline-none"
                />
                {renderError("careHome.map")}
              </div>
            </div>
          </div>
        );

      case "caregiver":
        return (
          <div className="space-y-10">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {messages["caregiverdetailsTitle"]}
            </h3>

            {/* Experience and Hourly Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="caregiver.experience"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["experienceLabel"]}
                </label>
                <input
                  type="number"
                  id="caregiver.experience"
                  name="caregiver.experience"
                  value={formData.caregiver.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("caregiver.experience")}
              </div>

              <div>
                <label
                  htmlFor="caregiver.hourlyRate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["hourlyrateLabel"]}
                </label>
                <input
                  type="text"
                  id="caregiver.hourlyRate"
                  name="caregiver.hourlyRate"
                  placeholder="e.g., 30-35"
                  value={formData.caregiver.hourlyRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("caregiver.hourlyRate")}
              </div>
            </div>

            {/* Specializations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {messages["specializationsLabel"]}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {messages["caregiverSpecializations"].map((spec) => (
                  <label
                    key={spec}
                    className="flex items-center text-sm text-gray-700 dark:text-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={formData.caregiver.specializations.includes(
                        spec
                      )}
                      onChange={() =>
                        handleMultiSelect("caregiver.specializations", spec)
                      }
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded mr-2"
                    />
                    {spec}
                  </label>
                ))}
              </div>
              {renderError("caregiver.specializations")}
            </div>

            {/* Availability */}
            <div>
              <label
                htmlFor="caregiver.availability"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {messages["availability"]}
              </label>
              <select
                id="caregiver.availability"
                name="caregiver.availability"
                value={formData.caregiver.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
              >
                <option value="">{messages["availabilityPlaceholder"]}</option>
                <option value="Weekdays">{messages["weekdaysTitle"]}</option>
                <option value="Weekends">{messages["weekendsTitle"]}</option>
                <option value="Evenings">{messages["eveningsTitle"]}</option>
                <option value="Mornings">{messages["morningsTitle"]}</option>
                <option value="24/7">24/7</option>
                <option value="Flexible">{messages["flexibleTitle"]}</option>
              </select>
              {renderError("caregiver.availability")}
            </div>

            {/* Certifications & Telegram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="caregiver.certifications"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["certificationsLabel"]}
                </label>
                <input
                  type="text"
                  id="caregiver.certifications"
                  name="caregiver.certifications"
                  value={formData.caregiver.certifications}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("caregiver.certifications")}
              </div>

              <div>
                <label
                  htmlFor="caregiver.telegram"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Telegram
                </label>
                <input
                  type="text"
                  id="caregiver.telegram"
                  name="caregiver.telegram"
                  placeholder="https://t.me/..."
                  value={formData.caregiver.telegram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("caregiver.telegram")}
              </div>
            </div>
          </div>
        );

      case "nurse":
        return (
          <div className="space-y-10">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {messages["nursedetailsTitle"]}
            </h3>

            {/* Experience and Hourly Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nurse.experience"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["experienceLabel"]}
                </label>
                <input
                  type="number"
                  id="nurse.experience"
                  name="nurse.experience"
                  value={formData.nurse.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("nurse.experience")}
              </div>

              <div>
                <label
                  htmlFor="nurse.hourlyRate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["hourlyrateLabel"]}
                </label>
                <input
                  type="text"
                  id="nurse.hourlyRate"
                  name="nurse.hourlyRate"
                  placeholder="e.g., 30-35"
                  value={formData.nurse.hourlyRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("nurse.hourlyRate")}
              </div>
            </div>

            {/* Specializations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {messages["specializationsLabel"]}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {messages["caregiverSpecializations"].map((spec) => (
                  <label
                    key={spec}
                    className="flex items-center text-sm text-gray-700 dark:text-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={formData.nurse.specializations.includes(spec)}
                      onChange={() =>
                        handleMultiSelect("nurse.specializations", spec)
                      }
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded mr-2"
                    />
                    {spec}
                  </label>
                ))}
              </div>
              {renderError("nurse.specializations")}
            </div>

            {/* Availability */}
            <div>
              <label
                htmlFor="nurse.availability"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {messages["availability"]}
              </label>
              <select
                id="nurse.availability"
                name="nurse.availability"
                value={formData.nurse.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
              >
                <option value="">{messages["availabilityPlaceholder"]}</option>
                <option value="Weekdays">{messages["weekdaysTitle"]}</option>
                <option value="Weekends">{messages["weekendsTitle"]}</option>
                <option value="Evenings">{messages["eveningsTitle"]}</option>
                <option value="Mornings">{messages["morningsTitle"]}</option>
                <option value="24/7">24/7</option>
                <option value="Flexible">{messages["flexibleTitle"]}</option>
              </select>
              {renderError("nurse.availability")}
            </div>

            {/* Certifications & Telegram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nurse.certifications"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["certificationsLabel"]}
                </label>
                <input
                  type="text"
                  id="nurse.certifications"
                  name="nurse.certifications"
                  value={formData.nurse.certifications}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("nurse.certifications")}
              </div>

              <div>
                <label
                  htmlFor="nurse.telegram"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Telegram
                </label>
                <input
                  type="text"
                  id="nurse.telegram"
                  name="nurse.telegram"
                  placeholder="https://t.me/..."
                  value={formData.nurse.telegram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("nurse.telegram")}
              </div>
            </div>
          </div>
        );

      case "volunteer":
        return (
          <div className="space-y-10">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {messages["volunteerdetailsTitle"]}
            </h3>

            {/* Experience and Hourly Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="volunteer.experience"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["experienceLabel"]}
                </label>
                <input
                  type="number"
                  id="volunteer.experience"
                  name="volunteer.experience"
                  value={formData.volunteer.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("volunteer.experience")}
              </div>

              <div>
                <label
                  htmlFor="volunteer.hourlyRate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["hourlyrateLabel"]}
                </label>
                <input
                  type="text"
                  id="volunteer.hourlyRate"
                  name="volunteer.hourlyRate"
                  placeholder="e.g., 30-35"
                  value={formData.volunteer.hourlyRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("volunteer.hourlyRate")}
              </div>
            </div>

            {/* Specializations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {messages["specializationsLabel"]}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {messages["caregiverSpecializations"].map((spec) => (
                  <label
                    key={spec}
                    className="flex items-center text-sm text-gray-700 dark:text-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={formData.volunteer.specializations.includes(
                        spec
                      )}
                      onChange={() =>
                        handleMultiSelect("volunteer.specializations", spec)
                      }
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded mr-2"
                    />
                    {spec}
                  </label>
                ))}
              </div>
              {renderError("volunteer.specializations")}
            </div>

            {/* Availability */}
            <div>
              <label
                htmlFor="volunteer.availability"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {messages["availability"]}
              </label>
              <select
                id="volunteer.availability"
                name="volunteer.availability"
                value={formData.volunteer.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
              >
                <option value="">{messages["availabilityPlaceholder"]}</option>
                <option value="Weekdays">{messages["weekdaysTitle"]}</option>
                <option value="Weekends">{messages["weekendsTitle"]}</option>
                <option value="Evenings">{messages["eveningsTitle"]}</option>
                <option value="Mornings">{messages["morningsTitle"]}</option>
                <option value="24/7">24/7</option>
                <option value="Flexible">{messages["flexibleTitle"]}</option>
              </select>
              {renderError("volunteer.availability")}
            </div>

            {/* Certifications & Telegram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="volunteer.certifications"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["certificationsLabel"]}
                </label>
                <input
                  type="text"
                  id="volunteer.certifications"
                  name="volunteer.certifications"
                  value={formData.volunteer.certifications}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("volunteer.certifications")}
              </div>

              <div>
                <label
                  htmlFor="volunteer.telegram"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Telegram
                </label>
                <input
                  type="text"
                  id="volunteer.telegram"
                  name="volunteer.telegram"
                  placeholder="https://t.me/..."
                  value={formData.volunteer.telegram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("volunteer.telegram")}
              </div>
            </div>
          </div>
        );

      case "transport":
        return (
          <div className="space-y-10">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {messages["transportdetailsTitle"]}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="transport.hourlyRate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["hourlyrateLabel"]}
                </label>
                <input
                  type="text"
                  id="transport.hourlyRate"
                  name="transport.hourlyRate"
                  placeholder="e.g., 30-35"
                  value={formData.transport.hourlyRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("transport.hourlyRate")}
              </div>

              <div>
                <label
                  htmlFor="transport.serviceArea"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["serviceareaLabel"]}
                </label>
                <input
                  type="text"
                  id="transport.serviceArea"
                  name="transport.serviceArea"
                  placeholder="e.g., Kraków and surrounding areas"
                  value={formData.transport.serviceArea}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("transport.serviceArea")}
              </div>
            </div>

            <div>
              <label
                htmlFor="transport.availability"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {messages["availability"]}
              </label>
              <select
                id="transport.availability"
                name="transport.availability"
                value={formData.transport.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
              >
                <option value="">{messages["availabilityPlaceholder"]}</option>
                <option value="Weekdays">{messages["weekdaysTitle"]}</option>
                <option value="Weekends">{messages["weekendsTitle"]}</option>
                <option value="Evenings">{messages["eveningsTitle"]}</option>
                <option value="Mornings">{messages["morningsTitle"]}</option>
                <option value="24/7">24/7</option>
                <option value="Flexible">{messages["flexibleTitle"]}</option>
              </select>
              {renderError("transport.availability")}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="transport.telegram"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Telegram
                </label>
                <input
                  type="text"
                  id="transport.telegram"
                  name="transport.telegram"
                  placeholder="https://t.me/..."
                  value={formData.transport.telegram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
                />
                {renderError("transport.telegram")}
              </div>
            </div>
          </div>
        );

      case "store":
        return (
          <div className="space-y-10">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {messages["storedetailsTitle"]}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {messages["productcategoriesTitle"]}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {messages["productCategories"].map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={formData.store.productCategories.includes(
                        category
                      )}
                      onChange={() =>
                        handleMultiSelect("store.productCategories", category)
                      }
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 dark:border-gray-600 rounded"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-200"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              {renderError("store.productCategories")}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="store.openingHours"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["openinghoursLabel"]}
                </label>
                <input
                  type="text"
                  id="store.openingHours"
                  name="store.openingHours"
                  placeholder="e.g., Mon-Fri: 9-17, Sat: 10-14"
                  value={formData.store.openingHours}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-[#206645] focus:outline-none"
                />
                {renderError("store.openingHours")}
              </div>

              <div>
                <label
                  htmlFor="store.websiteUrl"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["websiteurlLabel"]}
                </label>
                <input
                  type="url"
                  id="store.websiteUrl"
                  name="store.websiteUrl"
                  placeholder="e.g., https://www.example.com"
                  value={formData.store.websiteUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-[#206645] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="store.map"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                >
                  {messages["mapLabel"]}
                </label>
                <input
                  type="text"
                  id="store.map"
                  name="store.map"
                  placeholder="https://www.google.com/maps/.."
                  value={formData.store.map}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-[#206645] focus:outline-none"
                />
                {renderError("store.map")}
              </div>
            </div>
          </div>
        );

      case "institution":
        return (
          <div className="space-y-10">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {messages["institutiondetailsTitle"]}
            </h3>

            <div>
              <label
                htmlFor="transport.availability"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {messages["categoryTitle"]}
              </label>
              <select
                id="institution.category"
                name="institution.category"
                value={formData.institution.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] outline-none"
              >
                <option value="">{messages["categoryPlaceholder"]}</option>
                <option value="socialwelfare">
                  {messages["institutioncategoryOption1"]}
                </option>
                <option value="familysupportcenter">
                  {messages["institutioncategoryOption2"]}
                </option>
                <option value="senioroffice">
                  {messages["institutioncategoryOption3"]}
                </option>
                <option value="localprograms">
                  {messages["institutioncategoryOption4"]}
                </option>
              </select>
              {renderError("transport.availability")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="institution.websiteUrl"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {messages["websiteurlLabel"]}
                </label>
                <input
                  type="url"
                  id="institution.websiteUrl"
                  name="institution.websiteUrl"
                  placeholder="e.g., https://www.example.com"
                  value={formData.institution.websiteUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-[#206645] focus:outline-none"
                />
              </div>
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
              {messages["addlistpageTitle1"]}{" "}
              <span className="text-[#206645]">
                {messages["addlistpageTitle2"]}
              </span>{" "}
              {messages["addlistpageTitle3"]}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {messages["addlistpagesubTitle"]}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {messages["listingsubmitsuccessTitle"]}
              </h2>
              <p className="text-gray-600 mb-6">
                {messages["listingsubmitthankMessage"]}
              </p>
              {/* <button
                onClick={() => setSubmitSuccess(false)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#206645] hover:bg-[#185536] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645]"
              >
                Add Another Listing
              </button> */}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="space-y-8">
                  {/* Entry Type Selection */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {messages["typeofentryTitle"]}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {messages["typeofentrysubTitle"]}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        {
                          id: "careHome",
                          label: messages["carehomeTitle"],
                          icon: "🏠",
                        },
                        {
                          id: "caregiver",
                          label: messages["caregiverTitle"],
                          icon: "👨‍⚕️",
                        },
                        {
                          id: "nurse",
                          label: messages["nurseTitle"],
                          icon: "👨‍⚕️",
                        },
                        {
                          id: "volunteer",
                          label: messages["volunteerTitle"],
                          icon: "👨‍⚕️",
                        },
                        {
                          id: "transport",
                          label: messages["transportTitle"],
                          icon: "🚑",
                        },
                        {
                          id: "store",
                          label: messages["seniorstoreTitle"],
                          icon: "🛒",
                        },
                        {
                          id: "institution",
                          label: messages["findinstitutionTitle"],
                          icon: "🏠",
                        },
                      ].map((type) => (
                        <div
                          key={type.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.entryType === type.id
                              ? "border-[#206645] bg-[#206645]/10"
                              : "border-gray-200 hover:border-[#206645]/50 hover:bg-[#206645]/5"
                          }`}
                          onClick={() =>
                            setFormData({ ...formData, entryType: type.id })
                          }
                        >
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{type.icon}</div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {type.label}
                              </h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {renderError("entryType")}
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {messages["contactinformationTitle"]}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {messages["contactinformationsubTitle"]}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          label: messages["businessnameLabel"],
                          name: "name",
                          type: "text",
                        },
                        {
                          label: messages["emailLabel"],
                          name: "email",
                          type: "email",
                        },
                        {
                          label: messages["phoneLabel"],
                          name: "phone",
                          type: "tel",
                        },
                        {
                          label: messages["addressLabel"],
                          name: "address",
                          type: "text",
                        },
                        {
                          label: messages["cityLabel"],
                          name: "city",
                          type: "text",
                        },
                      ].map(({ label, name, type }) => (
                        <div key={name}>
                          <label
                            htmlFor={name}
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                          >
                            {label}
                          </label>
                          <input
                            type={type}
                            id={name}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] dark:focus:ring-[#3b9ede] focus:outline-none"
                          />
                          {renderError(name)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                    >
                      {messages["descriptionTitle"]}
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {messages["descriptionsubTitle"]}
                    </p>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={messages["descriptionPlaceholder"]}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] dark:focus:ring-[#3b9ede] focus:outline-none transition duration-150"
                    />
                    {renderError("description")}
                  </div>

                  {/* Dynamic Fields */}
                  {formData.entryType && renderDynamicFields()}

                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {messages["clientreviewsLabel"]}
                    </h4>
                    {formData.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="space-y-4 border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 shadow-sm relative"
                      >
                        <button
                          type="button"
                          onClick={() => handleDeleteReview(index)}
                          className="absolute top-2 right-2 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-md shadow hover:bg-red-600 transition-colors duration-200"
                        >
                          {messages["deleteTitle"]}
                        </button>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {messages["reviewernameLabel"]}
                          </label>
                          <input
                            type="text"
                            name={`reviews[${index}].name`}
                            value={review.name}
                            onChange={(e) =>
                              handleReviewChange(index, "name", e.target.value)
                            }
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] focus:outline-none"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {messages["phonenumberLabel"]}
                          </label>
                          <input
                            type="tel"
                            name={`reviews[${index}].phone`}
                            value={review.phone}
                            onChange={(e) =>
                              handleReviewChange(index, "phone", e.target.value)
                            }
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] focus:outline-none"
                            placeholder="+48 123 456 789"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {messages["reviewLabel"]}
                          </label>
                          <textarea
                            name={`reviews[${index}].text`}
                            value={review.text}
                            onChange={(e) =>
                              handleReviewChange(index, "text", e.target.value)
                            }
                            rows={3}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#206645] focus:outline-none"
                            placeholder="Write review here..."
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addReview}
                      className="px-5 py-2 bg-[#206645] text-white font-medium rounded-lg hover:bg-[#185536] transition-colors mr-3"
                    >
                      {messages["addreviewTitle"]}
                    </button>
                    <button
                      type="button"
                      onClick={saveReviews}
                      className="px-5 py-2 bg-[#206645] text-white font-medium rounded-lg hover:bg-[#185536] transition-colors"
                    >
                      {messages["saveTitle"]}
                    </button>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {messages["photosLabel"]}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {messages["photossubTitle"]}
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
                            <span>{messages["uploadphotosTitle"]}</span>
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
                          <p className="pl-1">{messages["draganddropTitle"]}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {messages["pngjpgTitle"]}
                        </p>
                      </div>
                    </div>
                    {renderError("photos")}

                    {/* Photo Previews */}
                    {photoPreview.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          {messages["uploadphotosTitle"]}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {photoPreview.map((preview, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                                <Image
                                  src={preview || "/placeholder.svg"}
                                  alt={`Preview ${index + 1}`}
                                  className="object-cover"
                                  width={200}
                                  height={200}
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
                      {messages["submittingTitle"]}
                    </span>
                  ) : (
                    messages["submitlistingTitle"]
                  )}
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645]"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to cancel? All your data will be lost."
                      )
                    ) {
                      window.location.href = "/";
                    }
                  }}
                >
                  {messages["cancelTitle"]}
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
                <h3 className="text-sm font-medium text-gray-900">
                  {messages["helpneedTitle"]}
                </h3>
                <div className="mt-2 text-sm text-gray-600">
                  <p>{messages["helpneedContent"]}</p>
                  <p className="mt-2">
                    <a
                      href="/contact-us"
                      className="text-[#206645] font-medium hover:text-[#185536]"
                    >
                      {messages["contactsupportTitle"]}
                    </a>
                    {messages["callusatTitle"]}
                    <a
                      href="tel:+48123456789"
                      className="text-[#206645] font-medium hover:text-[#185536]"
                    >
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
