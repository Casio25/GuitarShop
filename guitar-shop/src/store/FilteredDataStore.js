
import { observable } from "mobx";
import { toJS } from "mobx";
import { offers } from "../components/FakeData";

const filteredDataStore = observable({
    initialData: offers,
    currentProductList: offers,

    typeChecked : {
        ukulele: false,
        electro: false,
        acustic: false,
    },
     filterArray : {
        type: [],
        string: [],
        price: {
        minPrice: undefined,
        maxPrice: undefined,
        }
    },

    stringOptions : {
        ukulele: ["4"],
        acustic: ["6", "7", "12"],
        electro: ["4", "6", "7"],
    },

    

    updateFilteredData(data) {
        this.currentProductList = data;
    },




    stringAndTypeFilter(e, type) {
        const value = e.target.value;
        const updatedFilterArray = [...this.filterArray[type]];

        if (e.target.checked) {
            updatedFilterArray.push(value);
        } else {
            const index = updatedFilterArray.indexOf(value);
            if (index > -1) {
                updatedFilterArray.splice(index, 1);
            }
        }

        this.filterArray = {
            ...this.filterArray,
            [type]: updatedFilterArray,
        };

        if (type === "type") {
            this.typeChecked = {
                ...this.typeChecked,
                [value]: e.target.checked,
            };
        }
    },


    checkboxDisabled(value) {
        const selectedGuitarTypes = Object.keys(this.typeChecked).filter(
            (guitarType) => this.typeChecked[guitarType]
        );

        if (!selectedGuitarTypes.length) 
            return false;
        

        let isValueAvailable = true;

        for (const guitarType of selectedGuitarTypes) {
            if (this.stringOptions[guitarType].includes(value)) {
                isValueAvailable = false;
                break;
            }
        }

        return isValueAvailable;
    },


    priceFilter(e, filterType) {
        const priceValue = e.target.value;

        this.filterArray = {
            ...this.filterArray,
            price: {
                ...this.filterArray.price,
                [filterType]: priceValue ? Number(priceValue) : undefined,
            },
        };
    },



    applyFilter(data) {
        return data.filter((item) => {
            console.log('filterArray:', this.filterArray);
            console.log('item.price:', item.price);

            const itemPrice = parseFloat(item.price);

            if (
                this.filterArray.type &&
                this.filterArray.type.length &&
                item.type &&
                !this.filterArray.type.includes(item.type)
            ) 
                return false;
             if (
                this.filterArray.string &&
                this.filterArray.string.length &&
                item.string &&
                !this.filterArray.string.includes(item.string.toString())
            ) 
                return false;
             if (
                this.filterArray.price.minPrice !== undefined &&
                itemPrice < this.filterArray.price.minPrice
            ) 
                return false;
             if (
                this.filterArray.price.maxPrice !== undefined &&
                itemPrice > this.filterArray.price.maxPrice
            )
                return false;
            

            return true;

        });
    },





   // Data Sorting //
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
