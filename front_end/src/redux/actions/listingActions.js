import axios from "axios";

export const submitInquirySuccess = (message, listing) => {
  return {
    type: "SUBMIT_INQUIRIES_SUCCESS",
    payload: { message, listing },
  };
};

export const getListingAuthor = () => {
  return {
    type: "GET_LISTING_AUTHOR",
  }
}

export const submitInquiry = (message, listing) => {
  return (dispatch) => {
    axios
      .post(`/api/makeInquiry?listingId=${listing.id}`, { message })
      .then((res) => {
        dispatch(submitInquirySuccess(message, listing));
      });
  };
};

export const loadInquiriesSuccess = (inquiries) => {
  return {
    type: "LOAD_INQUIRY_SUCCESS",
    payload: { inquiries },
  };
};
export const loadInquiries = (listing) => {
  return (dispatch) => {
    // if you want loading spinner, dispatch action here
    // to tell reducer content is loading
    axios.get(`/api/getInquiries?listingId=${listing.id}`).then((res) => {
      dispatch(loadInquiriesSuccess(res.data.inquiries));
    });
  };
};
export const deleteListingSuccess = (message) => {
  return {
    type: "DELETE_LISTING_SUCCESS",
    payload: { message },
  };
};
export const deleteListing = (listing) => {
  return (dispatch) => {
    axios.get(`/api/deleteListing?id=${listing.id}`).then((res) => {
      dispatch(deleteListingSuccess(res.status));
    });
  };
};

// This is the part for listing creation form
export const submitListingSuccess = (listing) => {
  return {
    type: "SUBMIT_LISTING_SUCCESS",
    payload: { listing },
  };
};

export const submitListing = (listing) => {
  return (dispatch) => {
    axios.post(`/api/createListing`, { ...listing }).then((res) => {
      dispatch(submitInquirySuccess(listing));
      dispatch(loadListings());
    });
  };
};

export const loadListings = () => {
  return (dispatch) => {
    axios.get(`/api/viewListings`).then((res) => {
      dispatch({ type: "LOAD_LISTINGS_SUCCESS", payload: res.data });
    });
  };
};

export const updateListing = (listing) => {
  return {
    type: "UPDATE_LISTING",
    payload: listing,
  };
};
