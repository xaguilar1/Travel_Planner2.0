import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

//flights API 
//NOTE: Consider merging "AmadeusProvider" and "Provider", but there is no reason we cannot have two different providers.
// import { AmadeusProvider } from "./utils/AmadeusProvider";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Activity from "./components/activity/activity";
import Hotel from "./components/hotel/hotel";
import Flights from "./components/flights/flights";
import RentalCar from "./components/rental/rental";
import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <AmadeusProvider> */}
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/hotel" component={Hotel} />
            <Route exact path="/flights" component={Flights} />
            <Route exact path="/rental" component={RentalCar} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
        {/* </AmadeusProvider> */}
      </Provider>
    );
  }
}
export default App;
