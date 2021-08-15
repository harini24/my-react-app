import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
    isAuthenticated: false,
    userName: '',
    name: '',
    email: '',
    image: '',
    googleId: '',
    remainingTime: undefined
}
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true
            state.email = action.payload.email
            state.userName = action.payload.userName
            state.name = action.payload.fullName
            state.googleId = action.payload.googleId
            state.image = action.payload.image
            state.remainingTime = new Date(new Date().getTime() + (60000)).getTime()
            localStorage.setItem("googleId", action.payload.googleId)
        },
        logout(state) {
            console.log(" in auth logout")
            state.isAuthenticated = false
            state.email = ''
            state.userName = ''
            state.name = ''
            state.googleId = ''
            state.image = ''
            state.remainingTime = undefined
            localStorage.removeItem("googleId")
        },
        setRemainingTime(state, action) {
            console.log("setRemainingTime")
            state.remainingTime = new Date(new Date().getTime() + (60000)).getTime()
        }
    }
})


export const authActions = authSlice.actions
export default authSlice.reducer