"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const ManageListPage = () => {
  // State for listings data
  const {messages} = useLang();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for filters and pagination
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // State for modals and actions
  const [selectedListing, setSelectedListing] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const querySnapshot1 = await getDocs(collection(db, "lists"));
        const querySnapshot2 = await getDocs(collection(db, "users"));
        // Combine data from both collections
        const data = querySnapshot1.docs.map((doc) => {
          const userDoc = querySnapshot2.docs.find(
            (user) => user.id === doc.id
          );
          if (!userDoc) return null; // Skip if user not found
          return {
            id: doc.id,
            status: userDoc.data().status,
            type: doc.data().entryType,
            name: doc.data().name,
            contactEmail: doc.data().email,
            contactPhone: doc.data().phone,
            address: doc.data().address,
            city: doc.data().city,
            description: doc.data().description,
            reviews: doc.data().reviews || [],
            mainData: doc.data()[doc.data().entryType] || {},
            photos: doc.data().photos,
            avatar: doc.data().avatar,
            verified: true,
            createdAt: doc.data().createdAt.toDate().toISOString(),
          };
        });
        console.log(data);
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    if (!loading && !user.email) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  // Fetch listings data
  // useEffect(() => {
  //   // Simulating API call to fetch listings
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setListings(MOCK_LISTINGS);
  //     setFilteredListings(MOCK_LISTINGS);
  //     setIsLoading(false);
  //   }, 800);
  // }, []);

  // Apply filters
  useEffect(() => {
    let results = [...listings];

    // Filter by status
    if (statusFilter !== "all") {
      results = results.filter((listing) => listing.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== "all") {
      results = results.filter((listing) => listing.type === typeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (listing) =>
          listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.contactEmail
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          listing.id.toString().includes(searchQuery)
      );
    }

    setFilteredListings(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [statusFilter, typeFilter, searchQuery, listings]);

  // Get current listings for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListings = filteredListings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle status change
  const handleStatusChange = (listingId, newStatus) => {
    const updatedListings = listings.map((listing) =>
      listing.id === listingId ? { ...listing, status: newStatus } : listing
    );

    setListings(updatedListings);

    // Close any open modals
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);

    // Show success message
    alert(`Listing #${listingId} has been ${getStatusActionName(newStatus)}`);
  };

  // Get action name based on status
  const getStatusActionName = (status) => {
    switch (status) {
      case "approved":
        return "approved";
      case "pending":
        return "set to pending";
      case "hidden":
        return "hidden";
      case "rejected":
        return "rejected";
      default:
        return "updated";
    }
  };

  // Handle delete
  const handleDelete = (listingId) => {
    const updatedListings = listings.filter(
      (listing) => listing.id !== listingId
    );
    setListings(updatedListings);
    setIsDeleteModalOpen(false);
    alert(`Listing #${listingId} has been deleted`);
  };

  // Open view modal
  const openViewModal = (listing) => {
    setSelectedListing(listing);
    setIsViewModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (listing) => {
    setSelectedListing(listing);
    setEditFormData({ ...listing });
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (listing) => {
    setSelectedListing(listing);
    setIsDeleteModalOpen(true);
  };

  // Handle edit form changes
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditFormData({
        ...editFormData,
        [parent]: {
          ...editFormData[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedListings = listings.map((listing) =>
      listing.id === editFormData.id ? { ...editFormData } : listing
    );

    setListings(updatedListings);
    setIsEditModalOpen(false);
    alert(`Listing #${editFormData.id} has been updated`);
  };

  // Render status badge
  const renderStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      hidden: "bg-gray-100 text-gray-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Render type badge
  const renderTypeBadge = (type) => {
    const typeStyles = {
      careHome: "bg-blue-100 text-blue-800",
      caregiver: "bg-purple-100 text-purple-800",
      nurse: "bg-purple-100 text-purple-800",
      volunteer: "bg-purple-100 text-purple-800",
      transport: "bg-amber-100 text-amber-800",
      store: "bg-emerald-100 text-emerald-800",
      institution: "bg-emerald-100 text-emerald-800",
    };

    const typeNames = {
      careHome: messages['carehomeTitle'],
      caregiver: messages['caregiverTitle'],
      nurse: messages['nurseTitle'],
      volunteer: messages['volunteerTitle'],
      transport: messages['transportTitle'],
      store: messages['seniorstoreTitle'],
      institution: messages['findinstitutionTitle'],
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeStyles[type]}`}
      >
        {typeNames[type]}
      </span>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render dynamic fields based on listing type
  const renderDynamicFields = (listing) => {
    switch (listing.type) {
      case "careHome":
        return (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-500">{messages['capacityTitle']}</h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.mainData.capacity} {messages['residentsTitle']}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {messages['monthlypriceLabel']}
              </h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.mainData.monthlyPrice} PLN
              </p>
            </div>
            <div className="sm:col-span-2">
              <h4 className="text-sm font-medium text-gray-500">{messages['amenitiesTitle']}</h4>
              <div className="mt-1 flex flex-wrap gap-1">
                {listing.mainData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "caregiver":
        return (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-500">{messages['experienceTitle']}</h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.mainData.experience} {messages['yearsTitle']}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">{messages['hourlyrateLabel']}</h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.mainData.hourlyRate}
              </p>
            </div>
            <div className="sm:col-span-2">
              <h4 className="text-sm font-medium text-gray-500">
                {messages['specializationsLabel']}
              </h4>
              <div className="mt-1 flex flex-wrap gap-1">
                {listing.mainData.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {messages['availability']}
              </h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.mainData.availability}
              </p>
            </div>
          </div>
        );

      case "transport":
        return (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Vehicle Type
              </h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.transport.vehicleType}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Service Area
              </h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.transport.serviceArea}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Price per km
              </h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.transport.pricePerKm} PLN
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Operating Hours
              </h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.transport.operatingHours}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Wheelchair Accessible
              </h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.transport.wheelchairAccessible ? "Yes" : "No"}
              </p>
            </div>
          </div>
        );

      case "store":
        return (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <h4 className="text-sm font-medium text-gray-500">
                {messages['productcategoriesTitle']}
              </h4>
              <div className="mt-1 flex flex-wrap gap-1">
                {listing.mainData.productCategories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {messages['openinghoursTitle']}
              </h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.mainData.openingHours}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">{messages['websiteTitle']}</h4>
              <p className="mt-1 text-sm text-gray-900">
                {listing.mainData.websiteUrl ? (
                  <a
                    href={listing.store.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#206645] hover:underline"
                  >
                    {listing.store.websiteUrl}
                  </a>
                ) : (
                  "Not provided"
                )}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  // Render edit form fields based on listing type
  const renderEditFormFields = () => {
    if (!editFormData) return null;

    return (
      <>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {messages['basicinformationTitle']}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {messages['businessnameLabel']}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  value={editFormData.contactEmail}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
              </div>

              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-gray-700"
                >
                  {messages['phoneTitle']}
                </label>
                <input
                  type="text"
                  name="contactPhone"
                  id="contactPhone"
                  value={editFormData.contactPhone}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  {messages['addressLabel']}
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={editFormData.address}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  {messages['cityLabel']}
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={editFormData.city}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  {messages['statusLabel']}
                </label>
                <select
                  id="status"
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                >
                  <option value="pending">{messages['pendingTitle']}</option>
                  <option value="approved">{messages['approvedTitle']}</option>
                  <option value="hidden">{messages['hiddenTitle']}</option>
                  <option value="rejected">{messages['rejectedTitle']}</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              {messages['descriptionTitle']}
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={editFormData.description}
              onChange={handleEditFormChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
            />
          </div>

          {/* Type-specific fields */}
          {editFormData.type === "careHome" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {messages['carehomeinputTitle']}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="careHome.capacity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {messages['capacityTitle']}
                  </label>
                  <input
                    type="number"
                    name="careHome.capacity"
                    id="careHome.capacity"
                    value={editFormData.mainData.capacity}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="careHome.monthlyPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {messages['monthlypriceLabel']}
                  </label>
                  <input
                    type="text"
                    name="careHome.monthlyPrice"
                    id="careHome.monthlyPrice"
                    value={editFormData.mainData.monthlyPrice}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                  />
                </div>

                {/* <div className="sm:col-span-2">
                  <div className="flex items-center">
                    <input
                      id="careHome.medicalSupport"
                      name="careHome.medicalSupport"
                      type="checkbox"
                      checked={editFormData.mainData.medicalSupport}
                      onChange={handleEditFormChange}
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="careHome.medicalSupport"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      24/7 Medical Support
                    </label>
                  </div>
                </div> */}

                {/* <div className="sm:col-span-2">
                  <div className="flex items-center">
                    <input
                      id="careHome.acceptsInsurance"
                      name="careHome.acceptsInsurance"
                      type="checkbox"
                      checked={editFormData.mainData.acceptsInsurance}
                      onChange={handleEditFormChange}
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="careHome.acceptsInsurance"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Accepts Insurance
                    </label>
                  </div>
                </div> */}
              </div>
            </div>
          )}

          {editFormData.type === "caregiver" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {messages['caregiverdetailsTitle']}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="caregiver.experience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {messages['experienceLabel']}
                  </label>
                  <input
                    type="number"
                    name="caregiver.experience"
                    id="caregiver.experience"
                    value={editFormData.mainData.experience}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="caregiver.hourlyRate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {messages['hourlyrateLabel']}
                  </label>
                  <input
                    type="text"
                    name="caregiver.hourlyRate"
                    id="caregiver.hourlyRate"
                    value={editFormData.mainData.hourlyRate}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="caregiver.availability"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {messages['availability']}
                  </label>
                  <input
                    type="text"
                    name="caregiver.availability"
                    id="caregiver.availability"
                    value={editFormData.mainData.availability}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#206645] focus:ring-[#206645]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Similar sections for transport and store types would go here */}
        </div>
      </>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{messages['managelistingsTitle']}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {filteredListings.length} {messages['listingsTitle']}
            </span>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder={messages['searchlistingsPlaceholder']}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#206645] focus:border-[#206645] sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div>
                  <label
                    htmlFor="status-filter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {messages['statusLabel']}
                  </label>
                  <select
                    id="status-filter"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#206645] focus:border-[#206645] sm:text-sm rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">{messages['allstatusesTitle']}</option>
                    <option value="pending">{messages['pendingTitle']}</option>
                    <option value="approved">{messages['approvedTitle']}</option>
                    <option value="hidden">{messages['hiddenTitle']}</option>
                    <option value="rejected">{messages['rejectedTitle']}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="type-filter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {messages['typeTitle']}
                  </label>
                  <select
                    id="type-filter"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#206645] focus:border-[#206645] sm:text-sm rounded-md"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">{messages['alltypesTitle']}</option>
                    <option value="careHome">{messages['carehomeTitle']}</option>
                    <option value="caregiver">{messages['caregiverTitle']}</option>
                    <option value="nurse">{messages['nurseTitle']}</option>
                    <option value="volunteer">{messages['volunteerTitle']}</option>
                    <option value="transport">{messages['transportTitle']}</option>
                    <option value="store">{messages['seniorstoreTitle']}</option>
                    <option value="institution">{messages['findinstitutionTitle']}</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("all");
                    setTypeFilter("all");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645]"
                >
                  {messages['clearfiltersTitle']}
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter("pending")}
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-[#206645] hover:bg-[#185536] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645]"
                >
                  {messages['viewpendingsTitle']}
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-[#206645]">
                    {
                      listings.filter((listing) => listing.status === "pending")
                        .length
                    }
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#206645]"></div>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="px-4 py-5 sm:p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {messages['nolistingsfoundTitle']}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {messages['nolistingsfoundContent']}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {messages['nameTitle']}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {messages['phoneTitle']}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {messages['typeTitle']}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {messages['statusLabel']}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {messages['submittedTitle']}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {messages['actionsTitle']}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentListings.map((listing, index) => (
                    <tr key={listing.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              className="h-10 w-10 rounded-full object-cover"
                              src={listing.photos[listing.avatar] || "/placeholder.svg"}
                              alt=""
                              height={40}
                              width={40}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {listing.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {listing.contactEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {listing.contactPhone || "Not provided"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {renderTypeBadge(listing.type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {renderStatusBadge(listing.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(listing.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openViewModal(listing)}
                            className="text-gray-600 hover:text-gray-900"
                            title="View"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>

                          <button
                            onClick={() => openEditModal(listing)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>

                          {listing.status === "pending" && (
                            <button
                              onClick={() =>
                                handleStatusChange(listing.id, "approved")
                              }
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
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
                            </button>
                          )}

                          {listing.status === "approved" ? (
                            <button
                              onClick={() =>
                                handleStatusChange(listing.id, "hidden")
                              }
                              className="text-gray-600 hover:text-gray-900"
                              title="Hide"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                              </svg>
                            </button>
                          ) : (
                            listing.status === "hidden" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(listing.id, "approved")
                                }
                                className="text-gray-600 hover:text-gray-900"
                                title="Show"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                            )
                          )}

                          {listing.status === "pending" && (
                            <button
                              onClick={() =>
                                handleStatusChange(listing.id, "rejected")
                              }
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
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
                          )}

                          <button
                            onClick={() => openDeleteModal(listing)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Pagination */}
          {!isLoading && filteredListings.length > 0 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                   {messages['paginationshowingTitle1']}{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    {messages['paginationshowingTitle2']}{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredListings.length)}
                    </span>{" "}
                    {messages['paginationshowingTitle3']}{" "}
                    <span className="font-medium">
                      {filteredListings.length}
                    </span>{" "}
                    {messages['paginationshowingTitle4']}
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">{messages['previousTitle']}</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Calculate page numbers to show (centered around current page)
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => paginate(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNum
                              ? "z-10 bg-[#206645] border-[#206645] text-white"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() =>
                        paginate(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>

              <div className="flex sm:hidden">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? "text-gray-300 bg-white cursor-not-allowed"
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-300 bg-white cursor-not-allowed"
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* View Modal */}
      {isViewModalOpen && selectedListing && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={() => setIsViewModalOpen(false)}
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedListing.name}
                      </h3>
                      <div className="flex items-center">
                        {renderStatusBadge(selectedListing.status)}
                        <button
                          onClick={() => setIsViewModalOpen(false)}
                          className="ml-3 bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          <span className="sr-only">Close</span>
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="aspect-w-16 aspect-h-9 mb-4">
                        <Image
                          src={selectedListing.photos[0] || "/placeholder.svg"}
                          alt={selectedListing.name}
                          className="object-cover rounded-md"
                          width={200}
                          height={100}
                        />
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <div className="flex items-center mr-4">
                          {renderTypeBadge(selectedListing.type)}
                        </div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>
                            Created: {formatDate(selectedListing.createdAt)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mb-4">
                        {selectedListing.description}
                      </p>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Contact Email
                          </h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedListing.contactEmail}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Contact Phone
                          </h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedListing.contactPhone}
                          </p>
                        </div>
                        <div className="sm:col-span-2">
                          <h4 className="text-sm font-medium text-gray-500">
                            Address
                          </h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedListing.address}, {selectedListing.city}
                          </p>
                        </div>
                      </div>

                      {/* Dynamic fields based on listing type */}
                      {renderDynamicFields(selectedListing)}

                      {/* Photos */}
                      {selectedListing.photos.length > 1 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Photos
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            {selectedListing.photos
                              .slice(1)
                              .map((photo, index) => (
                                <div
                                  key={index}
                                  className="aspect-w-1 aspect-h-1"
                                >
                                  <Image
                                    src={photo || "/placeholder.svg"}
                                    alt={`${selectedListing.name} photo ${
                                      index + 2
                                    }`}
                                    className="object-cover rounded-md"
                                    height={100}
                                    width={100}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {selectedListing.status === "pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(selectedListing.id, "approved")
                      }
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(selectedListing.id, "rejected")
                      }
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}

                {selectedListing.status === "approved" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(selectedListing.id, "hidden")
                    }
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Hide
                  </button>
                )}

                {selectedListing.status === "hidden" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(selectedListing.id, "approved")
                    }
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Show
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => openEditModal(selectedListing)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editFormData && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={() => setIsEditModalOpen(false)}
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleEditSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Edit Listing
                        </h3>
                        <button
                          type="button"
                          onClick={() => setIsEditModalOpen(false)}
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          <span className="sr-only">Close</span>
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-4 max-h-[60vh] overflow-y-auto">
                        {renderEditFormFields()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#206645] text-base font-medium text-white hover:bg-[#185536] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645] sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedListing && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={() => setIsDeleteModalOpen(false)}
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Listing
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this listing? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedListing.id)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListPage;
