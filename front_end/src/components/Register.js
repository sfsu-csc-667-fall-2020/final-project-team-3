import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateListing, submitListing } from "../redux/actions/listingActions";
import axios from "axios";
import { userLogin } from "../redux/actions/loginActions";
import loginReducer from "../redux/reducers/loginReducer";
import Login from "./Login";


// axios post to login, get user json object back

const Register = () => {
    const dispatch = useDispatch();
    const [usernameToSubmit, setUsername] = React.useState('');
    const [passwordToSubmit, setPassword] = React.useState('');
    const [confirmPasswordToSubmit, setConfirmPassword] = React.useState('');
    const [emailToSubmit, setEmail] = React.useState('');
    
    let username = "";
    let _id = "";
    let userData = {};


    const handleSubmit = () => {
        axios.post('http://localhost:4000/users/register', {username: usernameToSubmit, email: emailToSubmit, password: passwordToSubmit, password2: confirmPasswordToSubmit})
        // if successful registrtion, login
        .then(axios.post('http://localhost:4000/users/login', {username: usernameToSubmit, password: passwordToSubmit}));
        dispatch(userLogin(username, _id));
      };

      
    return(
        <div class = "registration-form">
            <form action="/users/register" method="POST">
            <div class = "form-entry">
            <label for="name">Username</label>
            <input type="text" id = "username" placeholder="Enter username" onChange = {e => setUsername(e.target.value)}/>
            </div>

            <div class = "form-entry">
            <label for="username">Email</label>
            <input type="email" id = "email" placeholder="Enter email" onChange = {e => setEmail(e.target.value)}/>
            </div>

            <div class = "form-entry">
            <label for="password">Password</label>
            <input type="password" id = "password" placeholder="Enter password" onChange = {e => setPassword(e.target.value)}/>
            </div>

            <div class = "form-entry">
            <label for="password">Confirm Password</label>
            <input type="password" id = "confirm-password" placeholder="Confirm password" onChange = {e => setConfirmPassword(e.target.value)}/>
            </div>

            <button type="submit" onClick = {() => {handleSubmit()}}>Register</button>
        </form>
        </div>
    );
}

export default Register;