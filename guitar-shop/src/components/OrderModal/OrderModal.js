import "./OrderModal.css";

const OrderModal = ({ active, setActive, order }) => {
    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_order_content" onClick={(e) => e.stopPropagation()}>
                    <h2>Введіть ваші дані</h2>
                    <div>
                        <input type="text" placeholder="Ім'я" />
                        <input type="tel" placeholder="Номер телефону" />
                    </div>
                    <button onClick={() => console.log("Order confirmed!")}>Підтвердити замовлення</button>
                </div>
            </div>
        </>
    );
};

export default OrderModal;
