import axios from "axios";

export function fetchCart() {
	return axios.get(`http://localhost:8080/cart`);
}

export function addToCart(cart) {
	return axios.post(`http://localhost:8080/cart`, cart);
}

export function updateCart(itemUpdate) {
	return axios.put(`http://localhost:8080/cart/${itemUpdate.id}`, itemUpdate);
}

export function removeFromCart(id) {
	return axios.delete(`http://localhost:8080/cart/${id}`);
}
