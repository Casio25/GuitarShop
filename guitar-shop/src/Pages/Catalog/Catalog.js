import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import FilterBlock from "../../components/Filter/Filter";
import filteredDataStore from "../../store/FilteredDataStore";
import ShoppingCartStore from "../../store/ShoppingCartStore";
import cart_icon from "../../assets/icons/cart_icon.png"
import SortBlock from "../../components/Sort/Sort.js";
import "./Catalog.css";
import Modal from "../../components/MoreInfo/MoreInfo";
import { cardsPerPage, numberOfOffers, startPage } from "../../components/variables";
import Pagination from "../../components/Pagination/Pagination";

const Catalog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({
        guitarName: null,
        photo: null,
        rating: null,
    });
    const [currentPage, setCurrentPage] = useState(startPage);
    const [arrOfCurrPages, setArrOfCurrPages] = useState([]);

    function addToShoppingCart(filteredData) {
        ShoppingCartStore.addToShoppingCart(filteredData);
    }

    function ModalMoreInfo(filteredData) {
        setSelectedProduct(filteredData);
        setIsModalOpen(true);
    }

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = toJS(filteredDataStore.currentProductList).slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(toJS(filteredDataStore.currentProductList).length / cardsPerPage);

   

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <SortBlock />
            <div className="container">
                <div className="filter_block">
                    <FilterBlock />
                </div>
                <div className="guitar_catalog">
                    {currentCards.map((filteredData, index) => (
                        <div className="guitar_card" key={index}>
                            <img className="guitar_image" src={filteredData.photo} alt="photo" />
                            <p className="guitar_name">{filteredData.guitarName}</p>
                            <p className="guitar_price">{filteredData.price}</p>
                            <p className="guitar-rating">
                                {Array.from({ length: filteredData.rating }, (_, index) => (
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
                                    <img className="cart_icon" src={cart_icon} alt="cart_icon" />
                                    Купити
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal active={isModalOpen} setActive={setIsModalOpen} product={selectedProduct} />

            {/* <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`pagination_button ${currentPage === index + 1 ? "active" : ""}`}
                        onClick={() => goToPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}
            <Pagination totalPages={totalPages} currentPage={currentPage} goToPage={goToPage} />

        </>
    );
};

export default observer(Catalog);
