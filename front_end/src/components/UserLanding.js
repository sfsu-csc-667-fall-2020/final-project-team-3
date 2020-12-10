import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateListing, submitListing } from "../redux/actions/listingActions";
import axios from "axios";
import { userLogin } from "../redux/actions/loginActions";
import loginReducer from "../redux/reducers/loginReducer";
import Login from "./Login";
import Register from "./Register";
import { connect } from 'react-redux';
// only display is user is not logged in - will give them option to log in or register

const select = appState => ({
    isLoggedIn: appState.loginReducer.isLoggedIn,
    username: appState.loginReducer.username,
    _id: appState.loginReducer._id,
});


const UserLanding = ({isLoggedIn}) => {
    return(
        <div>
        {isLoggedIn && (
            <div class = "grid-container">
                <div class = "site-content" id = "site-content">
                    <div class = "user-landing">
                        <h4>Login</h4>
                        <Login />
                        <h4>Need an account? Register here</h4>
                        <Register />
                    </div>
                </div>
            </div>
        )}   
        </div>
    
    );
}

export default connect(select)(UserLanding);