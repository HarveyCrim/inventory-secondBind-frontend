import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";

//redux store for mobile specific functionality

export const store = configureStore({
    reducer : {
        "userReducer" : userReducer
    }
})

export type IRootState = ReturnType<typeof store.getState>
