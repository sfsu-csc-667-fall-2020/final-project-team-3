import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import {
  submitInquiry,
  loadInquiries,
  deleteListing,
} from "../redux/actions/listingActions";
import axios from 'axios';

const select = appState => ({
  _id: appState.loginReducer._id,
})

const Listing = ({ listing, _id }) => {
  const isOwnListing = false;
  // check to see if listing is own, so it knows whether to show inquiries or not
  if (_id === listing.user) {
    isOwnListing = true;
  }
  //only first image
  const imageURL = listing.images[0];
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  return (
    <div>
      <div>
        <img src = {"http://localhost/upload/thumb-500" + imageURL}/>
        <table className='listing'>
          <thead>
            <tr>
              <th>description</th>
              <th>type</th>
              <th>price</th>
              <th>title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{listing.description}</td>
              <td>{listing.type}</td>
              <td>{listing.price}</td>
              <td>{listing.title}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {!isOwnListing ? (
        <div>
          <form>
            <div>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <button
              type='submit'
              className='submit'
              onClick={() => dispatch(submitInquiry(message, listing))}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>
          <button
            type='button'
            onClick={() => dispatch(deleteListing(listing))}
          >
            Delete
          </button>
          <button
            type='button'
            onClick={() => dispatch(loadInquiries(listing))}
          >
            View Inquiries
          </button>
        </div>
      )}
    </div>
  );
};

export default connect(select)(Listing);
