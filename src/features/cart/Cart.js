import React, { useEffect } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteItemFromCartAsync,
	fetchCartAsync,
	updateCartAsync,
} from "./cartSlice";

const Cart = () => {
	const dispatch = useDispatch();
	const carts = useSelector((state) => state.cart.items);

	const updateQuantity = (e, item) => {
		// e.preventDefault();
		const newQuantity = e.target.value;
		const updatedItem = { ...item, qty: newQuantity };

		// dispatch(updateItem({ id, change: { qty: newQuantity } }));
		// dispatch(updateCartAsync({ id, change: { qty: newQuantity } }));
		dispatch(updateCartAsync(updatedItem));
	};

	useEffect(() => {
		dispatch(fetchCartAsync());
	}, []);

	return (
		<div className="cart">
			<h1>Items in Cart</h1>
			<div>
				{carts &&
					carts.map((item) => (
						<div className="flip-card" key={item.id}>
							<div className="flip-card-inner">
								<div className="flip-card-front">
									<img
										src={item.thumbnail}
										alt={item.title}
										style={{ width: "300px", height: "300px" }}
									/>
								</div>
								<div className="flip-card-back">
									<h1>Name: {item.title}</h1>
									<p>Brand: {item.brand}</p>
									<div className="qty">
										Qty: &nbsp;
										<select
											value={item.qty}
											onChange={(e) => updateQuantity(e, item)}
										>
											<option value={1}>1</option>
											<option value={2}>2</option>
											<option value={3}>3</option>
										</select>
									</div>
									<br />
									<button
										onClick={() => dispatch(deleteItemFromCartAsync(item.id))}
									>
										Remove from cart
									</button>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Cart;
