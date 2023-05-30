import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useEffect, useState } from "react";
import filteredDataStore from "../../store/FilteredDataStore";
import "./Sort.css"

const SortBlock = () => {
    const [sortType, setSortType] = useState(undefined);
    const [sortDynamic, setSortDynamic] = useState(undefined);

    const sortData = () => {
        let sortedArray = toJS(filteredDataStore.filteredData);
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

        if (sortDynamic === "down") {
            sortedArray.reverse();
        }
        filteredDataStore.updateFilteredData(sortedArray);
        console.log(sortedArray);
    };


    useEffect(() => {
        
        sortData();
    }, [sortType, sortDynamic]);

    return (
        <>
            <div className="sortBlock">
                <div className="sort_criteria">
                    <p className="sort_price_button" value="price" onClick={() => setSortType("price")}>
                        Sort by price
                    </p>
                    <p className="sort_rating_button" value="rating" onClick={() => setSortType("rating")}>
                        Sort by rating
                    </p>
                </div>
                <div className="sort_dynamic">
                    <p className="sort_up_button" value="up" onClick={() => setSortDynamic("up")}>
                        up
                    </p>
                    <p className="sort-down_button" value="down" onClick={() => setSortDynamic("down")}>
                        down
                    </p>
                </div>
            </div>
        </>
    );
};

export default observer(SortBlock);
