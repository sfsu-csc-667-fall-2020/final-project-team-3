import React from 'react';
import { connect } from 'react-redux';
import Listing from '../components/Listing';
import axios from 'axios';


// display listings if they exist
const ViewListings = () => {
  const listings = {};
  //let numberOfListings = store.getState().listingReducer.numberOfListings;
  //const listings = getState().listingReducer.items;
  // get listings and store
  axios.get('/api/listings')
  .then(res => {
    listings = res.data.listings;
  });

  
  
  return (
    <div>
    <h1>Listings</h1>

      {listings.map(listing => (
        <div id = "listing" className = "listing" key = {listing.title}>
          <Listing listing = {listing}/>
        </div>
      ))}
  </div>
  )};
export default ViewListings;