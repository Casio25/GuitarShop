import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useState } from "react";
import FilterBlock from "../../components/Filter/Filter";
import filteredDataStore from "../../store/FilteredDataStore";
import ShoppingCartStore from "../../store/ShoppingCartStore";
import MainLogo from "../../assets/logos/MainLogo.png";
import SortBlock from "../../components/Sort/Sort.js";
import "./Catalog.css";

const Catalog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({
        guitarName: undefined,
        photo: undefined,
        rating: undefined,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 9;

    const Modal = ({ active, setActive, product }) => {
        return (
            <>
                <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                    <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                        <h2>Додати товар до кошику</h2>
                        <h3 className="modal_name">{product.guitarName}</h3>
                        <img className="modal_image" src={product.photo} alt="photo" />
                    </div>
                </div>
            </>
        );
    };

    function addToShoppingCart(filteredData) {
        ShoppingCartStore.addToShoppingCart(filteredData);
    }

    function ModalMoreInfo(filteredData) {
        setSelectedProduct(filteredData);
        setIsModalOpen(true);
    }

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = toJS(filteredDataStore.filteredData).slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(toJS(filteredDataStore.filteredData).length / cardsPerPage);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <SortBlock />
            <FilterBlock />
            <div className="CatalogBlock">
                <p>some text</p>
                <img className="main_logo" src={MainLogo} alt="Main Logo" />
            </div>
            <div className="guitar_catalog">
                {currentCards.map((filteredData, index) => (
                    <div className="guitar_card" key={index}>
                        <img className="guitar_image" src={filteredData.photo} alt="photo" />
                        <p className="guitar_name">{filteredData.guitarName}</p>
                        <p className="guitar_price">{filteredData.price}</p>
                        <p className="guitar-rating">
                            {Array.from({ length: filteredData.rating }, (element, index) => (
                                <span className="star_rating" key={index}>
                                    &#9733;
                                </span>
                            ))}
                        </p>
                        <div className="guitar_buttons">
                            <button className="button_more_info" onClick={() => ModalMoreInfo(filteredData)}>
                                Інформація
                            </button>
                            <button className="button_buy" onClick={() => addToShoppingCart(filteredData)}>
                                Купити
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal active={isModalOpen} setActive={setIsModalOpen} product={selectedProduct} />

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`pagination_button ${currentPage === index + 1 ? "active" : ""}`}
                        onClick={() => goToPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default observer(Catalog);
