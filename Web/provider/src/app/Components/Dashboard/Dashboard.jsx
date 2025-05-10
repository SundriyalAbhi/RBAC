import React, { useState } from 'react';

const ProviderDashboard = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'TechCorp', admins: 2 },
    { id: 2, name: 'HealthInc', admins: 1 },
  ]);

  const [admins, setAdmins] = useState([
    { id: 1, name: 'John Doe', company: 'TechCorp' },
    { id: 2, name: 'Jane Smith', company: 'HealthInc' },
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Provider Dashboard</h1>

      {/* Overview */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <Card title="Total Companies" value={companies.length} />
        <Card title="Total Admins" value={admins.length} />
      </div>

      {/* Company List */}
      <section>
        <h2>Companies</h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Admins</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.admins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Admin Management */}
      <section style={{ marginTop: '30px' }}>
        <h2>Admins</h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Settings */}
      <section style={{ marginTop: '30px' }}>
        <h2>Provider Settings</h2>
        <button>Change Password</button>
        <button style={{ marginLeft: '10px' }}>Update Profile</button>
      </section>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div style={{ border: '1px solid #ccc', padding: '20px', minWidth: '150px' }}>
    <h3>{title}</h3>
    <p style={{ fontSize: '24px' }}>{value}</p>
  </div>
);

export default ProviderDashboard;
