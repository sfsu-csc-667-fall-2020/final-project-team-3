// import React from 'react';
// import { connect } from 'react-redux';
// import Listing from '../components/Listing';
// import axios from 'axios';


// // display listings if they exist
// const ViewListings = () => {
//   const listings = {};
//   //let numberOfListings = store.getState().listingReducer.numberOfListings;
//   //const listings = getState().listingReducer.items;
//   // get listings and store
//   axios.get('http://localhost:4000/api/listings%27)
//   .then(res => {
//     listings = res.data.listings;
//   });



//   return (
//     <div>

//       {listings.map(listing => (
//         <div id = "listing" className = "listing" key = {listing.title}>
//           <Listing listing = {listing}/>
//         </div>
//       ))} 
//   </div>
//   )};
// export default ViewListings;