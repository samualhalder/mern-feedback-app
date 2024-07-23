import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        currentUser:null,
    },
    reducers:{
        signInSuccesfull:(state,action)=>{
            state.currentUser=action.payload
        }
    }
})

export const {signInSuccesfull}=userSlice.actions
export default userSlice.reducer