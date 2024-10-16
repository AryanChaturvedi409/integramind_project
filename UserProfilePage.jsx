import React, { useState } from "react";
import "./style.css";

// Service to create a new user profile
const createUserProfileService = async (profileData) => {
  try {
    const response = await fetch("http://localhost:5000/api/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    return await response.json();
  } catch (error) {
    return { status: false, msg: "Error creating profile", cls: "error" ,error};
  }
};

const UserProfileForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Handle profile creation
  const handleProfileCreate = async (event) => {
    event.preventDefault();
    const newProfile = {
      fullName,
      email,
    };

    const { status, msg, cls } = await createUserProfileService(newProfile);
    alert(`${cls}: ${msg}`);

    if (status) {
      setFullName("");
      setEmail("");
    }
  };

  return (
    <div className="user-profile-form">
      <form onSubmit={handleProfileCreate}>
        <h2>Create Profile</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="save-profile-btn" type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
};

const UserProfilePage = () => {
  return (
    <main className="user-profile-page">
      <UserProfileForm />
    </main>
  );
};

export default UserProfilePage;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserProfile = () => {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get('/api/user/123', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Corrected this line
//         });
//         setProfile(res.data.user);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <div>
//     <h1>{profile?.name}'s Profile</h1> {/* Use optional chaining to avoid null access */}
//     <p>Email: {profile?.email}</p> {/* Safe access with optional chaining */}
//     {/* Add more profile fields */}
//   </div>
//   );
// };

// export default UserProfile;



