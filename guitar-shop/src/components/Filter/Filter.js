
import {observer} from "mobx-react";
import { toJS } from "mobx";
import { useState, useEffect } from "react"
import MainLogo from "../../assets/logos/MainLogo.png"
import { offers } from "../../components/FakeData";
import filteredDataStore from "../../store/FilteredDataStore";
import * as variables from "../variables.js";
const FilterBlock = () => {


    const [filteredData, setFilteredData] = useState(offers);

    const [isTypeChecked, setIsTypeChecked] = useState({
        ukulele: false,
        electro: false,
        acustic: false
    })
    const [filterArray, setFilterArray] = useState({
        type: [],
        string: [],
    })
    const stringOptions = {
        ukulele: ["4"],
        acustic: ["6", "7", "12"],
        electro: ["4", "6", "7"],
    };


    function typeFilter(e) {
        const value = e.target.value;
        const updatedFilterArray = [...filterArray.type]; // Create a new array with the existing values

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

        return !isValueAvailable; // Disable the checkbox if the value is not available
    }






    function applyFilter(data) {
        return data.filter(item => {
            if (!!filterArray.type.length && !filterArray.type.includes(item.type)) {
                return false;
            } else if (!!filterArray.string.length && !filterArray.string.includes(item.string.toString())) {
                return false;
            }

            return true;
        });
    }


    useEffect(() => {
        const filtered = applyFilter(offers);
        setFilteredData(filtered);
    }, [filterArray]);


    useEffect(() => {
        console.log(filterArray)
        console.log(filteredData);
        filteredDataStore.updateFilteredData(filteredData);
        console.log(toJS(filteredDataStore.filteredData)); 
    }, [filteredData])





    return (
        <>
            <div className="filterBlock">
                <form>
                    <fieldset className="filter_values">
                        <input type="checkbox" name="guitar_type" value="electro" id="type_electro" onChange={typeFilter} />
                        <label htmlFor="guitar_type">Електро</label>
                        <input type="checkbox" name="guitar_type" value="acustic" id="type_acustic" onChange={typeFilter} />
                        <label htmlFor="guitar_type">Акустична</label>
                        <input type="checkbox" name="guitar_type" value="ukulele" id="type_ukulele" onChange={typeFilter} />
                        <label htmlFor="guitar_type">Укулеле</label>
                    </fieldset>
                    <fieldset className="filter_strings">
                        <input type="checkbox" name="guitar_strings" value="4" id="strings_4" disabled={isCheckboxDisabled("4")} onChange={stringFilter} />
                        <label htmlFor="guitar_type">4</label>
                        <input type="checkbox" name="guitar_strings" value="6" id="strings_6" disabled={isCheckboxDisabled("6")} onChange={stringFilter} />
                        <label htmlFor="guitar_strings">6</label>
                        <input type="checkbox" name="guitar_strings" value="7" id="strings_7" disabled={isCheckboxDisabled("7")} onChange={stringFilter} />
                        <label htmlFor="guitar_strings">7</label>
                        <input type="checkbox" name="guitar_strings" value="12" id="strings_12" disabled={isCheckboxDisabled("12")} onChange={stringFilter} />
                        <label htmlFor="guitar_strings">12</label>

                    </fieldset>
                </form>
            </div>
        </>
    );
}
export default observer(FilterBlock);