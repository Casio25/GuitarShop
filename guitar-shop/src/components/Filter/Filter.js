import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useState, useEffect } from "react";
import MainLogo from "../../assets/logos/MainLogo.png";
import { offers } from "../../components/FakeData";
import filteredDataStore from "../../store/FilteredDataStore";
import * as variables from "../variables.js";
import "./Filter.css"

const FilterBlock = () => {
    const [isTypeChecked, setIsTypeChecked] = useState({
        ukulele: false,
        electro: false,
        acustic: false,
    });
    const [filterArray, setFilterArray] = useState({
        type: [],
        string: [],
    });
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const stringOptions = {
        ukulele: ["4"],
        acustic: ["6", "7", "12"],
        electro: ["4", "6", "7"],
    };

    function typeFilter(e) {
        const value = e.target.value;
        const updatedFilterArray = [...filterArray.type];

        if (e.target.checked) {
            updatedFilterArray.push(value);
        } else {
            const index = updatedFilterArray.indexOf(value);
            if (index > -1) {
                updatedFilterArray.splice(index, 1);
            }
        }

        setFilterArray((prevState) => ({
            ...prevState,
            type: updatedFilterArray,
        }));

        setIsTypeChecked((prevState) => ({
            ...prevState,
            [value]: e.target.checked,
        }));
    }

    function stringFilter(e) {
        const value = e.target.value;
        const updatedFilterArray = [...filterArray.string];

        if (e.target.checked) {
            updatedFilterArray.push(value);
        } else {
            const index = updatedFilterArray.indexOf(value);
            if (index > -1) {
                updatedFilterArray.splice(index, 1);
            }
        }

        setFilterArray((prevState) => ({
            ...prevState,
            string: updatedFilterArray,
        }));
    }

    function isCheckboxDisabled(value) {
        const selectedGuitarTypes = Object.keys(isTypeChecked).filter(
            (guitarType) => isTypeChecked[guitarType]
        );

        if (selectedGuitarTypes.length === 0) {
            return false;
        }

        let isValueAvailable = false;

        for (const guitarType of selectedGuitarTypes) {
            if (stringOptions[guitarType].includes(value)) {
                isValueAvailable = true;
                break;
            }
        }

        return !isValueAvailable;
    }
    const handleMinPriceChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            if (maxPrice && value > maxPrice) {
                setMaxPrice(value);
            }
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            if (minPrice && value < minPrice) {
                setMinPrice(value);
            }
            setMaxPrice(value);
        }
    };

    function applyFilter(data) {
        return data.filter((item) => {
            if (!!filterArray.type.length && !filterArray.type.includes(item.type)) {
                return false;
            } else if (
                !!filterArray.string.length &&
                !filterArray.string.includes(item.string.toString())
            ) {
                return false;
            }

            return true;
        });
    }

    useEffect(() => {
        const filtered = applyFilter(offers);
        filteredDataStore.updateFilteredData(filtered);
    }, [filterArray]);

    useEffect(() => {
        
    }, [filteredDataStore.currentProductList]);

    return (
        <>
            <div className="filterBlock">
                <h1>Фільтр</h1>
                <div className="price_range">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
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
                                    checked={isTypeChecked[type]}
                                    onChange={typeFilter}
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
                            disabled={isCheckboxDisabled("4")}
                            onChange={stringFilter}
                        />
                        <label htmlFor="strings_4">4</label>
                    </div>
                        <div>
                        <input
                            type="checkbox"
                            name="guitar_strings"
                            value="6"
                            id="strings_6"
                            disabled={isCheckboxDisabled("6")}
                            onChange={stringFilter}
                        />
                        <label htmlFor="strings_6">6</label>
                        </div>
                        <div>
                        <input
                            type="checkbox"
                            name="guitar_strings"
                            value="7"
                            id="strings_7"
                            disabled={isCheckboxDisabled("7")}
                            onChange={stringFilter}
                        />
                        <label htmlFor="strings_7">7</label>
                        </div>
                        <div>
                        <input
                            type="checkbox"
                            name="guitar_strings"
                            value="12"
                            id="strings_12"
                            disabled={isCheckboxDisabled("12")}
                            onChange={stringFilter}
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
