import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useEffect, useState } from "react";
import filteredDataStore from "../../store/FilteredDataStore";
import "./Sort.css";

const SortBlock = () => {
    const [sortType, setSortType] = useState();
    const [sortDirection, setSortDirection] = useState();


    

    useEffect(() => {
        filteredDataStore.sortData(sortType, sortDirection);
    }, [sortType, sortDirection]);



    return (
        <>
            <div className="sortBlock">
                <div className="sort_criteria">
                    <p
                        className={`sort_price_button ${sortType === "price" ? "active" : ""}`}
                        value="price"
                        onClick={() => setSortType("price")}
                    >
                        Sort by price
                    </p>
                    <p
                        className={`sort_rating_button ${sortType === "rating" ? "active" : ""}`}
                        value="rating"
                        onClick={() => setSortType("rating")}
                    >
                        Sort by rating
                    </p>
                </div>
                <div className="sort_dynamic">
                    <p
                        className={`sort_up_button ${sortDirection === "up" ? "active" : ""}`}
                        value="up"
                        onClick={() => setSortDirection("up")}
                    >
                        up
                    </p>
                    <p
                        className={`sort_down_button ${sortDirection === "down" ? "active" : ""}`}
                        value="down"
                        onClick={() => setSortDirection("down")}
                    >
                        down
                    </p>
                </div>
            </div>

            
        </>
    );
};

export default observer(SortBlock);
