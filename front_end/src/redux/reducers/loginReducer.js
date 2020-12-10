// _id is not a typo, keep it that way pls, mongoose is weird that way
// don't need the other info we get from users.. yet
const initialState = {
    _id: "",
    username: "",
    isLoggedIn: false,
  };
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        return {
          ...state,
          username: action.payload.username,
          _id: action.payload._id,
          isLoggedIn: true,
        };
      case "GET_USERNAME":
          return state.username;  
      case "USER_LOGOUT":
          return initialState;
        default:
          return initialState;      
    }
  };
  
  export default loginReducer;
  