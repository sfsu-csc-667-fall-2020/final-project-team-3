import React from "react";
import Inquiries from "../components/Inquiries";
import { useSelector } from "react-redux";
import ListingCreationForm from "./ListingCreationForm";


// TODO: display the listing creation form when a button is clicked

const loadListingCreationForm = () => {
    return (
        <div class = "listing-creation-form">
            <form action="http://localhost:4000/api/listings/create" method="post" enctype="multipart/form-data">
                <h2>creating listing</h2>
                <label for="title">title:</label>
                <input type="text" name="title" id="title"/>
            
                <label for="description">description:</label>
                <input id="description" name="description" type="text"></input>
            
                <label for="price">price:</label>
                <input id="price" name="price" type="number" step="0.01" min="0"></input>
            
                <label for="type">type:</label>
                <input id="type" name="type" type="text"></input>
            
                <input id="photos" name="photos" type="file" multiple accept="image/*"></input>
            
                <button type="submit">create listing</button>
            </form>
        
        
            <form action="http://localhost:4000/api/listings/addImage?listingId=5fcde1ef9f42a8369c083fd0" method="post" enctype="multipart/form-data">
                <input id="photos" name="photos" type="file" multiple accept="image/*"></input>
                <button type="submit">add images</button>
            </form>
        </div>
    );    
};



// Admin panel - loads inquiries and allows admins to respond - only display if logged in as admin
// TODO: add the inquiry functionality
const AdminPanel = ({username, _id}) => {
    return (
        <div class = "admin-panel">
            <div class = "grid-container">
               <div class = "site-content" id = "site-content">
        <ListingCreationForm />
        <Inquiries />
        </div>
        </div>
        </div>
    );    
};


export default AdminPanel;
