import React from "react";
import Inquiries from "../components/Inquiries";


// Admin panel - loads inquiries and allows admins to respond
// TODO: add the inquiry functionality
const Admin = () => {
  return (
    <div class = "admin-panel">
      <div class = "grid-container">
        <div class = "site-content" id = "site-content">
          <h3>Admin Panel</h3>
          inquiries and response op tion will go here
          <Inquiries />
        </div>
      </div>
    </div>
  );
};

export default Admin;
