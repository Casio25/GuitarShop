import { useState } from "react";
import ShoppingCartStore from "../../store/ShoppingCartStore";
import cart_icon from "../../assets/icons/cart_icon.png"
import "./MoreInfo.css"

const Modal = ({ active, setActive, product }) => {
    const [commentStatus, setCommentStatus] = useState(false)

    function loadComments() {
        if (!commentStatus) {
            setCommentStatus(true);
        } else {
            setCommentStatus(false);
        }
    }
    function addToShoppingCart(product) {
        ShoppingCartStore.addToShoppingCart(product);
    }

    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_more_info_content" onClick={(e) => e.stopPropagation()}>
                    <h2>Додати товар до кошику</h2>
                    <div className="guitar_info">
                        <h3 className="modal_name">{product.guitarName}</h3>
                        <img className="modal_image" src={product.photo} alt="photo" />
                        <button className="modal_buy_button" onClick={() => addToShoppingCart(product)}>
                            <img className="cart_icon" src={cart_icon} alt="cart_icon" />
                            Купити</button>
                    </div>
                        <div className="comment_section">
                            {!commentStatus && (<button className="load_comments" onClick={() => loadComments(product)}> Завантажити Коменарії</button>)
                            }
                            {commentStatus && (
                                <>
                                    <div className="all_comments">
                                        {product.comments.map((comment, index) => (
                                            <p className="comment" key={index}>{comment}</p>
                                        ))}
                                    </div>
                                    <button className="close_comments" onClick={() => loadComments()}>
                                        Закрити коментарі
                                    </button>
                                </>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Modal;
