import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Component } from "react";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import MusicHome from "./Components/MusicHome/MusicHome";
import Profile from "./Components/Profile/Profile";

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      authToken: null
    };
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/browse">
            <MusicHome />
          </Route>
          <Route path="/">
            <Home />;
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;