import { observable } from "mobx";

const ShoppingCartStore = observable({
    ShoppingCart: [],

    removeFromShoppingCart(data) {
        const index = this.ShoppingCart.indexOf(data);
        if (index > -1) {
            this.ShoppingCart.splice(index, 1);
        }
        this.saveToLocalStorage(); 
    },

    addToShoppingCart(data) {
        const existingItem = this.ShoppingCart.find(item => item.id === data.id);
        if (existingItem) {
            if (existingItem.quantity < 20) {
                existingItem.quantity += 1;
            } else {
                console.log("Quantity limit reached");
            }
        } else {
            data.quantity = 1;
            this.ShoppingCart.push(data);
        }
        this.saveToLocalStorage();
    },

    
    quantityControl(data, type) {
        const existingItem = this.ShoppingCart.find(item => item.id === data.id);
        if (type === "add" && existingItem.quantity < 20) {
            existingItem.quantity += 1;
        } else if (type === "remove" && existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        }
        this.saveToLocalStorage();
    },


    saveToLocalStorage() {
        const data = JSON.stringify(this.ShoppingCart);
        localStorage.setItem("shoppingCart", data);
    },

    loadFromLocalStorage() {
        const data = localStorage.getItem("shoppingCart");
        if (data) {
            this.ShoppingCart = JSON.parse(data);
        }
    },
});

ShoppingCartStore.loadFromLocalStorage(); 

export default ShoppingCartStore;
