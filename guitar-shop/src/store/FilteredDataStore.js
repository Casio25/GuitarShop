
import { observable } from "mobx";
import { toJS } from "mobx";
import {useQuery} from 'react-query'
import { offers } from "../components/FakeData.js";
import { ChangeEvent } from "react";
import { useEffect } from "react";



const filteredDataStore = observable({
    initialData: offers,
    currentProductList: offers,

    skip: 0,
    take: 100,


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
            const itemPrice = parseFloat(item.price);
            const { type, string, price } = this.filterArray;

            if (type?.length && !type.includes(item.type))
                return false;

            if (string?.length && !string.includes(item.string?.toString()))
                return false;

            if (price.minPrice !== undefined && itemPrice < price.minPrice)
                return false;

            if (price.maxPrice !== undefined && itemPrice > price.maxPrice)
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

// sending our filter parameters to backend to get filteredData

export const fetchData = async () => {
    const queryParams = {}

    if (filteredDataStore.filterArray.type.length > 0){
        queryParams.type = filteredDataStore.filterArray.type.join(",");
    }
    if (filteredDataStore.filterArray.string.length > 0){
        queryParams.string = filteredDataStore.filterArray.string.join(",")
    }
    if (filteredDataStore.filterArray.price.minPrice !== undefined ||
        filteredDataStore.filterArray.price.maxPrice !== undefined){
            queryParams.price = JSON.stringify({
                minPrice: filteredDataStore.filterArray.price.minPrice,
                maxPrice: filteredDataStore.filterArray.price.maxPrice

        })
        }

    const queryString = Object.keys(queryParams)
        .map((key) =>  `${key}=${queryParams[key]}`)
        .join('&')

    console.log()

    const url = `http://localhost:4000/catalog?skip=0&take=${filteredDataStore.take}&${queryString}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },

    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
}

export function DataFetcher() {
    const { data: initialData, isLoading } = useQuery("initialData", fetchData);

    useEffect(() => {
        if (!isLoading) {
            filteredDataStore.initialData = initialData || offers;
            filteredDataStore.currentProductList = initialData || offers;
        }
    }, [initialData, isLoading]);

    return null;
}
// old code
// export function DataFetcher() {
//     const { data: initialData } = useQuery("initialData", fetchData);

//     filteredDataStore.initialData = initialData || offers;
//     filteredDataStore.currentProductList = initialData || offers;

//     return null;
// }


