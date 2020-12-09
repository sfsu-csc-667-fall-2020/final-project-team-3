const initialState = {
  inquiries: [],
};

const inquiryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_INQUIRY":
      return state;
    default:
      return initialState;
    case "SUBMIT_INQUIRIES_SUCCESS":
      return {
        ...state,
        inquiries: [
          {
            message: action.payload.message,
          },
          ...state.inquiries,
        ],
      };
    // case LOAD_INQUERIES_REQUEST
    case "LOAD_INQUIRY_SUCCESS": // thunk dispatches when it has inqueries from fetch
      return {
        ...state,
        inquiries: [...action.payload.inquiries, ...state.inquiries],
      };

    case "SUBMIT_LISTING_SUCCESS":
      return {
        ...state,
        inquiries: [...action.payload.listing, ...state.listing],
      };
  }
};

export default inquiryReducer;
