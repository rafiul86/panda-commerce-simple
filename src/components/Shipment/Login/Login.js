import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import React,{useState,useContext} from 'react';
import {UserContext } from "../../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
else {
  firebase.app(); 
}
function Login() {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/shipping" } };
   const [loggedInUser ,setLoggedInUser] = useContext(UserContext)
  const [newUser , setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    password : '',
    photo : '',
    error : '',
    success :false
  })
    const handleBlur = (e) => {
      let isFieldValid = true ;
        if (e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password'){
          const isPasswordValid  =  e.target.value.length > 6 ;
          const hasPasswordNumber =  /\d{1}/.test(e.target.value);
          isFieldValid = isPasswordValid && hasPasswordNumber ;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value ;
            setUser(newUserInfo)
        }
    }
 
    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                console.log(res.user)
              const newUserInfo = {...user};
              newUserInfo.error = '';
              newUserInfo.success = true;
              setUser(newUserInfo);
              upDateUser(user.name)
            })
            .catch(error => {
              const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false
              setUser(newUserInfo)
           
            });
        }
        if (!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
        const newUserInfo = {...user};
              newUserInfo.error = '';
              newUserInfo.success = true;
              setUser(newUserInfo);
              setLoggedInUser(newUserInfo)
              history.replace(from);
        })
        .catch(error => {
        const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false
              setUser(newUserInfo)
        });
          }
      e.preventDefault()
    }
      const upDateUser = (name) =>{
        const  user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name,  
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});
      }


  return (
        <div className="App">
          <input type="checkbox" onChange = {()=> setNewUser(!newUser)} name ="newUser"/>
        <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit = {handleSubmit}>
        { newUser &&<input name = "name" type="text" onBlur={handleBlur} placeholder="Your Name"/>}
        <br/>
        <input type="text" name = "email"  placeholder="Write Your Email" onBlur={handleBlur} required/>
        <br/>
         <input type="password" name = "password" placeholder="Password" onBlur={handleBlur} required/>
         <br/>
         <input type="submit" value ={newUser ? 'Sign up' : 'Log in'}/>
      </form>
      <p style={{color : 'red'}}>{user.error}</p>
      {user.success && <p style={{color : 'green'}}>Congratulations !! User {newUser ? 'Created' : 'Logged in'} Successfully !!</p>}
    </div>
  );
}

export default Login;
