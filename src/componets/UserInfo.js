import { useSelector } from "react-redux"
import classes from './UserInfo.module.css'

const UserInfo = () => {
    const name = useSelector(state => state.auth.name)
    const email = useSelector(state => state.auth.email)
    const googleId = useSelector(state => state.auth.googleId)
    const image = useSelector(state => state.auth.image)

    return (
        <div className={classes.userInfoCont}>
            <div className={classes.userInfo}>
                <div className={classes.UserInfoDet}><b>User Info</b></div>
                <div className={classes.UserInfoDet}>Name: {name}</div>
                <div className={classes.UserInfoDet}>Email: {email}</div>
                <div className={classes.UserInfoDet}>Google Id:{googleId}</div>
                <div className={classes.UserInfoDetImg}><div>User Image:</div><img className={classes.img} src={image}></img></div>
            </div>
        </div>
    )
}

export default UserInfo