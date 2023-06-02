import {observable} from "mobx"
const filteredDataStore = observable({
    filteredData: [],

    updateFilteredData(data) {
        this.filteredData = data;
    },

});


export default filteredDataStore;