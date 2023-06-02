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
        this.ShoppingCart.push(data);
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
