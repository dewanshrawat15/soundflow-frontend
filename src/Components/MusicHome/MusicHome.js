import "./MusicHome.css";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import logo from "../../Assets/logo.png";

function TrackPlaceholder(props){
    let {name, url} = props;

    return (
        <div className="track-placeholder">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-1">
                        <i className="fa fa-heart track-placeholder-icon"></i>
                    </div>
                    <div className="col-md-6">
                        <div className="track-name-placeholder">
                            {name}
                        </div>
                    </div>
                    <div className="col-md-1 col-md-offset-4">
                        <i className="fa fa-play-circle track-placeholder-icon"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MusicHome(){
    let authToken = sessionStorage.getItem("authentication-token");
    const [tracks, updateTracks] = useState(null);

    let headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'app_secret': '673aea91b611d6df2228b38d17617b20'
    };
    if(tracks === null){
        fetch("http://localhost:3000/tracks", {
            method: "GET",
            headers: headers
        }).then(response => {
            if(response.ok){
                return response.json();
            } else {
                console.log("An error occurred");
            }
        }).then(data => {
            let trackURLs = data.message;
            let musicTracks = [];
            trackURLs.forEach(element => {
                let newTrackElement = <TrackPlaceholder {...element} key={element.name} />
                musicTracks.push(newTrackElement);
            });
            updateTracks(musicTracks);
        });
    }

    if(authToken){
        return (
            <div className="browse">
                <div className="header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-1">
                                <img width="96" className="img-responsive" alt="SoundFlow logo" src={logo} />
                            </div>
                            <div className="col-md-3 col-md-offset-8 nav-links">
                                <span className="nav-link-holder">
                                    <Link to="/profile">Profile</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tracks-placeholder">
                    <div className="container">
                        <div className="row">
                            {tracks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else{
        return <Redirect to="login" />
    }
}

export default MusicHome;