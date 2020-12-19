import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateListing, submitListing } from "../redux/actions/listingActions";
import axios from "axios";
import { userLogin } from "../redux/actions/loginActions";
import loginReducer from "../redux/reducers/loginReducer";


// axios post to login, get user json object back

const Login = () => {
    const dispatch = useDispatch();
    const [usernameToSubmit, setUsername] = React.useState('');
    const [passwordToSubmit, setPassword] = React.useState('');
    let username = "";
    let _id = "";
    let userData = {};


    const handleSubmit = () => {
        axios.post('http://localhost:4000/users/login', {username: usernameToSubmit, password: passwordToSubmit})
        .then(res => {
            username = res.data.username;
            _id = res.data._id;
            userData = res.data; // whole user object
        });
        dispatch(userLogin(username, _id));
      };

      
    return(
        <div class = "login-form">
            <div class = "admin-panel">
            <div class = "grid-container">
                <div class = "site-content" id = "site-content">
            <form action="/users/login" method="POST">
            <div class = "form-entry">
                <label for="username">Username</label>
                <input type="text" id = "username" placeholder="Enter username" onChange = {e => setUsername(e.target.value)}/>
            </div>

            <div class = "form-entry">
                <label for="password">Password</label>
                <input type="password" id = "password" placeholder="Enter password" onChange = {e => setPassword(e.target.value)}/>
            </div>
            <button type="submit" onClick = {() => {handleSubmit()}}>Login</button>
            </form>
            <a href = "http://localhost:3000/register">Need an account?</a>
        </div>
        </div>
        </div>
        </div>

    );
}

export default Login;