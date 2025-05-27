import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const PROFILE_ENDPOINT = "http://localhost:8080/api/auth/me";

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    async function fetchUser() {
      const token = localStorage.getItem("token"); 
      if (!token) {
        throw new Error("User is not authenticated");
      }

      setLoading(true);
      setError("");
      try {
        const response = await fetch(PROFILE_ENDPOINT, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          
        });

        if (!response.ok) {
          throw new Error("Could not fetch profile data. Please try again.");
        }

        const data = await response.json();
        setUser(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          street: data.street || "",
          city: data.city || "",
          zip: data.zip || "",
          country: data.country || "",
          phone: data.phone || "",
        });
      } catch (err) {
        setError(err.message);
        if (err.message.includes("authentication") || err.message.includes("logged in")) {
          logOut();
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [isLoggedIn, navigate, logOut]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    const token = localStorage.getItem("token"); 


    try {
      const response = await fetch(PROFILE_ENDPOINT, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          street: form.street,
          city: form.city,
          zip: form.zip,
          country: form.country,
          phone: form.phone
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile. Please try again.");
      }

      const data = await response.json();
      setUser(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("authentication") || err.message.includes("logged in")) {
        logOut();
      }
    } finally {
      setSaving(false);
    }
  };
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    setError("");
    
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }
  
      localStorage.removeItem("token");
      logOut();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };
  
  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
        <style jsx>{`
          .profile-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 300px;
          }
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #6f4e37;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <h3>Error</h3>
        <p>{error}</p>
        <button
          onClick={() => error.includes("logged in") ? navigate("/login") : window.location.reload()}
          className="error-button"
        >
          {error.includes("logged in") ? "Go to Login" : "Try Again"}
        </button>
        <style jsx>{`
          .profile-error {
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-align: center;
          }
          .profile-error h3 {
            color: #d32f2f;
            margin-bottom: 8px;
          }
          .profile-error p {
            color: #555;
            margin-bottom: 16px;
          }
          .error-button {
            padding: 10px 20px;
            background: #6f4e37;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.2s;
          }
          .error-button:hover {
            background: #5a3c2c;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={saving}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={saving}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                disabled={saving}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                disabled={saving}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Contact Information</h3>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={saving}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Address</h3>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={form.street}
              onChange={handleChange}
              disabled={saving}
              className="form-input"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                disabled={saving}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={form.zip}
                onChange={handleChange}
                disabled={saving}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={form.country}
              onChange={handleChange}
              disabled={saving}
              className="form-input"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={saving}
          className="submit-button"
        >
          {saving ? (
            <>
              <span className="spinner"></span>
              Saving...
            </>
          ) : "Save Changes"}
        </button>
        
        {success && (
          <div className="success-message">
            Profile updated successfully!
          </div>
        )}
      </form>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
      <div className="logout-container">
  <button onClick={handleLogout} className="logout-button">
    Log Out
  </button>
</div>

  
</div>

      <style jsx>{`
        .profile-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .profile-title {
          color: #333;
          text-align: center;
          margin-bottom: 24px;
        }
        
        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .form-section {
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
          background: #fafafa;
        }
        
        .section-title {
          margin-top: 0;
          margin-bottom: 16px;
          color: #444;
          font-size: 18px;
        }
        
        .form-row {
          display: flex;
          gap: 16px;
        }
        
        .form-row .form-group {
          flex: 1;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        
        .form-group label {
          font-weight: 500;
          color: #555;
          font-size: 14px;
        }
        
        .form-input {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          transition: border 0.2s;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #6f4e37;
        }
        
        .form-input:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }
        
        .submit-button {
          margin-top: 12px;
          padding: 12px;
          background: #6f4e37;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
        }
        
        .submit-button:hover:not(:disabled) {
          background: #5a3c2c;
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .submit-button .spinner {
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 2px solid white;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
        }
        
        .success-message {
          margin-top: 12px;
          padding: 10px;
          background: rgb(247, 240, 218);
          color:  #6f4e37;
          border-radius: 4px;
          text-align: center;
          animation: fadeIn 0.3s;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
          .logout-container {
  margin-top: 24px;
  text-align: center;
}

.logout-button {
  display: center;
  background: rgb(247, 240, 218);
  color: #6f4e37;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.logout-button:hover {
  background: rgb(249, 234, 183);
}

      `}</style>
    </div>
  );
}