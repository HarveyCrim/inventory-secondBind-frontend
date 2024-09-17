import { createSlice } from "@reduxjs/toolkit";
type initialStateType = {
    id : number | null
}

const initialState : initialStateType = {
    id : null
}
const userSlice = createSlice({
    name : "userReducer",
    initialState, 
    reducers : {
        setId : (state, action) => {
            state.id = action.payload
        }
    }
})

export default userSlice.reducer
export const {setId} = userSlice.actions