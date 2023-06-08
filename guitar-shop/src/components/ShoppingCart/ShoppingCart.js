import { observer } from "mobx-react-lite";
import ShoppingCartStore from "../../store/ShoppingCartStore";
import "./ShoppingCart.css"

    const Modal = ({ active, setActive, product }) => {
        


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
                                    <button onClick={() => ShoppingCartStore.removeFromShoppingCart(product)}>Видалити</button>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </>
        )


    }
export default observer(Modal)