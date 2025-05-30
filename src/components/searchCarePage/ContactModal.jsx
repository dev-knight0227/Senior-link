import React, { useState } from "react";

export default function ContactModal({ isOpen, onClose, phone, email, telegram }) {
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

        <p
          className="mb-2 cursor-pointer select-all"
          onClick={() => copyToClipboard(phone, "phone")}
          title="Click to copy phone"
        >
          <strong>Phone:</strong> {phone}
          {copiedField === "phone" && (
            <span className="ml-2 text-green-600 font-semibold">Copied!</span>
          )}
        </p>

        <p
          className="mb-2 cursor-pointer select-all"
          onClick={() => copyToClipboard(email, "email")}
          title="Click to copy email"
        >
          <strong>Email:</strong> {email}
          {copiedField === "email" && (
            <span className="ml-2 text-green-600 font-semibold">Copied!</span>
          )}
        </p>

        {telegram && telegram !== "" && (
          <p className="mb-4">
            <strong>Telegram:</strong>{" "}
            <a href={telegram} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {telegram}
            </a>
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-[#206645] text-white rounded hover:bg-[#185536] focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
}
