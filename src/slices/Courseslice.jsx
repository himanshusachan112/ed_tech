import { createSlice } from "@reduxjs/toolkit"

const initialState={
    course:null,
    editcourse:false,
    step:1

}

const courseslice=createSlice({
    name:"Course",
    initialState:initialState,
    reducers: {
        setstep: (state, action) => {
          state.step = action.payload
        },
        setcourse: (state, action) => {
          state.course = action.payload
        },
        seteditcourse: (state, action) => {
          state.editcourse = action.payload
        },
        resetCourseState: (state) => {
          state.step = 1
          state.course = null
          state.editcourse = false
        },
      },
})

export const {setstep,seteditcourse,resetCourseState,setcourse}=courseslice.actions;
export default courseslice.reducer;