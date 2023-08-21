import "./Header.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import MainLogo from "../../assets/logos/MainLogo.png";
import icon_map from "../../assets/icons/icon_map.png";
import icon_search from "../../assets/icons/icon_search.png";
import icon_basket from "../../assets/icons/icon_basket.png";
import login_icon from "../../assets/icons/login_icon.png"
import Modal from "../ShoppingCart/ShoppingCart";
import ShoppingCartStore from "../../store/ShoppingCartStore.js";
import LoginModal from "../LoginModal/LoginModal";

export const Header = () => {
    const headerTextNames = ["Каталог", "Де придбати?", "Про компанію", "Сервіс центри"];
    const headerTextLinks = ["./", "/where_to_buy", "/about_us", "/service_centers"];
    const [modalActive, setModalActive] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        setOrder(ShoppingCartStore.ShoppingCart);
    }, []);

    return (
        <>
            <div className="MainHeaderBlock">
                <nav className="header_main_logo">
                    <NavLink to="./">
                        <img className="main_logo" src={MainLogo} alt="Main Logo" />
                    </NavLink>
                </nav>
                <nav className="header_text_links">
                    {headerTextNames.map((headerTextName, index) => (
                        <NavLink className="header_text_link" key={headerTextName} to={headerTextLinks[index]}>
                            {headerTextName}
                        </NavLink>
                    ))}
                </nav>
                <nav className="header_icons">
                    <img className="login_button" src={login_icon} alt="login_button" onClick={()=> setLoginModal(true)}/>
                    <NavLink to="/map">
                        <img className="header_icon_map" src={icon_map} alt="serch_icon" />
                    </NavLink>
                    <img className="search_button" src={icon_search} alt="search_button" />
                    <img className="basket_button" src={icon_basket} alt="basket_button" onClick={() => setModalActive(true)} />
                    
                </nav>
            </div>
            <div className="image_header"></div>
            <Modal active={modalActive} setActive={setModalActive} order={order} />
            <LoginModal active={loginModal} setActive={setLoginModal} />
        </>
    );
};
