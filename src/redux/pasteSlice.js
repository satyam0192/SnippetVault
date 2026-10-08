import { createSlice } from '@reduxjs/toolkit'

import toast from 'react-hot-toast';


// Define the initial state using that type
const initialState = {
  pastes:localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  
  initialState,
  reducers: {
    addToPastes:(state,action) =>{
      const paste = action.payload;

      state.pastes.push(paste);
      localStorage.setItem("pastes", 
        JSON.stringify(state.pastes)
      ); 
      toast.success("Paste Created Successfully");
    },
    updateToPastes:(state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) =>
      item._id === paste._id);

      if(index >= 0){
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated");
      }
      else {
        toast.error("Paste Not Found");
      }
    },
    resetAllPastes : (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes:(state,action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if(index >= 0){
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Deleted");
      }
      else {
        toast.error("Something went wrong");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.paste.paste

export default pasteSlice.reducer