import { Cart, menuArray } from "/data.js";

let itemListContainer = document.querySelector(".item-list-container");
let orderContainer = document.querySelector(".order-container");
let orderItems = document.querySelector(".order-items");
let totalPrice = document.querySelector("#total-price");

const cart = new Cart();

const renderItems = () => {
	let itemsHTML = "";
	let orderHTML = "";

	menuArray.forEach((item) => {
		itemsHTML += `
			<section>
				<div class="container">
					<div class="description">
						<p class="emoji">${item.emoji}</p>
						<p class="name">${item.name}</p>
						<p class="ingredients">${[...item.ingredients].join(", ")}</p>
						<p class="price">$${item.price}</p>
					</div>
					<button id='add-item-btn' data-item-id=${item.id}>+</button>
				</div>
			</section>
		`;
	});

	itemListContainer.innerHTML = itemsHTML;

	document.querySelectorAll("#add-item-btn").forEach((button) => {
		button.addEventListener("click", () => {
			addItem(button.dataset.itemId);
		});
	});

	document.querySelectorAll("#order-remove-btn").forEach((button) => {
		button.addEventListener("click", () => {
			console.log(cart);
			removeItem(button.dataset.cartItemId, cart);
		});
	});

	function addItem(itemId) {
		menuArray.forEach((item) => {
			if (item.id.toString() === itemId) {
				cart.addItem(item);
			}
		});

		renderOrders(cart);
		calculateCartTotal(cart);
		renderItems();
	}

	function removeItem(id, cart) {
		cart.removeItem(Number(id));
		renderOrders(cart);
		calculateCartTotal(cart);
		renderItems();
	}

	function renderOrders(cart) {
		const items = cart.getItems();

		orderHTML = "";

		cart.items.map((item) => {
			orderHTML += `
			<div id="order-items">
				<div class="items-container">
					<p id="order-name">${item.name}</p>
					<span id="order-remove-btn" data-cart-item-id=${item.id}>remove</span>
				</div>
				<p id="order-price">$${item.price}</p>
			</div>
		`;
		});

		orderItems.innerHTML = orderHTML;

		// Show or hide based on whether there are items
		if (items.length > 0) {
			orderContainer.classList.remove("hidden");
		} else {
			orderContainer.classList.add("hidden");
		}
	}

	function calculateCartTotal(cart) {
		totalPrice.textContent = `$${cart.calculateTotal()}`;
	}
};

renderItems();
