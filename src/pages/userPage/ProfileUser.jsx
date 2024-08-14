// import React, { useState, useEffect } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import { Link, useParams } from 'react-router-dom';
// // Pastikan untuk mengimpor fungsi `getUserById`

// function ProfileUser() {
//   const [user, setUser] = useState(null);
//   const { id } = useParams(); 

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await getUserById(id); 
//         setUser(userData);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="max-w-md w-full bg-white shadow-lg rounded-lg border border-gray-200">
//         <div className="px-6 py-4 flex items-center">
//           <FaUserCircle className="text-gray-500 text-3xl mr-3" />
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">
//               Profil Pengguna
//             </h3>
//             <p className="mt-2 text-sm text-gray-600">
//               Informasi Pengguna
//             </p>
//           </div>
//         </div>
//         <div className="border-t border-gray-200">
//           <dl className="divide-y divide-gray-200">
//             <div className="px-6 py-4">
//               <dt className="text-sm font-medium text-gray-500">
//                 Username
//               </dt>
//               <dd className="mt-1 text-sm text-gray-900">
//                 {user.username}
//               </dd>
//             </div>
//             <div className="px-6 py-4">
//               <dt className="text-sm font-medium text-gray-500">
//                 Alamat Email
//               </dt>
//               <dd className="mt-1 text-sm text-gray-900">
//                 {user.email}
//               </dd>
//             </div>
//           </dl>
//         </div>
//         <div className="px-6 py-4">
//           <Link 
//             to="/homepage-user" 
//             className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
//           >
//             Kembali
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileUser;
