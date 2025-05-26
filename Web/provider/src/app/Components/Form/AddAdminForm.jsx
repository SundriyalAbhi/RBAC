'use client';
import { AuthContext } from '@/app/Context/AuthContext';
import { CompanyContext } from '@/app/Context/CompanyContext';
import React, { useContext, useEffect, useState } from 'react';

const AddAdminForm = ({ DataForUpdate, setIsOpenModal, companies = [], ADDADMIN, UPDATEADMIN }) => {
  const {AuthData} = useContext(AuthContext)
  let ownerId = AuthData.adminId
  const isEditMode = !!DataForUpdate && Object.keys(DataForUpdate).length > 0;
  const {AddAdmin} = useContext(CompanyContext)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyId: '',
    role:'admin',
    createdBy: ownerId,
  });
  
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: DataForUpdate.name || '',
        email: DataForUpdate.email || '',
        companyId: DataForUpdate.companyId || '',
        createdBy: ownerId,
      });
    }
  }, [DataForUpdate, isEditMode, ownerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditMode) {
        res = await UPDATEADMIN(DataForUpdate._id, formData);
      } else {
        res = await AddAdmin(formData);
      }

      if (res === 200 || res === 201) {
        alert(isEditMode ? 'Admin updated successfully!' : 'Admin added successfully!');
        setIsOpenModal(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          companyId: '',
          createdBy: ownerId,
        });
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit admin data. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Update Admin' : 'Add Admin'}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
        />
      </div>

      {!isEditMode && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Assign to Company *</label>
        <select
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
        >
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          {isEditMode ? 'Update Admin' : 'Add Admin'}
        </button>
      </div>
    </form>
  );
};

export default AddAdminForm;
