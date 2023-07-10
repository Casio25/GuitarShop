import { toJS } from "mobx";
import { useState } from "react";
import { IBackendOrder } from "../../utils/interface/IFinalOrder";
import "./OrderModal.css";

const OrderModal = ({ active, setActive, order }) => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handlePhoneNumberChange = (event: any) => {
        setPhoneNumber(event.target.value);
    };

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        let re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return re.test(phoneNumber);
    };

    function validateEmail(email: string) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }



    const postData = (data: IBackendOrder) => {
        fetch("http://localhost:4000/order", {
            method: "POST",
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.text();
        })
            .then(function (text) {
                console.log(text);
            });

    } 


    //creating backend order//
    const orderBackendInfo = (order) => {
        const items = order.map((orderObject) => ({
            id: orderObject.id,
            price: orderObject.price,
            quantity: orderObject.quantity
        }));

        const totalPrice = order.reduce(
            (accumulator: number, orderObject) => accumulator + orderObject.price * orderObject.quantity,
            0
        );

        const backendOrder: IBackendOrder = {
            items: items,
            userName: name, 
            userPhoneNumber: phoneNumber,
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
                    <div>
                        <input type="text" placeholder="Ім'я" value={name} onChange={handleNameChange} />
                        <input type="tel" placeholder="Номер телефону" value={phoneNumber} onChange={handlePhoneNumberChange} />
                        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                        {phoneNumberError && <p className="error-message">{phoneNumberError}</p>}
                        {emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <button onClick={handleOrderConfirmation}>Підтвердити замовлення</button>
                </div>
            </div>
        </>
    );
};

export default OrderModal;

