import "./MusicHome.css";
import { Component, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import logo from "../../Assets/logo.png";

function TrackPlaceholder(props){
    let {name, url, setAudioPlayerUrl, setAudioTrackName} = props;

    const playAudio = () => {
        setAudioPlayerUrl(null);
        setAudioPlayerUrl(url);
        setAudioTrackName(null);
        setAudioTrackName(name);
    }

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
                    <div className="col-md-1 col-md-offset-4 right-wrapper">
                        <i onClick={playAudio} className="fa fa-play-circle track-placeholder-icon"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

class AudioPlayer extends Component{

    constructor(props){
        super(props);
        this.state = {
            duration: null,
            currentTime: null
        }
        this.formatDuration = this.formatDuration.bind(this);
    }

    formatDigit(digit){
        digit = parseInt(digit);
        if(digit < 10){
            return "0" + digit;
        }
        return digit;
    }

    getMinutes(time){
        return parseInt(time / 60);
    }

    getSeconds(time){
        return parseInt(time) % 60;
    }
    
    formatDuration(time){
        let digit = this.formatDigit(time);
        if(time < 60){
            return "00:" + digit;
        }
        else{
            let minutes = this.formatDigit(this.getMinutes(time));
            let seconds = this.formatDigit(this.getSeconds(time));
            return minutes + ":" + seconds;
        }
    }

    componentDidMount(){
        let elem = document.getElementById("audio-placeholder");
        let cursorElem = document.getElementById("track-player-cursor");
        let currTime, duration;
        elem.addEventListener("loadedmetadata", (e) => {
            elem.play();
            duration = e.target.duration;
            setInterval(() => {
                currTime = e.target.currentTime;
                this.setState({
                    duration: this.formatDuration(Math.floor(duration)),
                    currentTime: this.formatDuration(Math.floor(currTime))
                });
                let currPos = (currTime / duration) * 100;
                cursorElem.style.left = currPos.toString() + "%";
            }, 1000);
        })
    }

    render(){
        let url = this.props.url;
        url = "http://" + url;
        return (
            <div className="music-placeholder">
                <audio controls id="audio-placeholder">
                    <source id="audio-src-placeholder" src={url} type="audio/mp3" />
                </audio>
                <div className="track-player-ruler">
                    <div className="track-player-currenttime-placeholder">
                        {this.state.currentTime}
                    </div>
                    <div className="track-player-trackname-placeholder">
                        {this.props.name}
                    </div>
                    <div className="track-player-duration-placeholder">
                        {this.state.duration}
                    </div>
                    <div className="track-player-cursor" id="track-player-cursor"></div>
                </div>
            </div>
        );
    }
}

function MusicHome(){
    let authToken = sessionStorage.getItem("authentication-token");
    const [tracks, updateTracks] = useState(null);

    const [audioPlayerUrl, setAudioPlayerUrl] = useState(null);
    const [trackName, setAudioTrackName] = useState(null);

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
                let newTrackElement = <TrackPlaceholder {...element} key={element.name} setAudioPlayerUrl={setAudioPlayerUrl} setAudioTrackName={setAudioTrackName} />
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
                {audioPlayerUrl && <AudioPlayer url={audioPlayerUrl} name={trackName} />}
            </div>
        );
    }
    else{
        return <Redirect to="login" />
    }
}

export default MusicHome;