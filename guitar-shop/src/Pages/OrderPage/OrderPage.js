import { useState } from "react";
import { observer } from "mobx-react-lite";
import ShoppingCartStore from "../../store/ShoppingCartStore";
import "./OrderPage.css"
import acustic from "../../assets/images/acustic.png";
import electro from "../../assets/images/electro.png";
import ukulele from "../../assets/images/ukulele.png";
import OrderModal from "../../components/OrderModal/OrderModal";

const OrderPage = () => {
    const [modalActive, setModalActive] = useState(false)

    function imageToSrc(data) {
        switch (data) {
            case acustic:
                return "acustic.png";
                break;
            case ukulele:
                return "ukulele.png";
                break;
            case electro:
                return 'electro.png';
                break

            default:
                return ''
        }
    }
    function OrderSumandQuantity(data, type) {
        if (type === "sum") {
            const totalSum = data.reduce((sum, orderData) => sum + (orderData.price * orderData.quantity), 0);
            return totalSum;
        } else if (type === "quantity") {
            const totalQuantity = data.reduce((sum, orderData) => sum + orderData.quantity, 0);
            return totalQuantity;
        }
    }








    return (
        <>
        <div className="OrderBlock">
            <div className="order_info">
                {ShoppingCartStore.ShoppingCart.map((orderData, index) => (
                    <div className="order_card">
                        <p>Назва: {orderData.guitarName}</p>
                        <p>{orderData.id}</p>
                        <p>Кількість: {orderData.quantity}</p>
                        <p>Ціна: {orderData.price * orderData.quantity}</p>
                        <img className="order_photo" src={(orderData.photo)} alt="photo" />
                    </div>
                ))}
            </div>
            <div className="order_summary">
                <p>Загальна ціна: {OrderSumandQuantity(ShoppingCartStore.ShoppingCart, "sum")}</p>
                <p>Загальна кількість: {OrderSumandQuantity(ShoppingCartStore.ShoppingCart, "quantity")}</p>
                <button onClick={()=>setModalActive(true)}>Confirm Order</button>
            </div>
        </div>
            <OrderModal active={modalActive} setActive={setModalActive} />
        </>
    )
}

export default observer(OrderPage);