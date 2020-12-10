const initialState = {
  description: "",
  type: "",
  price: "",
  title: "",
  listingId: "",
  authorId: "",
};

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_LISTINGS_SUCCESS":
      return { ...state, listings: action.payload };
    case "DELETE_LISTING_SUCCESS":
      return state;
    case "UPDATE_LISTING":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default listingReducer;
