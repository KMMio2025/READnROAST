import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Get JWT from localStorage (or sessionStorage, as appropriate)
  const getToken = () => localStorage.getItem("jwt_token");

  const PROFILE_ENDPOINT = "/api/auth/me";

  // Fetch user profile
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError("");
      const token = getToken();
      if (!token) {
        setError("No JWT token found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(PROFILE_ENDPOINT, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
        const contentType = res.headers.get("content-type") || "";
        if (!res.ok) {
          // Try to get error message from JSON, else fallback to text
          if (contentType.includes("application/json")) {
            const errData = await res.json();
            throw new Error(errData.message || "Could not fetch profile data.");
          } else {
            const text = await res.text();
            throw new Error("Could not fetch profile data. " + text.slice(0, 100));
          }
        }
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            "Unexpected server response. Are you logged in? " +
            text.slice(0, 100)
          );
        }
        const data = await res.json();
        setUser(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit (update user info)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    const token = getToken();
    if (!token) {
      setError("No JWT token found. Please log in.");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch(PROFILE_ENDPOINT, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to update profile.");
        } else {
          const text = await res.text();
          throw new Error("Failed to update profile. " + text.slice(0, 100));
        }
      }
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(
          "Unexpected server response. " + text.slice(0, 100)
        );
      }
      const data = await res.json();
      setUser(data);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error)
    return (
      <div style={{ color: "red", maxWidth: 500, margin: "2rem auto" }}>
        Error: {error}
        {(error.includes("logged in") || error.includes("token")) && (
          <div>
            <button
              onClick={() => (window.location = "/login")}
              style={{
                marginTop: 16,
                padding: "10px 20px",
                background: "#6f4e37",
                color: "#fff",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    );

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "2rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      }}
    >
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={{ marginBottom: 16 }}>
          <label>
            Name:<br />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={saving}
              style={{
                marginTop: 4,
                width: "100%",
                padding: 8,
                borderRadius: 5,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Email:<br />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={saving}
              style={{
                marginTop: 4,
                width: "100%",
                padding: 8,
                borderRadius: 5,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Phone:<br />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={saving}
              style={{
                marginTop: 4,
                width: "100%",
                padding: 8,
                borderRadius: 5,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Address:<br />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              disabled={saving}
              style={{
                marginTop: 4,
                width: "100%",
                padding: 8,
                borderRadius: 5,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "10px 20px",
            background: "#6f4e37",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
      {success && (
        <div style={{ color: "green", marginTop: 12 }}>Profile updated!</div>
      )}
    </div>
  );
}