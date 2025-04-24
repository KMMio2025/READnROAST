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
  const { userData } = useContext(AuthContext);
  const [editUserMode, setEditUserMode] = useState(false);
  const [editShippingMode, setEditShippingMode] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
  });

  const dummyOrders = ["Order #1234 - Coffee Beans", "Order #1235 - French Press"];
  const dummyFavorites = ["Colombian Medium Roast", "Kenyan Espresso", "A man called Ove - Fredrick Backman"];
 
  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSaveChanges() {
    // here would be an API call
    setEditUserMode(false);
    setEditShippingMode(false);
    console.log("Data saved", formData);
  }
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  return (
    <ProfileContainer>
      <Section>
        <SectionTitle>User info</SectionTitle>
        {!editUserMode ? (
          <InfoBox>
            <l1>Username: {formData.name}</l1>
            <l1>Email: {formData.email}</l1>
            <l1>First Name: {formData.firstName}</l1>
            <l1>Last Name: {formData.lastName}</l1>
            <l1>Phone: {formData.phone}</l1>
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
              placeholder="Last name:"
            />
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
            <EditButton onClick={handleSaveChanges}>Save</EditButton>
          </InfoBox>
        )}
      </Section>
      <Section>
        <SectionTitle>Shipping info</SectionTitle>
        {!editShippingMode ? (
          <InfoBox>
            <l1>Street: {formData.street}</l1>
            <l1>City: {formData.city}</l1>
            <l1>Zip Code: {formData.zipCode}</l1>
            <l1>Country: {formData.country}</l1>
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
              placeholder="Country:"
            />
            <EditButton onClick={handleSaveChanges}>Save</EditButton>
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
