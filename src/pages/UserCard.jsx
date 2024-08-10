import React from 'react';
import './UserCard.css'; // Styling khusus untuk UserCard dan Navbar

const UserCard = () => {
  return (
    <div className="user-card-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="https://via.placeholder.com/50" alt="Logo" className="logo" />
        
        </div>
        <div className="navbar-icons flex items-center space-x-4">
          {/* Icon Lonceng menggunakan Tailwind CSS */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V9a6 6 0 10-12 0v5c0 .538-.214 1.055-.595 1.405L4 17h5m4 0a3 3 0 01-6 0" />
          </svg>
          
          {/* Icon Avatar menggunakan Tailwind CSS */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A3.993 3.993 0 018 16h8a3.993 3.993 0 012.879 1.804M15 12a3 3 0 10-6 0m6 0a3 3 0 11-6 0m7 8H6a2 2 0 00-2 2v2h16v-2a2 2 0 00-2-2z" />
          </svg>
        </div>
      </nav>
      
      <div className="user-card-text mt-4 ">
        <h2>Daftar Users</h2>
        <p>Lihat informasi mengenai users</p>
        
        <div className="user-card-container">
        <div className="user-cards">
          <UserCardComponent
            avatar="https://via.placeholder.com/150"
            name="USERS"
            ktp="3279025608760840"
            phone="082123567890"
            email="indrayangsatu@gmail.com"
          />
          {/* Tambahkan UserCardComponent lainnya sesuai kebutuhan */}
        </div>
        </div>
        
      </div>
      
    </div>
  );
};

// Komponen untuk menampilkan setiap card user
const UserCardComponent = ({ avatar, name, ktp, phone, email }) => {
  return (
    <div className="user-card">
      <img src={avatar} alt="User Avatar" className="user-avatar" />
      <div className="user-info">
        <h3>{name}</h3>
        <p>No. Id: {ktp}</p>
        <p>No. Handphone: {phone}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default UserCard;
