import react, { Children, createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Nomatch from './components/Nomatch/Nomatch';
import ProductDetail from './components/ProductDetails/ProductDetail';
import Login from './components/Shipment/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

  export const UserContext = createContext();

function App(props) {
      const [ loggedInUser, setLoggedInUser] = useState({})
  return (
      <UserContext.Provider value = {[loggedInUser ,setLoggedInUser]}>
        <h3>{loggedInUser.email}</h3>
   
   <Router>
   <Header></Header>
     <Switch>
       <Route path ="/Shop">
       <Shop></Shop>
       </Route>
       <Route path = "/Review">
         <Review></Review>
       </Route>
       <PrivateRoute path = "/Inventory">
         <Inventory></Inventory>
       </PrivateRoute>
       <Route path = "/login">
      <Login></Login>
       </Route>
       <PrivateRoute path = "/shipment">
         <Shipment></Shipment>
       </PrivateRoute>
       <Route path = "/product/:productKey">
         <ProductDetail></ProductDetail>
       </Route>
       <Route exact path ="/">
       <Shop></Shop>
       </Route>
       <Route path ="*">
        <Nomatch></Nomatch>
       </Route>
     </Switch>
   </Router>
   </UserContext.Provider>
  );
}

export default App;
