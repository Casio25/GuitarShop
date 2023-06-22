import { observer } from "mobx-react-lite";
import { NavLink } from 'react-router-dom';


import ShoppingCartStore from "../../store/ShoppingCartStore";
import "./ShoppingCart.css"

    const Modal = ({ active, setActive, order }) => {
        


        return (
            <>
                <div
                    className={active ? "modal active" : "modal"}
                    onClick={() => setActive(false)}
                >
                    <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                        <h2>Кошик</h2>
                        <div className="store">
                            {ShoppingCartStore.ShoppingCart.map((product) =>(
                                <div className="cart_element">
                                    <img className="cart_product_image" src={product.photo} alt="product_image" /> 
                                    <p>{product.guitarName} </p>
                                    <div className="quantityBlock">
                                        <button className={`remove_quantity${product.quantity < 2 ? " disabled" : ""}`}
                                        onClick={() => ShoppingCartStore.quantityControl(product, "remove")}>-</button>
                                        <p>{product.quantity}</p>
                                        <button
                                            className={`add_quantity${product.quantity > 19 ? " disabled" : ""}`}
                                            onClick={() => ShoppingCartStore.quantityControl(product, "add")}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button className="remove_button" onClick={() => ShoppingCartStore.removeFromShoppingCart(product)}>Видалити</button>
                                </div>
                            ))}
                        </div>
                        <NavLink className="order_button" to='/orderpage' onClick={() => setActive(false)} order={(ShoppingCartStore.ShoppingCart)}><button> Оформити замовлення</button> </NavLink>

                    </div>

                </div>
            </>
        )


    }
export default observer(Modal)