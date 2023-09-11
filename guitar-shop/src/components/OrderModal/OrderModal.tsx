import { toJS } from "mobx";
import React from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import { IBackendOrder } from "../../utils/interface/IFinalOrder";
import { IOrderItem } from "../../utils/interface/IOrderItem";
import "./OrderModal.css";
import { Stack, TextField, Button, InputAdornment } from '@mui/material'
import LoginStore from "../../store/LoginStore.js"
import { observer } from "mobx-react-lite";

interface OrderModalProps {
    active: boolean;
    setActive: (value: boolean) => void;
    order: IOrderItem[];
}

const OrderModal = ({ active, setActive, order }: OrderModalProps) => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        let re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;;
        return re.test(phoneNumber);
    };

    function validateEmail(email: string) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }



    const postData = (data: IBackendOrder) => {
        fetch("http://localhost:4000/order", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${LoginStore.jwtToken}`},
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.text();
        })
            .then(function (text) {
                console.log(text);
            });

    } 


    //creating backend order//
    const orderBackendInfo = (order: IOrderItem[]) => {
        const items = order.map((orderObject: IOrderItem) => ({
            itemId: orderObject.id,
            price: orderObject.price,//remove in future
            quantity: orderObject.quantity
        }));

        const totalPrice = order.reduce(
            (accumulator: number, orderObject:IOrderItem) => accumulator + orderObject.price * orderObject.quantity,
            0
        );

        const backendOrder: IBackendOrder = {
            items: items,
            userEmail: email,
            totalPrice: totalPrice,
            date: (new Date(Date.now())).toString()
        };

        console.log(backendOrder);

        postData(backendOrder);


    };






    const handleOrderConfirmation = () => {
        if (phoneNumber.trim() === "" || !validatePhoneNumber(phoneNumber)) {
            setPhoneNumberError("Please enter a valid phone number");
        } else if (email.trim() === "" || !validateEmail(email)) {
            setEmailError("Please enter a valid email address");
        } else {
            setPhoneNumberError("");
            setEmailError("");
            console.log("Order confirmed!");
            orderBackendInfo(order);
        }
    };



    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_order_content" onClick={(e) => e.stopPropagation()}>
                    <h2>Введіть ваші дані</h2>
                    <Stack direction='column' spacing={2}>
                        <TextField type="text" label="Ім'я" required value={name} onChange={handleNameChange} />
                        <TextField type="tel" label="Номер телефону" required value={phoneNumber} InputProps={{
                            startAdornment: <InputAdornment position="start">+38</InputAdornment>
                        }} onChange={handlePhoneNumberChange} />
                        <TextField type="email" label="Email" required value={email} onChange={handleEmailChange} />
                        {phoneNumberError && <p className="error-message">{phoneNumberError}</p>}
                        {emailError && <p className="error-message">{emailError}</p>}
                    </Stack>
                
                    <Button 
                        sx={{ m: 2 }}
                     variant='contained' color='success' onClick={handleOrderConfirmation}>Підтвердити замовлення</Button>
                    
                </div>
            </div>
        </>
    );
};

export default  observer(OrderModal);

