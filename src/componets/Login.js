import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { clientId } from "../clientID";
import { authActions } from '../store/Auth'
import classes from './Login.module.css'

const clientid = clientId

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const OnSuccess = (resp) => {
        console.log('login success', resp.profileObj)
        const data = resp.profileObj
        dispatch(authActions.login({ userName: data.givenName, fullName: data.name, email: data.email, image: data.imageUrl, googleId: data.googleId }))
        history.replace("/userInfo")
    }

    const OnFailure = (resp) => {
        console.log('login failure', resp)
    }

    return (
        <div className={classes.loginContainer}>
            <GoogleLogin
                clientId={clientid}
                buttonText="Login"
                onSuccess={OnSuccess}
                onFailure={OnFailure}
                cookiePolicy={'single_host_origin'}
            >
            </GoogleLogin>
        </div>
    )
}

export default Login