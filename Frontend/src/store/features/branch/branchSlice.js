import { createSlice } from '@reduxjs/toolkit'



//Initialize the state
const initialState = {
    branch: [],
    status: "idle",
    error: null,
  };

export const branchSlice = createSlice({
  name: 'branch',
  initialState,
 
})



export default branchSlice.reducer