import React from "react";
import "./UnauthorizedModal.css";

interface UnauthorizedModalProps {
    active: boolean;
    setActive: (value: boolean) => void;
}

const UnaurhorizedModal = ({active, setActive}: UnauthorizedModalProps) => {

    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_order_content" onClick={(e) => e.stopPropagation()}>
                    <h2>Будь ласка, авторизуйтесь</h2>
                </div>
            </div>
        </>
    );

}

export default UnaurhorizedModal