import {observable} from "mobx"

const ShoppingCartStore = observable({
    ShoppingCart: [],

    removeFromShoppingCart(data){
        const index = this.ShoppingCart.indexOf(data);
        if (index > -1) {
            this.ShoppingCart.splice(index, 1);
        }
    },

    addToShoppingCart(data){
        this.ShoppingCart.push(data)
    }
})

export default ShoppingCartStore;