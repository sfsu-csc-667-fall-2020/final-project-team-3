import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  submitInquiry,
  loadInquiries,
  deleteListing,
} from "../redux/actions/listingActions";

const Listing = ({ listing, userMode }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  return (
    <div>
      <div>
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

      {userMode ? (
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

export default Listing;
