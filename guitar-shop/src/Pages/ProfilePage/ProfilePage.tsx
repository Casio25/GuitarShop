import "./ProfilePage.css";
import React from "react";
import { Button, Stack } from '@mui/material'
import { observer } from "mobx-react-lite";
import LoginStore from "../../store/LoginStore.js"
const CabinetPage = () => {
    interface Item {
        id: number;
        itemId: number;
        price: number;
        quantity: number;
        orderId: number;
    }

    interface Order {
        id: number;
        userId: number;
        date: string;
        totalPrice: number;
        items: Item[];
    }

// You can use these interfaces to type your data in your application.

    

    return (
        <>
            <div>this is cabinet page</div>
            <div className="historyBlock">
                {LoginStore.orders.map((order: Order) => (
                    <div className="order_card" key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>User ID: {order.userId}</p>
                        <p>Date: {order.date}</p>
                        <p>Total Price: {order.totalPrice}</p>
                        <div className="items">
                            {order.items.map((item) => (
                                <div className="item" key={item.id}>
                                    <p>Item ID: {item.itemId}</p>
                                    <p>Price: {item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Subtotal: {item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

}

export default observer(CabinetPage);