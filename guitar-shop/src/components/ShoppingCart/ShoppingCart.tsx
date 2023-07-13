import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from 'react-router-dom';
import acustic from "../../assets/images/acustic.png";
import electro from "../../assets/images/electro.png";
import ukulele from "../../assets/images/ukulele.png";
import ShoppingCartStore from "../../store/ShoppingCartStore.js";
import "./ShoppingCart.css";

interface ISelectedProduct {
    guitarName: string;
    photo: string;
    quantity: number;
}

interface IOrderModalProps {
    active: boolean;
    setActive: (value: boolean) => void;
    order: ISelectedProduct[];
}

const Modal = ({ active, setActive, order }: IOrderModalProps) => {
    function imageSrc(data: string) {
        switch (data) {
            case "acustic.png":
                return acustic;
            case "ukulele.png":
                return ukulele;
            case "electro.png":
                return electro;
            default:
                return '';
        }
    }

    return (
        <>
            <div
                className={active ? "modal active" : "modal"}
                onClick={() => setActive(false)}
            >
                <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                    <h2>Кошик</h2>
                    <div className="store">
                        {order.map((product: ISelectedProduct) => (
                            <div className="cart_element" key={product.guitarName}>
                                <img className="cart_product_image" src={imageSrc(product.photo)} alt="product_image" />
                                <p>{product.guitarName}</p>
                                <div className="quantityBlock">
                                    <button
                                        className={`remove_quantity${product.quantity < 2 ? " disabled" : ""}`}
                                        onClick={() => ShoppingCartStore.quantityControl(product, "remove")}
                                    >
                                        -
                                    </button>
                                    <p>{product.quantity}</p>
                                    <button
                                        className={`add_quantity${product.quantity > 19 ? " disabled" : ""}`}
                                        onClick={() => ShoppingCartStore.quantityControl(product, "add")}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="remove_button"
                                    onClick={() => ShoppingCartStore.removeFromShoppingCart(product)}
                                >
                                    Видалити
                                </button>
                            </div>
                        ))}
                    </div>
                    <NavLink className="order_button" to="/orderpage" onClick={() => setActive(false)}>
                        <button>Оформити замовлення</button>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default observer(Modal);
