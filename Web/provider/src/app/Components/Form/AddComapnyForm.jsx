'use client';
import React, { useContext, useEffect, useState } from 'react';
import { CompanyContext } from '@/app/Context/CompanyContext';
import "@/app/style.css";

const AddCompanyForm = ({ ownerId, setIsOpenModal, DataForUpdate }) => {
  const { ADDCOMPANY, UPDATECOMPANYDETAILS } = useContext(CompanyContext);

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    email: '',
    city: '',
    state: '',
    country: '',
    createdBy: ownerId || 'Abhi',
  });

  const isEditMode = DataForUpdate && Object.keys(DataForUpdate).length > 0;

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: DataForUpdate.name || '',
        industry: DataForUpdate.industry || '',
        email: DataForUpdate.email || '',
        city: DataForUpdate.address?.city || '',
        state: DataForUpdate.address?.state || '',
        country: DataForUpdate.address?.country || '',
        createdBy: ownerId || 'Abhi',
      });
    }
  }, [DataForUpdate, isEditMode, ownerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditMode) {
        res = await UPDATECOMPANYDETAILS(DataForUpdate._id, formData);
      } else {
        res = await ADDCOMPANY(formData);
      }

      if (res?.status === 200 || res?.status === 201) {
        alert(isEditMode ? 'Company updated successfully!' : 'Company added successfully!');
        setFormData({
          name: '',
          industry: '',
          email: '',
          city: '',
          state: '',
          country: '',
          createdBy: ownerId || '',
        });
        setIsOpenModal(false);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit company data. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Update Company' : 'Add Company'}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Industry</label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['city', 'state', 'country'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          {isEditMode ? 'Update Company' : 'Add Company'}
        </button>
      </div>
    </form>
  );
};

export default AddCompanyForm;
