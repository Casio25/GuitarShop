import { observer } from "mobx-react-lite";
import ShoppingCartStore from "../../store/ShoppingCartStore";


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
                                <p onClick={() => ShoppingCartStore.removeFromShoppingCart(product)}>{product.guitarName} </p>
                            ))}
                        </div>

                    </div>

                </div>
            </>
        )


    }
export default observer(Modal)