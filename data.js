export const menuArray = [
	{
		name: "Pizza",
		ingredients: ["pepperoni", "mushrom", "mozarella"],
		id: 0,
		price: 14,
		emoji: "🍕",
	},
	{
		name: "Hamburger",
		ingredients: ["beef", "cheese", "lettuce"],
		price: 12,
		emoji: "🍔",
		id: 1,
	},
	{
		name: "Beer",
		ingredients: ["grain, hops, yeast, water"],
		price: 12,
		emoji: "🍺",
		id: 2,
	},
];

export class Cart {
	constructor() {
		this.items = [];
		this.nextId = 0;
	}

	addItem(item) {
		this.items.push({
			id: this.nextId++,
			name: item.name,
			price: item.price,
		});
	}

	removeItem(id) {
		const index = this.items.findIndex((item) => item.id === id);
		if (index !== -1) {
			this.items.splice(index, 1);
		}
	}

	calculateTotal() {
		return this.items.reduce((total, item) => total + item.price, 0);
	}

	clear() {
		this.items = [];
	}

	getItems() {
		return this.items;
	}
}
