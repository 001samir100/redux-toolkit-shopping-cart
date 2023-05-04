import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productApi";
const initialState = { products: [], status: "idle" };

export const fetchProductAsync = createAsyncThunk(
	"products/fetchProduct", //action name
	async () => {
		const response = await fetchProducts();
		return response.data;
	}
);

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	// async related tasks are done inside extraReducers,
	// used to handle actions that are not specific to slice,
	// but still need to be handled by the store
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductAsync.pending, (state) => {
				console.log("loading...");
				state.status = "loading";
			})
			.addCase(fetchProductAsync.fulfilled, (state, action) => {
				console.log("loaded");
				state.status = "idle";
				state.products = action.payload;
			})
			.addCase(fetchProductAsync.rejected, (state, action) => {
				console.log("rejected");
				state.status = "rejected";
			});
	},
});

export default productSlice.reducer;
