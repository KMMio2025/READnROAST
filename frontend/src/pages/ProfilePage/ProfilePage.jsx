import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import {
    ProfileContainer,
    Section,
    SectionTitle,
    InfoBox,
    EditButton,
    ListItem,
} from "./ProfileStyles.js";

export default function ProfilePage() {
    const { userData, updateUserData } = useContext(AuthContext);
    const [editUserMode, setEditUserMode] = useState(false);
    const [editShippingMode, setEditShippingMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        phone: userData?.phone || "",
        street: userData?.street || "",
        city: userData?.city || "",
        zipCode: userData?.zipCode || "",
        country: userData?.country || "",
    });

    const dummyOrders = ["Order #1234 - Coffee Beans", "Order #1235 - French Press"];
    const dummyFavorites = ["Colombian Medium Roast", "Kenyan Espresso", "A Man Called Ove - Fredrik Backman"];

    function handleInputChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    async function handleSaveChanges() {
        if (!isValidEmail(formData.email)) {
            alert("Please provide a valid email.");
            return;
        }
        try {
            setLoading(true);

            const response = await fetch("/api/users/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                let errorData = {};
                const errorText = await response.text();
                if (errorText) {
                    errorData = JSON.parse(errorText);
                }
                throw new Error(errorData.message || "Failed to update profile.");
            }

            // --- HERE IS THE IMPORTANT FIX ---
            let updatedUser = {};
            const text = await response.text();
            if (text) {
                updatedUser = JSON.parse(text);
            }

            console.log("Profile updated successfully:", updatedUser);

            if (updateUserData && updatedUser) {
                updateUserData(updatedUser);
            }

            setEditUserMode(false);
            setEditShippingMode(false);

            alert("Profile updated successfully! ✅");

        } catch (error) {
            console.error("Error updating profile:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProfileContainer>
            <Section>
                <SectionTitle>User info</SectionTitle>
                {!editUserMode ? (
                    <InfoBox>
                        <li>Username: {formData.name}</li>
                        <li>Email: {formData.email}</li>
                        <li>First Name: {formData.firstName}</li>
                        <li>Last Name: {formData.lastName}</li>
                        <li>Phone: {formData.phone}</li>
                        <EditButton onClick={() => setEditUserMode(true)}>Edit</EditButton>
                    </InfoBox>
                ) : (
                    <InfoBox>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                        {!isValidEmail(formData.email) && (
                            <p style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
                                Please enter a valid email address
                            </p>
                        )}
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone"
                        />
                        <EditButton onClick={handleSaveChanges} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </EditButton>
                    </InfoBox>
                )}
            </Section>

            <Section>
                <SectionTitle>Shipping info</SectionTitle>
                {!editShippingMode ? (
                    <InfoBox>
                        <li>Street: {formData.street}</li>
                        <li>City: {formData.city}</li>
                        <li>Zip Code: {formData.zipCode}</li>
                        <li>Country: {formData.country}</li>
                        <EditButton onClick={() => setEditShippingMode(true)}>Edit</EditButton>
                    </InfoBox>
                ) : (
                    <InfoBox>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            placeholder="Street"
                        />
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                        />
                        <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="Zip Code"
                        />
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                        />
                        <EditButton onClick={handleSaveChanges} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </EditButton>
                    </InfoBox>
                )}
            </Section>

            <Section>
                <SectionTitle>Order History</SectionTitle>
                {dummyOrders.map((order, idx) => (
                    <ListItem key={idx}>{order}</ListItem>
                ))}
            </Section>

            <Section>
                <SectionTitle>Favorite Items</SectionTitle>
                {dummyFavorites.map((item, idx) => (
                    <ListItem key={idx}>{item}</ListItem>
                ))}
            </Section>

            <Section>
                <SectionTitle>Change Your Data</SectionTitle>
                <p>You can edit your personal data above in the Info section.</p>
            </Section>
        </ProfileContainer>
    );
}