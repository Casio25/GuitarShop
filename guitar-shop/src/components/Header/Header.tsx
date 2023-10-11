
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import MainLogo from "../../assets/logos/MainLogo.png";
import icon_map from "../../assets/icons/icon_map.png";
import icon_search from "../../assets/icons/icon_search.png";
import icon_basket from "../../assets/icons/icon_basket.png";
import login_icon from "../../assets/icons/login_icon.png"
import signup_icon from "../../assets/icons/signup_icon.png"
import Modal from "../ShoppingCart/ShoppingCart";
import ShoppingCartStore from "../../store/ShoppingCartStore.js";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import { observer } from "mobx-react-lite";
import LoginStore from "../../store/LoginStore.js"
import { ILogin } from "../../utils/interface/ILogin";
import { useNavigate } from 'react-router-dom';
import { toJS } from "mobx";

 const Header = () => {
    const headerTextNames = ["Каталог", "Де придбати?", "Про компанію", "Сервіс центри"];
    const headerTextLinks = ["./", "/where_to_buy", "/about_us", "/service_centers"];
    const [modalActive, setModalActive] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setOrder(ShoppingCartStore.ShoppingCart);
    }, []);



    //getting orders logic
     const getOrdersHistory = () => {
         fetch("http://localhost:4000/orders", {
             method: "GET",
             headers: {
                 "Content-Type": "application/json",
                 "Access-Control-Allow-Origin": "*",
                 "Authorization": `Bearer ${LoginStore.jwtToken}`
             },
         })
             .then(function (response) {
                 console.log("Response Status:", response.status); 
                 return response.json(); 
             })
             .then(function (data) {
                 console.log("Order History Data:", data);
                 LoginStore.setLoginOrders(toJS(data))
             })
             .catch(function (error) {
                 console.error("Error:", error);
             });
     };







    const checkLogin = (data: ILogin) => {
        // Convert the `data` object into a query string
        const queryParams = `email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`;

        // Construct the URL with the query string
        const url = `http://localhost:4000/auth/profile?${queryParams}`;

        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${LoginStore.jwtToken}` }
        }).then(function (response) {
            switch(response.status){
                case 200:
                    console.log("now history page should open")
                    getOrdersHistory()
                    navigate("/profile")
                break;
                case 401:
                    setLoginModal(true)
                break;
                default:
                    console.log("unexpected response")
            }
            return response.json(); // Parse response as JSON
    })
}
     const loginData = {
         email: LoginStore.email,
         password: LoginStore.password,

     }





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
                    <img  className="login_button" src={login_icon} alt="login_button" onClick={()=> checkLogin(loginData)}/>
                    <img className="signup_button" src={signup_icon} alt="signup_button" onClick={()=> setSignUpModal(true)}/>
                    <NavLink to="/map">
                        <img className="header_icon_map" src={icon_map} alt="serch_icon" />
                    </NavLink>
                    <img className="search_button" src={icon_search} alt="search_button" />
                    <img className="basket_button" src={icon_basket} alt="basket_button" onClick={() => setModalActive(true)} />
                    
                </nav>
            </div>
            <div className="image_header"></div>
            <Modal active={modalActive} setActive={setModalActive} order={order} />
            <SignUpModal active={signUpModal} setActive={setSignUpModal} />
            <LoginModal active={loginModal} setActive={setLoginModal} />
        </>
    );
};
export default observer(Header)