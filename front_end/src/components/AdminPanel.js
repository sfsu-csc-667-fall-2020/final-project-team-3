import React from "react";
import Inquiries from "../components/Inquiries";


// Admin panel - loads inquiries and allows admins to respond - only display if logged in as admin
// TODO: add the inquiry functionality
const AdminPanel = ({isAdmin}) => {
    return (
        <div>
        {isAdmin && (
          <div class = "admin-panel">
          <div class = "grid-container">
              <div class = "site-content" id = "site-content">
              <h3>Admin Panel</h3>
              inquiries and response op tion will go here
              <Inquiries />
              </div>
          </div>
      </div>
        )}
        </div>
    );    
};


export default AdminPanel;
