import { createSlice } from "@reduxjs/toolkit";
type initialStateType = {
    filter: boolean
}

const initialState : initialStateType = {
    filter: true
}
const userSlice = createSlice({
    name : "userReducer",
    initialState, 
    reducers : {
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    }
})

export default userSlice.reducer
export const {setFilter} = userSlice.actions