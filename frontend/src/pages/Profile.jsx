import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    pincode: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user && isAuthenticated) {
      axios.get(`/api/profile/${user.email}`).then((res) => {
        setProfile(res.data);
      });
    }
  }, [user, isAuthenticated]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await axios.post("/api/profile/update", {
      email: user.email,
      ...profile,
    });
    setEditing(false);
  };

  // if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated)
    return <button onClick={() => loginWithRedirect()}>Login</button>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {Object.keys(profile).map((key) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium capitalize mb-1">{key}</label>
          <input
            name={key}
            value={profile[key]}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>
      ))}
      <div className="flex justify-between">
        {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
        {editing && (
          <>
            <button onClick={handleSave}>Save</button>
            <button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        )}
        <button variant="destructive" onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      </div>
    </div>
  );
}