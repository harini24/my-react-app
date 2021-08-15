import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { clientId } from "../clientID";
import { authActions } from '../store/Auth'
import classes from './Logout.module.css'

const clientid = clientId

const Logout = (props) => {
    const history = useHistory()
    const dispatcher = useDispatch()
    const OnSuccess = () => {
        console.log('logout success')
        props.setLogoutDisp(false)
        dispatcher(authActions.logout())
        history.replace('/login')
    }



    return (
        <div className={classes.logoutCont}>
            <GoogleLogin
                clientId={clientid}
                buttonText="Logout"
                onSuccess={OnSuccess}
            >
            </GoogleLogin>
        </div>
    )
}

export default Logout