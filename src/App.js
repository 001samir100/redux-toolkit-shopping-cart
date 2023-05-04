import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Cart from "./features/cart/Cart";
import Products from "./features/products/Products";
import { useEffect } from "react";
import { fetchCartAsync } from "./features/cart/cartSlice";

function App() {
	// const dispatch = useDispatch();
	// const carts = useSelector((state) => state.cart);
	// useEffect(() => {
	// 	dispatch(fetchCartAsync());
	// 	if (carts !== null) {
	// 		console.log("Cartsdata: " + JSON.stringify(carts));
	// 	} else {
	// 		console.log("cartdata is empty");
	// 	}
	// }, []);
	return (
		<div className="App">
			<Cart></Cart>
			<Products></Products>
		</div>
	);
}

export default App;
