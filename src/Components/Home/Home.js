import "./Home.css";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";

function Home(){

    return (
        <div className="home">
            <div className="container">
                <div className="row">
                    <div className="col-md-2 col-md-offset-5">
                        <center>
                            <img src={logo} className="img-responsive" alt="Soundflow Logo" height="250" />
                        </center>
                    </div>
                </div>
                <br /><br />
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <h1 className="text-center soundflow-hero-title">SoundFlow</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 soundflow-hero-text">
                        <p className="text-center">Bored of Spotify ads? Stream unlimited songs without any intervals, free of cost!</p>
                    </div>
                </div>
                <br /><br />
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <center>
                            <span className="soundflow-hero-bttn text-center">
                                <Link to="/login">
                                    Stream now!
                                </Link>
                            </span>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;