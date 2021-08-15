import logo from './logo.svg';
import './App.css';
import Login from './componets/Login';
import Logout from './componets/Logout';
import { Switch, Route, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React from 'react';
import UserInfo from './componets/UserInfo';
import TableComp from './componets/TableComp';
import User from './componets/User';
import { useState } from 'react';
import NotFound from './componets/NotFound';
import { useEffect, useCallback } from 'react';
import { authActions } from './store/Auth'
let logutTimer;
let confirmTime;
function App() {
  const dispatcher = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
  const userName = useSelector(state => state.auth.userName)
  const timeRemaining = useSelector(state => state.auth.remainingTime)
  const [logoutDisp, setLogoutDisp] = useState(false)

  const [askconfirm, setAskConfirm] = useState(false)
  const [gotResp, setGotResp] = useState(false)



  useEffect(() => {
    console.log("logged in", isLoggedIn)
    console.log("logoutDisp", logoutDisp)
    console.log("timeRemaining", timeRemaining)
    if (confirmTime) {
      console.log(" in clear confirmTime")
      clearTimeout(confirmTime)
    }
    if (logutTimer) {
      console.log(" in clear logutTimer")
      clearTimeout(logutTimer)
    }
    if (isLoggedIn) {
      console.log("in useeffect")
      logutTimer = setTimeout(logOutHander, 60 * 1000)
    }
  }, [timeRemaining])

  const logOutHander = () => {
    console.log("in logOutHander")
    setAskConfirm(true)

    confirmTime = setTimeout(() => {
      console.log("in logOutHander timer")
      console.log("in setGotResp", gotResp)
      if (!gotResp) {
        //logout
        setAskConfirm(false)
        dispatcher(authActions.logout())

      }

    }, 60 * 1000)
    // localStorage.removeItem("token")
    // localStorage.removeItem("expiration")
    if (logutTimer) {
      clearTimeout(logutTimer)
    }

  }

  return (
    <div className="App">
      <div className="App-header">
        {!isLoggedIn && <React.Fragment>Login</React.Fragment>}
        {isLoggedIn && <React.Fragment>
          <div className="routes">
            <div>
              <NavLink className="route" activeClassName="activeRoute" to="/userInfo">UserInfo</NavLink>
            </div>
            <div>
              <NavLink className="route" activeClassName="activeRoute" to="/table">Table</NavLink>
            </div>
          </div>
          <div onClick={() => { setLogoutDisp(logoutDisp => !logoutDisp) }}>{userName}</div>
        </React.Fragment>}
      </div>
      <div className="App-body">
        <Switch>
          <Route path="/" exact>
            {!isLoggedIn && <Redirect to="/login" />}
            {isLoggedIn && <Redirect to="/userInfo" />}
          </Route>
          {!isLoggedIn && <Route path="/login" exact>
            <Login />
          </Route>
          }
          {isLoggedIn &&
            <React.Fragment>
              <Route path="/userInfo" exact>
                <UserInfo />
              </Route>
              <Route path="/table" exact>
                <TableComp />
              </Route>
              <Route path="/table/:Id">
                <User />
              </Route>
            </React.Fragment>
          }
          {!isLoggedIn ?
            <Route path='*'>
              <Redirect to="/login" />
            </Route>
            :
            <Route path='*'>
              <NotFound />
            </Route>
          }
        </Switch>
      </div>
      {logoutDisp && <div>
        <Logout setLogoutDisp={setLogoutDisp} />
      </div>}
      {askconfirm && <div className='backdrop'>
        <div className='layout'>
          <div style={{
            fontSize: "30px",
            padding: " 15px 15px 10px"
          }}>
            Do want to continue?
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: 'space-evenly',
              padding: " 15px"
            }}
          >
            <div>
              <button onClick={() => { setAskConfirm(false); dispatcher(authActions.setRemainingTime(60)) }} style={{
                fontSize: "20px"
              }} > Continue</button>
            </div>
            <div>
              <button onClick={() => { setAskConfirm(false); dispatcher(authActions.logout()) }} style={{
                fontSize: "20px"
              }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;
