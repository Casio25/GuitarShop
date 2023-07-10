import { observer } from "mobx-react-lite";
import {toJS} from "mobx";
import { NavLink } from 'react-router-dom';
import acustic from "../../assets/images/acustic.png";
import electro from "../../assets/images/electro.png";
import ukulele from "../../assets/images/ukulele.png";


import ShoppingCartStore from "../../store/ShoppingCartStore";
import "./ShoppingCart.css"

    const Modal = ({ active, setActive, order }) => {

        function imageSrc(data) {
            switch (data) {
                case "acustic.png":
                    return acustic;
                    break;
                case "ukulele.png":
                    return ukulele;
                    break;
                case "electro.png":
                    return electro;
                    break

                default:
                    return ''
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
                            {ShoppingCartStore.ShoppingCart.map((product) =>(
                                <div className="cart_element">
                                    <img className="cart_product_image" src={imageSrc(product.photo)} alt="product_image" /> 
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
                        <NavLink className="order_button" to='/orderpage' onClick={() => {setActive(false); console.log(toJS(ShoppingCartStore.ShoppingCart))}} order={(ShoppingCartStore.ShoppingCart)}><button> Оформити замовлення</button> </NavLink>

                    </div>

                </div>
            </>
        )


    }
export default observer(Modal)