import { toJS } from "mobx";
import { observer } from "mobx-react"; // Import observer from mobx-react
import FilterBlock from "../../components/Filter/Filter";
import filteredDataStore from "../../store/FilteredDataStore";
import MainLogo from "../../assets/logos/MainLogo.png";
import SortBlock from "../../components/Sort/Sort.js"
import "./Catalog.css"


const Catalog = observer(() => { 
    return (
        <>
            <SortBlock />
            <FilterBlock />
            <div className="CatalogBlock">
                <p>some text</p>
                <img className="main_logo" src={MainLogo} alt="Main Logo" />
            </div>
            <div className="guitar_catalog">
                {toJS(filteredDataStore.filteredData).map((filteredData, index) => (
                    <div className="guitar_card" key={index}>
                        <img className="guitar_image" src={filteredData.photo} alt="photo" />
                        <p className="guitar_name">{filteredData.guitarName}</p>
                        <p className="guitar_price">{filteredData.price}</p>
                        <p className="guitar-rating">
                            {Array.from({ length: filteredData.rating }, (element, index) => (
                                <span className="star_rating" key={index}>&#9733;</span>
                            ))}
                        </p>
                        <div className="guitar_buttons">
                            <button className="button_more_info">Інформація</button>
                            <button className="button_buy">Купити</button>
                        </div>

                    </div>
                ))}
            </div>

        </>
    );
});

export default Catalog;
