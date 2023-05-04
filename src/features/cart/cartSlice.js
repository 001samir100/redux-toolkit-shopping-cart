import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchCart, removeFromCart, updateCart } from "./cartApi";

const initialState = {
	items: [],
	status: "idle",
};

export const fetchCartAsync = createAsyncThunk(
	"carts/fetchCart", // action name
	async () => {
		const response = await fetchCart();
		return response.data;
	}
);

export const addToCartAsync = createAsyncThunk(
	"carts/addToCart", // action name
	async (item) => {
		const { id, title, thumbnail, brand, price } = item;
		const response = await addToCart({
			id,
			title,
			thumbnail,
			brand,
			price,
			qty: 1,
		});
		return response.data;
	}
);

export const updateCartAsync = createAsyncThunk(
	"carts/updateCart",
	async (item) => {
		const response = await updateCart(item);
		return response.data;
	}
);

export const deleteItemFromCartAsync = createAsyncThunk(
	"carts/deleteCart",
	async (id) => {
		const response = await removeFromCart(id);
		return { id, status: response.status };
	}
);

export const cartSlice = createSlice({
	name: "carts",
	initialState,
	reducers: {
		// updateItem: (state, action) => {
		// 	const index = state.items.findIndex(
		// 		(item) => item.id === action.payload.id
		// 	);
		// 	if (index !== -1) {
		// 		state.items[index] = action.payload.updatedItem;
		// 	}
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCartAsync.pending, (state) => {
				state.status = "pending";
			})
			.addCase(fetchCartAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.items = action.payload;
			})
			.addCase(fetchCartAsync.rejected, (state) => {
				state.status = "rejected";
			})
			.addCase(addToCartAsync.pending, (state) => {
				state.status = "pending";
			})
			.addCase(addToCartAsync.fulfilled, (state, action) => {
				state.status = "idle";
				// const data = [...state.items, { ...action.payload }];
				state.items.push(action.payload);
				// state.items = data
			})
			.addCase(addToCartAsync.rejected, (state, action) => {
				state.status = "rejected";
				// console.log("Add to cart rejected:", state, action.payload);
			})
			.addCase(updateCartAsync.pending, (state) => {
				state.status = "pending";
			})
			.addCase(updateCartAsync.fulfilled, (state, action) => {
				state.status = "idle";
				const payload = action.payload;
				state.items = state.items.map((data) => {
					if (data.id === payload.id) {
						return payload;
					} else {
						return data;
					}
				});
			})
			.addCase(updateCartAsync.rejected, (state) => {
				state.status = "rejected";
			})
			.addCase(deleteItemFromCartAsync.pending, (state) => {
				state.status = "pending";
			})
			.addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
				state.status = "idle";
				// delete does not return any data so check the status of resonse
				if (action.payload.status === 200) {
					state.items = state.items.filter((data) => {
						return data.id !== action.payload.id;
					});
				}
			})
			.addCase(deleteItemFromCartAsync.rejected, (state) => {
				state.status = "rejected";
			});
	},
});

export const { updateItem } = cartSlice.actions;

export default cartSlice.reducer;
