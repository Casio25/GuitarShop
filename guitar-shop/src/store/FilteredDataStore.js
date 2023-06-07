import { observable } from "mobx";
import { toJS } from "mobx";
import { offers } from "../components/FakeData";

const filteredDataStore = observable({
    initialData: offers,
    currentProductList: offers,

    updateFilteredData(data) {
        this.currentProductList = data;
    },

   
    sortData(sortType, sortDirection) {
        let sortedArray = this.currentProductList;
        switch (sortType) {
            case "price":
                sortedArray.sort((a, b) => a.price - b.price);
                break;
            case "rating":
                sortedArray.sort((a, b) => a.rating - b.rating);
                break;
            default:
                sortedArray.sort((a, b) => a.price - b.price);
                break;
        }

        if (sortDirection === "down") {
            sortedArray.reverse();
        }


        this.currentProductList = [...sortedArray];
        console.log(toJS(this.currentProductList));
    }
});

export default filteredDataStore;


// add all filter functions and logic to store //
