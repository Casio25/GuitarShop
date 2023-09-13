import { useState } from "react";
import { observer } from "mobx-react-lite";
import ShoppingCartStore from "../../store/ShoppingCartStore.js";
import "./OrderPage.css"
import LoginStore from "../../store/LoginStore.js"
import acustic from "../../assets/images/acustic.png";
import electro from "../../assets/images/electro.png";
import ukulele from "../../assets/images/ukulele.png";
import OrderModal from "../../components/OrderModal/OrderModal";
import React from "react";
import { Button, Stack } from '@mui/material'
import { IOrderItem } from "../../utils/interface/IOrderItem";
import { IBackendOrder } from "../../utils/interface/IFinalOrder";
import UnauthorizedModal from "../../components/UnauthorizedModal/UnauthorizedModal"

interface IOrderData {
    price: number;
    quantity: number;
    guitarName: string;
    id: number;
    photo: string;
}



const OrderPage = () => {

    const isEmpty = ShoppingCartStore.ShoppingCart.length


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

    /* Our new logic to kill modal */
    const postData = (data: IBackendOrder) => {
        fetch("http://localhost:4000/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${LoginStore.jwtToken}`
            },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                if (response.status === 401) {
                    console.log("Please login");
                    setModalActive(true)
                }
                return response.text();
            })
            .then(function (text) {
                console.log(text);
            });
    }

    const orderBackendInfo = (order: IOrderItem[]) => {
        const items = order.map((orderObject: IOrderItem) => ({
            itemId: orderObject.id,
            price: orderObject.price,//remove in future
            quantity: orderObject.quantity
        }));

        const totalPrice = order.reduce(
            (accumulator: number, orderObject: IOrderItem) => accumulator + orderObject.price * orderObject.quantity,
            0
        );

        const backendOrder: IBackendOrder = {
            items: items,
            userEmail: LoginStore.email,
            totalPrice: totalPrice,
            date: (new Date(Date.now())).toString()
        };

        console.log(backendOrder);

        postData(backendOrder);


    };

    const handleOrderConfirmation = () => {
            console.log("Order confirmed!");
        orderBackendInfo(ShoppingCartStore.ShoppingCart);
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
                    {!!isEmpty && (<>
                        <Button variant="contained" color="primary" onClick={() => handleOrderConfirmation()}>Confirm Order</Button>
                    </>)}
                </div>
            </div>
            {/* old modal logic */}
            {/* <OrderModal active={modalActive} setActive={setModalActive} order={ShoppingCartStore.ShoppingCart} /> */}
            <UnauthorizedModal active={modalActive} setActive={setModalActive} />
        </>
    )
}

export default observer(OrderPage);


/* Need to change my schema for orders, delete phone number and name */
