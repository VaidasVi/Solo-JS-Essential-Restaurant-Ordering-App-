import { Cart, menuArray } from "/data.js";

let itemListContainer = document.querySelector(".item-list-container");
const cart = new Cart();

const renderItems = () => {
	let itemsHTML = "";

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
			renderItems();
			console.log(cart);
		});
	});

	function addItem(itemId) {
		menuArray.forEach((item) => {
			if (item.id.toString() === itemId) {
				cart.addItem(item);
			}
		});
	}
};

renderItems();
