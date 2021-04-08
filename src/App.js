import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Component } from "react";
import Home from "./Components/Home/Home";

class App extends Component{

  // constructor(props){
  //   super(props);
  // }

  render(){
    return (
      <Router>
        <Switch>
          {/* <Route path="/login">
            <Login setAuthDetails={this.setAuthDetails} />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/notes">
            <Notes details={this.state.data} />
          </Route>
          <Route path="/profile">
            <Profile details={this.state.data} />
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;