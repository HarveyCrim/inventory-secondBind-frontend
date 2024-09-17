import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
export const store = configureStore({
    reducer : {
        "userReducer" : userReducer
    }
})

export type IRootState = ReturnType<typeof store.getState>
