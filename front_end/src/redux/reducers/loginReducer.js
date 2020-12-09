// _id is not a typo, keep it that way pls, mongoose is weird that way
// don't need the other info we get from users.. yet
const initialState = {
    _id: "",
    username: "",
    isLoggedIn: false,
  };
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      default:
        return initialState;
      case "USER_LOGIN":
        return {
          ...state,
          _id: action._id,
          username: action.username,
          isLoggedIn: action.isLoggedIn,
        };
      case "USER_LOGOUT":
          return initialState;  
    }
  };
  
  export default loginReducer;
  