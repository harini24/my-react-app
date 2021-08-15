
import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    users: [],
    currentUser: {}
}

const usersStore = createSlice({
    name: 'test',
    initialState: initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload
            console.log(state.users)
        },
        getUser: (state, action) => {
            state.currentUser = { ...state.users[action.payload - 1] }
        }
    }
})

export const usersActions = usersStore.actions
export default usersStore.reducer