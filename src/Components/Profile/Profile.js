import "./Profile.css";
import logo from "../../Assets/logo.png";
import { useState } from "react";
import { Redirect } from "react-router-dom";

function Profile(){
    const authToken = sessionStorage.getItem("authentication-token");
    const username = localStorage.getItem("username");

    const [authTokenString, updateAuthTokenString] = useState(authToken);

    const handleLogout = () => {
        sessionStorage.removeItem("authentication-token");
        localStorage.removeItem("username");
        updateAuthTokenString(null);
    }

    if(authTokenString){
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-md-offset-5">
                            <center>
                                <img className="img-responsive" alt="SoundFlow logo" src={logo} />
                            </center>
                        </div>
                    </div>
                    <br /><br />
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <h1 className="profile-username-placeholder text-center">
                                @{username}
                            </h1>
                        </div>
                    </div>
                    <br /><br />
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <center>
                                <span onClick={handleLogout} className="logout-bttn">
                                    Logout
                                </span>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else{
        return <Redirect to="/login" />;
    }
}

export default Profile;