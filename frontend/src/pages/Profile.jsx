import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    pincode: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user?.email) {
      const storedProfile = localStorage.getItem(`profile-${user.email}`);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!user) {
      alert("Please login to save your profile.");
      return;
    }
    localStorage.setItem(`profile-${user.email}`, JSON.stringify(profile));
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (user?.email) {
      localStorage.removeItem(`profile-${user.email}`);
    }
    setUser(null);
    setProfile({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      city: "",
      pincode: "",
    });
  };

  const handleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    const decoded = jwtDecode(credential);

    const userData = {
      email: decoded.email,
      name: decoded.name,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <GoogleOAuthProvider clientId="587963875107-0qqpqv81o4k1cgrslsd5ua8j21e2ee33.apps.googleusercontent.com">
      {!user ? (
        <div className="login-container">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => alert("Login failed")}
          />
        </div>
      ) : (
        <div className="profile-container">
          <h1 className="profile-heading">Welcome, {user.name}</h1>
          <div className="profile-form">
            {Object.keys(profile).map((key) => (
              <div key={key} className="profile-field">
                <label className="profile-label">{key}</label>
                <input
                  name={key}
                  value={profile[key] || ""}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`profile-input ${editing ? "editable" : "readonly"}`}
                />
              </div>
            ))}
          </div>
          <div className="profile-actions">
            {!editing && (
              <button onClick={() => setEditing(true)} className="btn edit">Edit</button>
            )}
            {editing && (
              <>
                <button onClick={handleSave} className="btn save">Save</button>
                <button onClick={() => setEditing(false)} className="btn cancel">Cancel</button>
              </>
            )}
            <button onClick={handleLogout} className="btn logout">Logout</button>
          </div>
        </div>
      )}
    </GoogleOAuthProvider>
  );
}