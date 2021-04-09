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
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
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
     const  handleGoogleSignIn =()=>{
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setLoggedInUser(user)
        handleIdToken()
        history.replace(from)
      }).catch((error) => {
        console.log(error)
      });
     }
     const handleSignOut = () =>{
      firebase.auth().signOut().then(() => {
        
      }).catch((error) => {
        // An error happened.
      });
     }
     const handleFbSignIn = () =>{
      firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const user = result.user;
        console.log(user)
        setLoggedInUser(user)
      }).catch((error) => {
        
      });
     }
     const handleIdToken = () =>{
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        sessionStorage.setItem('token' , idToken)
      }).catch(function(error) {
        // Handle error
      });
     }
  return (
        <div className="App">
          <h3>Congratulation : {loggedInUser.displayName}</h3>
          
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
      <button style={{backgroundColor : "red"}} onClick={handleGoogleSignIn}>Google Sign In</button>
      <button style={{backgroundColor : "blue"}} onClick={handleFbSignIn}>FacebookSign In</button>
      <button style={{backgroundColor : "grey"}} onClick={handleSignOut}>SignOut</button>

    </div>
  );
}

export default Login;
