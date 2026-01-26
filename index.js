import { Cart, menuArray } from "/data.js";

let itemListContainer = document.querySelector(".item-list-container");
let orderContainer = document.querySelector(".order-container");
let orderItems = document.querySelector(".order-items");
let totalPrice = document.querySelector("#total-price");
let msgContainer = document.querySelector(".msg-container");
const modal = document.getElementById("modal");

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
			removeItem(button.dataset.cartItemId, cart);
		});
	});

	document
		.querySelector("#complete-order-btn")
		.addEventListener("click", () => {
			modal.style.display = "inline";

			document.querySelectorAll("#add-item-btn").forEach((button) => {
				button.disabled = true;
			});

			document.querySelectorAll("#order-remove-btn").forEach((button) => {
				button.classList.add("disabled");
			});

			document.querySelector("#complete-order-btn").disabled = true;
		});

	document.querySelector("#payment-form").addEventListener("submit", (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const fullName = formData.get("fullName");
		const card = formData.get("card");
		const cvv = formData.get("cvv");

		// Process payment
		completeOrder(fullName, card, cvv);

		// Clear form and close modal
		e.target.reset();
		closeModal(cart);
		showMessage(fullName);
	});

	function addItem(itemId) {
		menuArray.forEach((item) => {
			if (item.id.toString() === itemId) {
				cart.addItem(item);
			}
		});

		renderOrders(cart);
		calculateCartTotal(cart);
	}

	function removeItem(id, cart) {
		cart.removeItem(Number(id));
		renderOrders(cart);
		calculateCartTotal(cart);
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

	function completeOrder(fullName, cardNumber, cvv) {
		console.log(`Name: ${fullName}, Card Number: ${cardNumber}, CVV: ${cvv}`);
	}

	function closeModal(cart) {
		modal.style.display = "none";

		document.querySelectorAll("#add-item-btn").forEach((button) => {
			button.disabled = false;
		});

		document.querySelectorAll("#order-remove-btn").forEach((button) => {
			button.classList.remove("disabled");
		});

		document.querySelector("#complete-order-btn").disabled = false;

		cart.clear();
		renderOrders(cart);
	}

	function showMessage(name) {
		const main = document.querySelector("main");

		// Create message element
		const msgDiv = document.createElement("div");
		msgDiv.className = "msg-container";
		msgDiv.innerHTML = `<p>Thanks, ${name}! Your order is on its way!</p>`;

		// Add to main
		main.append(msgDiv);

		// Remove after 5 seconds
		setTimeout(() => {
			msgDiv.remove();
		}, 5000);
	}
};

renderItems();
