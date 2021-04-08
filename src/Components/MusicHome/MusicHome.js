import { Redirect } from "react-router-dom";
function MusicHome(){
    let authToken = sessionStorage.getItem("authentication-token");
    if(authToken){
        return (
            <div>
                Render music home screen
            </div>
        );
    }
    else{
        return <Redirect to="login" />
    }
}

export default MusicHome;