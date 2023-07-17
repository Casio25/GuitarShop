import { useState } from "react";
import React from "react";
import { ProductModalProps } from "../../utils/interface/IProduct.js";
import ShoppingCartStore from "../../store/ShoppingCartStore.js";
import cart_icon from "../../assets/icons/cart_icon.png";
import "./MoreInfo.css";
import acustic from "../../assets/images/acustic.png";
import electro from "../../assets/images/electro.png";
import ukulele from "../../assets/images/ukulele.png";
import { Button, Stack } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



const Modal = ({ active, setActive, product }: ProductModalProps) => {
    const [commentStatus, setCommentStatus] = useState(false);

    function imageSrc(data: string) {
        switch (data) {
            case "acustic.png":
                return acustic;
            case "ukulele.png":
                return ukulele;
            case "electro.png":
                return electro;
            default:
                return "";
        }
    }

    function loadComments() {
        setCommentStatus((prevCommentStatus) => !prevCommentStatus);
    }

    function addToShoppingCart(product: ProductModalProps["product"]) {
        ShoppingCartStore.addToShoppingCart(product);
    }

    return (
        <>
            <div
                className={active ? "modal active" : "modal"}
                onClick={() => setActive(false)}
            >
                <div
                    className="modal_more_info_content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2>Додати товар до кошику</h2>
                    <Stack className="guitar_info">
                        <h3 className="modal_name">{product.guitarName}</h3>
                        <img
                            className="modal_image"
                            src={imageSrc(product.photo)}
                            alt="photo"
                        />
                        <p className="modal_numberOfString">Кількість струн: {product.string}</p>
                        
                    </Stack>
                    <Stack spacing={2} className="comment_section">
                        <Button
                            variant="contained"
                            color='primary'
                            className="modal_buy_button"
                            onClick={() => addToShoppingCart(product)}
                            startIcon={<AddShoppingCartIcon />}
                        >

                            Купити
                        </Button>
                        {!commentStatus && (
                            <Button variant="contained" color="info" className="load_comments" onClick={() => loadComments()}>
                                Завантажити Коменарії
                            </Button>
                        )}
                        {commentStatus && (
                            <>
                                <div className="all_comments">
                                    {product.comments.map((comment, index) => (
                                        <p className="comment" key={index}>
                                            {comment}
                                        </p>
                                    ))}
                                </div>
                                <Button variant="contained" color="error" className="close_comments" onClick={() => loadComments()}>
                                    Закрити коментарі
                                </Button>
                            </>
                        )}
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default Modal;
