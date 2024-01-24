import { createSlice } from "@reduxjs/toolkit"

const initialState={
    profile:localStorage.getItem("profile")? JSON.parse(localStorage.getItem("profile")):null,
}

const profileslice=createSlice({
    name:"Profile",
    initialState:initialState,
    reducers:{
        setprofile(state,action){
            state.profile=action.payload;
        }
    }
})

export const {setprofile}=profileslice.actions;
export default profileslice.reducer;