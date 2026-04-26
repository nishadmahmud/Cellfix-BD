"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { apiBaseUrl, userId } from "@/lib/appConfig";

const UPLOAD_URL = "https://www.outletexpense.xyz/api/customer/file-upload";
const DEFAULT_FORM = {
  customer_email: "",
  customer_phone: "",
  customer_address: "",
  product_list_dropdown: "",
  description: "",
};

export default function SellPhonePage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [files, setFiles] = useState({
    customer_image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e) => {
    const { name, files: inputFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: inputFiles?.[0] || null }));
  };

  const validateRequired = () => {
    const requiredFields = [
      "customer_email",
      "customer_phone",
      "customer_address",
      "product_list_dropdown",
      "description",
    ];

    for (const field of requiredFields) {
      if (!String(form[field] || "").trim()) {
        toast.error(`Please fill ${field.replaceAll("_", " ")}`);
        return false;
      }
    }

    if (!files.customer_image) {
      toast.error("Please upload product image");
      return false;
    }

    return true;
  };

  const uploadSingleFile = async (file, token) => {
    const formData = new FormData();
    formData.append("file_name", file);
    formData.append("user_id", String(userId));

    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload request failed");
    }

    const data = await res.json();
    if (data?.success !== true || !data?.path) {
      throw new Error(data?.message || "Upload failed");
    }

    return data.path;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateRequired()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to submit sell request");
      return;
    }

    setIsSubmitting(true);

    try {
      const customer_image = await uploadSingleFile(files.customer_image, token);
      const utility_bill_copy = customer_image;
      const bill_copy = customer_image;

      const payload = {
        user_id: String(userId),
        customer_email: form.customer_email.trim(),
        customer_phone: form.customer_phone.trim(),
        customer_address: form.customer_address.trim(),
        nid: "N/A",
        utility_bill_copy,
        customer_image,
        product_list_dropdown: form.product_list_dropdown.trim(),
        product_id: undefined,
        body_condition: "Super Fresh",
        display_condition: "Fresh",
        camera_condition: "Fresh",
        mobile_repair_history: false,
        face_id: "Working",
        display_change: "Not Changed",
        battery_condition: "Original",
        water_proof: "Available",
        battery_health: form.description.trim(),
        bill_copy,
        status: "0",
      };

      const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/public/customer-sells`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.message || "Submit failed");
      }

      if (data?.success === false) {
        throw new Error(data?.message || "Submit failed");
      }

      toast.success(data?.message || "Sell request submitted successfully");
      setForm(DEFAULT_FORM);
      setFiles({
        customer_image: null,
      });
    } catch (error) {
      toast.error(error?.message || "Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Book Mobile Repair</h1>
          <p className="text-sm text-gray-500 mt-1">
            Share your contact details, product name, product image, and repair description.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input name="customer_email" type="email" required value={form.customer_email} onChange={onChange} placeholder="Customer Email" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
            <input name="customer_phone" type="text" required value={form.customer_phone} onChange={onChange} placeholder="Customer Phone" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
            <textarea name="customer_address" required value={form.customer_address} onChange={onChange} placeholder="Customer Address" rows={3} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
            <input name="product_list_dropdown" type="text" required value={form.product_list_dropdown} onChange={onChange} placeholder="Product Name" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description *</label>
              <textarea
                name="description"
                required
                value={form.description}
                onChange={onChange}
                rows={5}
                placeholder="Write issue details (for example: battery drains fast, phone heats up, charging problem, etc.)"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
              />
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image *</label>
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 md:p-5 hover:border-brand-orange hover:bg-orange-50/40 transition-colors">
                  <input
                    name="customer_image"
                    type="file"
                    accept="image/*"
                    required
                    onChange={onFileChange}
                    className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-orange file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#ff1a2b]"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Upload a clear photo of the product (JPG, PNG, or WEBP).
                  </p>
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-brand-orange text-white py-3.5 font-bold hover:bg-[#ff1a2b] transition-colors disabled:opacity-70">
              {isSubmitting ? "Submitting..." : "Submit Repair Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

