import React from "react";
import Inquiries from "../components/Inquiries";
import { useSelector } from "react-redux";


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
const AdminPanel = ({isAdmin}) => {
    return (
        <div>
        {isAdmin && (
          <div class = "admin-panel">
          <div class = "grid-container">
              <div class = "site-content" id = "site-content">
              <h2>Admin Panel</h2>
              <hr></hr>
                <div class = "listing-creation-form">
                    <form action="http://localhost:4000/api/listings/create" method="post" enctype="multipart/form-data">
                        <h3>Create Listing</h3>
                        <div class = "listing-creation-form-title">
                        <label for="title">Title: </label>
                        <input type="text" name="title" id="title"/>
                        </div>

                        <div class = "listing-creation-form-description">
                        <label for="description">Description: </label>
                        <input id="description" name="description" type="text"></input>
                        </div>

                        <div class = "listing-creation-form-price">
                        <label for="price">Price: </label>
                        <input id="price" name="price" type="number" step="0.01" min="0"></input>
                        </div>

                        <div class = "listing-creation-form-type">
                        <label for="type">Type: </label>
                        <input id="type" name="type" type="text"></input>
                        </div>

                        <div class = "listing-creation-form-photos">
                        <input id="photos" name="photos" type="file" multiple accept="image/*"></input>
                        </div>

                        <div class = "listing-creation-form-button">
                        <button type="submit">Create Listing</button>
                        </div>
                    </form>
                </div>
            <hr></hr>
              <Inquiries />
              </div>
          </div>
      </div>
        )}
        </div>
    );    
};


export default AdminPanel;
