import { useSelector } from "react-redux"
import { useParams } from "react-router"
import classes from './User.module.css'
const User = () => {
    const user = useSelector(state => state.users.currentUser)
    const id = useParams()
    console.log(user)
    return (
        <div className={classes.userInfoCont1}>
            <div className={classes.userInfo1}>
                <div className={classes.UserInfoDet1}><b>Details of user with id : {user.id}</b> </div>
                <div className={classes.UserInfoDet1}>
                    <div className={classes.infoLabel1}>Name: </div>
                    <div className={classes.infoVal1}>{user.name}</div>
                </div>

                <div className={classes.UserInfoDet1}>
                    <div className={classes.infoLabel1}>Email: </div>
                    <div className={classes.infoVal1}>{user.email}</div>
                </div>

                <div className={classes.UserInfoDet1}>
                    <div className={classes.infoLabel1}>phone:</div>
                    <div className={classes.infoVal1}>{user.phone}</div>
                </div>
                <div className={classes.UserInfoDet1}>
                    <div className={classes.infoLabel1}>Website:</div>
                    <div className={classes.infoVal1}>{user.website}</div>
                </div >
                <div className={classes.UserInfoDet1}>
                    <div className={classes.infoLabel1}>Company:</div>
                    <div className={classes.infoVal1}>{user.company.name}</div>
                </div >
                <div className={classes.UserInfoDet1}>
                    <div className={classes.infoLabel1}>City:</div>
                    <div className={classes.infoVal1}>{user.address.city}</div>
                </div >
            </div >
        </div >
    )
}

export default User