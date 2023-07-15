import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import FilterBlock from "../../components/Filter/Filter";
import filteredDataStore from "../../store/FilteredDataStore.js";
import ShoppingCartStore from "../../store/ShoppingCartStore.js";
import cart_icon from "../../assets/icons/cart_icon.png";
import SortBlock from "../../components/Sort/Sort";
import "./Catalog.css";
import Modal from "../../components/MoreInfo/MoreInfo";
import { cardsPerPage, numberOfOffers, startPage } from "../../components/variables.js";
import Pagination from "../../components/Pagination/Pagination";
import acustic from "../../assets/images/acustic.png";
import electro from "../../assets/images/electro.png";
import ukulele from "../../assets/images/ukulele.png";
import { Button, Stack } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
interface IFilteredData {
    guitarName: string;
    photo: string;
    rating: number;
    price: number;
    comments: [];
}

interface ISelectedProduct {
    guitarName: string;
    photo: string;
    comments: string[]; // Add the 'comments' property
    rating: number | null;
}

interface IProductModalProps {
    active: boolean;
    setActive: (value: boolean) => void;
    product: ISelectedProduct;
}

const Catalog: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ISelectedProduct>({
        guitarName: "",
        photo: "",
        comments: [], // Add the 'comments' property
        rating: null,
    });
    const [currentPage, setCurrentPage] = useState(startPage);

    function addToShoppingCart(filteredData: IFilteredData) {
        ShoppingCartStore.addToShoppingCart(filteredData);
        console.log(toJS(ShoppingCartStore.ShoppingCart));
    }

    function ModalMoreInfo(filteredData: IFilteredData) {
        setSelectedProduct(filteredData);
        setIsModalOpen(true);
    }

    function imageSrc(data: string) {
        switch (data) {
            case "acustic.png":
                return acustic;
            case "ukulele.png":
                return ukulele;
            case "electro.png":
                return electro;
            default:
                return "";
        }
    }

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = toJS(filteredDataStore.currentProductList).slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(toJS(filteredDataStore.currentProductList).length / cardsPerPage);

    const goToPage = (pageNumber: number) => {
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
                    {currentCards.map((filteredData: IFilteredData, index: number) => (
                        <div className="guitar_card" key={index}>
                            <img className="guitar_image" src={imageSrc(filteredData.photo)} alt="photo" />
                            <p className="guitar_name">{filteredData.guitarName}</p>
                            <p className="guitar_price">{filteredData.price}</p>
                            <p className="guitar-rating">
                                {Array.from({ length: filteredData.rating }, (_, index) => (
                                    <span className="star_rating" key={index}>
                                        &#9733;
                                    </span>
                                ))}
                            </p>
                            <Stack className="guitar_buttons" direction='row'>
                                <Button color='info' variant="contained" size='small' className="button_more_info" onClick={() => ModalMoreInfo(filteredData)}>
                                    Інформація
                                </Button>
                                <Button color='primary'variant="contained" size='large' className="button_buy" startIcon={<AddShoppingCartIcon/>} onClick={() => addToShoppingCart(filteredData)}>
                                    Купити
                                </Button>
                            </Stack>
                        </div>
                    ))}
                </div>
            </div>
            <Modal active={isModalOpen} setActive={setIsModalOpen} product={selectedProduct} />
            <Pagination totalPages={totalPages} currentPage={currentPage} goToPage={goToPage} />
        </>
    );
};

export default observer(Catalog);

