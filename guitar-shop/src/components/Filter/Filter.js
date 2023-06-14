import { observer } from "mobx-react";
import { flowResult, toJS } from "mobx";
import { useState, useEffect } from "react";
import MainLogo from "../../assets/logos/MainLogo.png";
import { offers } from "../../components/FakeData";
import filteredDataStore from "../../store/FilteredDataStore";
import * as variables from "../variables.js";
import "./Filter.css"

const FilterBlock = () => {


    useEffect(() => {
        const filtered = filteredDataStore.applyFilter(filteredDataStore.initialData);
        filteredDataStore.updateFilteredData(filtered);
    }, [filteredDataStore.filterArray]);

    useEffect(() => {
        console.log(toJS(filteredDataStore.filterArray));
        console.log(toJS(filteredDataStore.currentProductList))
    }, [filteredDataStore.currentProductList]);

    return (
        <>
            <div className="filterBlock">
                <h1>Фільтр</h1>
                <div className="price_range">
                    <input
                        type="number"
                        className="min_price"
                        placeholder="Min Price"  
                        onChange={(e) => filteredDataStore.priceFilter(e, 'minPrice')}
                    />
                    <input
                        type="number"
                        className="max_price"
                        placeholder="Max Price"
                        onChange={(e) => filteredDataStore.priceFilter(e, 'maxPrice')}
                    />
                </div>
                <form className="filter_checkboxes">
                    <fieldset className="filter_values">
                        {variables.typeList.map((type, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    name="guitar_type"
                                    value={type}
                                    id={`type_${type}`}
                                    checked={filteredDataStore.typeChecked[type]}
                                    onChange={(e) => filteredDataStore.stringAndTypeFilter(e, "type")}
                                />
                                <label htmlFor={`type_${type}`}>{variables.HTMLTypeList[index]}</label>
                            </div>
                        ))}
                    </fieldset>
                    <fieldset className="filter_strings">
                        <div>
                        <input
                            type="checkbox"
                            name="guitar_strings"
                            value="4"
                            id="strings_4"
                            disabled={filteredDataStore.checkboxDisabled("4")}
                            onChange={(e) => filteredDataStore.stringAndTypeFilter(e, "string")}
                        />
                        <label htmlFor="strings_4">4</label>
                    </div>
                        <div>
                        <input
                            type="checkbox"
                            name="guitar_strings"
                            value="6"
                            id="strings_6"
                            disabled={filteredDataStore.checkboxDisabled("6")}
                            onChange={(e) => filteredDataStore.stringAndTypeFilter(e, "string")}
                        />
                        <label htmlFor="strings_6">6</label>
                        </div>
                        <div>
                        <input
                            type="checkbox"
                            name="guitar_strings"
                            value="7"
                            id="strings_7"
                            disabled={filteredDataStore.checkboxDisabled("7")}
                            onChange={(e) => filteredDataStore.stringAndTypeFilter(e, "string")}
                        />
                        <label htmlFor="strings_7">7</label>
                        </div>
                        <div>
                        <input
                            type="checkbox"
                            name="guitar_strings"
                            value="12"
                            id="strings_12"
                            disabled={filteredDataStore.checkboxDisabled("12")}
                            onChange={(e) => filteredDataStore.stringAndTypeFilter(e, "string")}
                        />
                        <label htmlFor="strings_12">12</label>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    );
};

export default observer(FilterBlock);
