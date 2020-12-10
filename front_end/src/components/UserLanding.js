import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateListing, submitListing } from "../redux/actions/listingActions";
import axios from "axios";
import { userLogin } from "../redux/actions/loginActions";
import loginReducer from "../redux/reducers/loginReducer";
import Login from "./Login";
import Register from "./Register";
// only display is user is not logged in - will give them option to log in or register

const UserLanding = () => {
    return(
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
    
    );
}

export default UserLanding;