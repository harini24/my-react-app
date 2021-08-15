import { react } from "@babel/types"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, useHistory } from 'react-router';
import { usersActions } from '../store/Users'
import classes from './TableComp.module.css'
const TableComp = props => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users) || []
    const history = useHistory()
    console.log(users)
    useEffect(() => {

        const fetchUsers = async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/users')
            if (!data.ok) {
                console.log("error")
            }
            const resp = await data.json()
            console.log(resp)
            dispatch(usersActions.getUsers(resp))
        }

        fetchUsers()
    }, [])

    return (
        <div className={classes.tableCont}>
            <div className={classes.tabledisp}>
                <div style={{ padding: "0 0 20px", fontSize: '25px' }}><b>Users from jsonplaceholder</b></div>
                <table className={classes.table}>
                    <tr className={classes.tableRows}>
                        <th><div className={classes.idCol}>Id</div></th>
                        <th><div className={classes.nameCol}>Name</div></th>
                        <th><div className={classes.emailCol}>Email</div></th>
                        <th><div className={classes.clickCol}>Details</div></th>
                    </tr>
                    {users && users.map(user => {
                        return (
                            <React.Fragment key={user.id}>
                                <tr className={classes.tableRows}>
                                    <td><div className={classes.idCol}>{user.id}</div></td>
                                    <td><div className={classes.nameCol}>{user.name}</div></td>
                                    <td><div className={classes.emailCol}>{user.company.name}</div></td>
                                    <td onClick={() => { dispatch(usersActions.getUser(user.id)); history.push(`/table/${user.id}`) }}><div className={classes.clickCol}>click here</div></td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default TableComp