import React from "react";
import Inquiries from "../components/Inquiries";
import { useSelector } from "react-redux";
import ListingCreationForm from "./ListingCreationForm";



const select = appState => ({
    isLoggedIn: appState.loginReducer.isLoggedIn,
    username: appState.loginReducer.username,
    _id: appState.loginReducer._id,
  })

// TODO: display the listing creation form when a button is clicked


// Admin panel - loads inquiries and allows to respond - only display if logged in
const AdminPanel = () => {
    return (
        <div>

        {isLoggedIn && (
        <div class = "admin-panel">
            <div class = "grid-container">
                <div class = "site-content" id = "site-content">
                <ListingCreationForm />
                <Inquiries />
                </div>
            </div>
        </div>
        )}

        </div>
    );    
};


export default connect(select)(AdminPanel);
