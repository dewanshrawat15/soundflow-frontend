import "./Login.css";
import intro from "../../Assets/intro.mp4";
import logo from "../../Assets/logo.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login(){

    const [username, setUsername] = useState(null);
    const [password, setPassowrd] = useState(null);

    const history = useHistory();

    const handleSubmit = async () => {
        let details = {
            "username": username,
            "password": password
        };
        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        }).then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                console.error("An error occured");
            }
        }).then(data => {
            sessionStorage.setItem("authentication-token", data.authToken);
            localStorage.setItem("username", username);
            history.push("/browse");
        });
    }

    const updateUsernameOrPassword = (identifier, e) => {
        if(identifier === "username"){
            setUsername(e.target.value);
        }
        if(identifier === "password"){
            setPassowrd(e.target.value);
        }
    }

    return (
        <div className="login">
            <div className="laptop">
                <div className="form-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2 col-md-offset-5">
                                <center>
                                    <img src={logo} className="img-responsive" alt="SoundFlow logo" />
                                </center>
                            </div>
                        </div>
                        <br /><br />
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2">
                                <div className="form-placeholder">
                                    <div className="form-group auth-groups">
                                        <label htmlFor="email-laptop">Username:</label>
                                        <input name="username" type="text" className="form-control" id="email-laptop" onChange={(e) => updateUsernameOrPassword("username", e)} />
                                    </div>
                                    <div className="form-group auth-groups">
                                        <label htmlFor="pwd-laptop">Password:</label>
                                        <input name="password" type="password" className="form-control" id="pwd-laptop" onChange={(e) => updateUsernameOrPassword("password", e)} />
                                    </div>
                                    <br />
                                    <button onClick={handleSubmit} type="submit" className="btn btn-default auth-bttn">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="video-wrapper">
                    <video autoPlay muted loop id="soundflow-intro-video">
                        <source src={intro} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className="mobile"></div>
        </div>
    );
}

export default Login;