import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import branchService from './branchService';


//Adding New Categories Function
export const AddNewBranch = createAsyncThunk(
  "branch/AddNewBranch",
  async (inputValues, thunkAPI) => {
    try {
      const response = await branchService.addBranch(inputValues);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Fetch All Branch Function
export const GetAllBranch = createAsyncThunk(
  "niche/GetAllBranch",
  async ( thunkAPI) => {
    try {
      const response = await branchService.allBranches();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

 //Fetch Single Product Function
 export const GetSingleBranch = createAsyncThunk(
  "branch/GetSingleBranch",
  async (branchId ,  thunkAPI) => {
    try {
      const response = await branchService.SingleBranch(branchId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const UpdateSingleBranch = createAsyncThunk(
  "branch/UpdateSingleBranch",
  async ({inputValues , branchId}, thunkAPI) => {
    try {
      const response = await branchService.updateBranch({inputValues , branchId});
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Delete a branch
export const DeleteBranch = createAsyncThunk(
  "branch/DeleteBranch",
  async (branchId, thunkAPI) => {
    try {
      const response = await branchService.deleteBranch(branchId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Initialize the state
const initialState = {
    branch: [],
    status: "idle",
    error: null,
  };

export const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(AddNewBranch.pending, (state) => {
      state.status = "pending / loading";
      state.error = null;
    }).addCase(AddNewBranch.fulfilled, (state, action) => {
      state.status = "success";
      state.branch = action.payload;
    }).addCase(AddNewBranch.rejected, (state, action) => {
      state.status = "Failled";
      state.error = action.payload;
    }).addCase(GetAllBranch.pending, (state) => {
      state.status = "pending / loading";
      state.error = null;
    }).addCase(GetAllBranch.fulfilled, (state, action) => {
      state.status = "success";
      state.branch = action.payload;
    }).addCase(GetAllBranch.rejected, (state, action) => {
      state.status = "Failled";
      state.error = action.payload;
    }).addCase(DeleteBranch.pending, (state) => {
      state.status = "pending / loading";
      state.error = null;
    }).addCase(DeleteBranch.fulfilled, (state, action) => {
      state.status = "success";
      state.branch = action.payload;
    }).addCase(DeleteBranch.rejected, (state, action) => {
      state.status = "Failled";
      state.error = action.payload;
    }).addCase(GetSingleBranch.pending, (state) => {
      state.status = "pending / loading";
      state.error = null;
    }).addCase(GetSingleBranch.fulfilled, (state, action) => {
      state.status = "success";
      state.branch = action.payload;
    }).addCase(GetSingleBranch.rejected, (state, action) => {
      state.status = "Failled";
      state.error = action.payload;
    }).addCase(UpdateSingleBranch.pending, (state) => {
      state.status = "pending / loading";
      state.error = null;
    }).addCase(UpdateSingleBranch.fulfilled, (state, action) => {
      state.status = "success";
      state.branch = action.payload;
    }).addCase(UpdateSingleBranch.rejected, (state, action) => {
      state.status = "Failled";
      state.error = action.payload;
    })}
 
})



export default branchSlice.reducer