import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAsync } from "./productSlice";
import { addToCartAsync, updateCartAsync } from "../cart/cartSlice";
import "./Products.css";

const Products = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);
	const carts = useSelector((state) => state.cart.items);

	const handleAddToCart = (product) => {
		// console.log("Cart data fetched from product" + product);
		carts
			? carts.map((item) => {
					if (product.id !== null && item.id === product.id) {
						console.log("Found item in cart.. ." + JSON.stringify(item));
						const newItem = { ...item, qty: Number(item.qty) + 1 };
						dispatch(updateCartAsync(newItem));
						return <></>;
					}
					return <></>;
			  })
			: dispatch(addToCartAsync(product));
	};
	return (
		<div>
			<h1>Products</h1>
			<hr />
			<button onClick={() => dispatch(fetchProductAsync())}>
				Fetch products
			</button>

			<br />
			<br />

			{products &&
				products.map((product) => (
					<div className="card" key={product.id}>
						<img
							src={product.thumbnail}
							alt={product.title}
							style={{ width: "100%" }}
						/>
						<h1>{product.title}</h1>
						<p className="price">${product.price}</p>
						<p>{product.description}</p>
						<p>
							<button onClick={() => handleAddToCart(product)}>
								Add to Cart
							</button>
						</p>
					</div>
				))}
		</div>
	);
};

export default Products;
