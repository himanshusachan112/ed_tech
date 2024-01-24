import { combineReducers } from "@reduxjs/toolkit";
import authslice from "../slices/Authslice";
import profileslice from "../slices/Profileslice";
import courseslice from "../slices/Courseslice";
import cartslice from "../slices/Cartslice";


const rootreducer=combineReducers({
    Auth:authslice,
    Profile:profileslice,
    Course:courseslice,
    Cart:cartslice,
})

export default rootreducer;