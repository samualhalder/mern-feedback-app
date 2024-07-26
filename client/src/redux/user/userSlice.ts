import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        currentUser:null,
    },
    reducers:{
        signInSuccesfull:(state,action)=>{
            state.currentUser=action.payload
        },
        signOut:(state)=>{
            state.currentUser=null
        }
    }
})

export const {signInSuccesfull,signOut}=userSlice.actions
export default userSlice.reducer