import { useState } from "react";
import { observer } from "mobx-react-lite";
import ShoppingCartStore from "../../store/ShoppingCartStore.js";
import "./OrderPage.css"
import acustic from "../../assets/images/acustic.png";
import electro from "../../assets/images/electro.png";
import ukulele from "../../assets/images/ukulele.png";
import OrderModal from "../../components/OrderModal/OrderModal";
import React from "react";
import { Button, Stack } from '@mui/material'

interface IOrderData {
    price: number;
    quantity: number;
    guitarName: string;
    id: number;
    photo: string;
}

const OrderPage = () => {
    const [modalActive, setModalActive] = useState(false)

    function imageSrc(data: string) {
        switch (data) {
            case "acustic.png":
                return acustic;
            case "ukulele.png":
                return ukulele;
            case "electro.png":
                return electro;
            default:
                return ''
        }
    }

    function OrderSumandQuantity(data: IOrderData[], type: "sum" | "quantity") {
        if (type === "sum") {
            const totalSum = data.reduce((sum: number, orderData: IOrderData) => sum + (orderData.price * orderData.quantity), 0);
            return totalSum;
        } else if (type === "quantity") {
            const totalQuantity = data.reduce((sum: number, orderData: IOrderData) => sum + orderData.quantity, 0);
            return totalQuantity;
        }
    }

    return (
        <>
            <div className="OrderBlock">
                <div className="order_info">
                    {ShoppingCartStore.ShoppingCart.map((orderData: IOrderData, index: number) => (
                        <div className="order_card" key={index}>
                            <p>Назва: {orderData.guitarName}</p>
                            <p>{orderData.id}</p>
                            <p>Кількість: {orderData.quantity}</p>
                            <p>Ціна: {orderData.price * orderData.quantity}</p>
                            <img className="order_photo" src={imageSrc(orderData.photo)} alt="photo" />
                        </div>
                    ))}
                </div>
                <div className="order_summary">
                    <p>Загальна ціна: {OrderSumandQuantity(ShoppingCartStore.ShoppingCart, "sum")}</p>
                    <p>Загальна кількість: {OrderSumandQuantity(ShoppingCartStore.ShoppingCart, "quantity")}</p>
                    <Button variant="contained" color="primary" onClick={() => setModalActive(true)}>Confirm Order</Button>
                </div>
            </div>
            <OrderModal active={modalActive} setActive={setModalActive} order={ShoppingCartStore.ShoppingCart} />
        </>
    )
}

export default observer(OrderPage);
