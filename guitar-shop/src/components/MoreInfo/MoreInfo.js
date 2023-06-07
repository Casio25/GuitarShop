
const Modal = ({ active, setActive, product }) => {
    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                    <h2>Додати товар до кошику</h2>
                    <h3 className="modal_name">{product.guitarName}</h3>
                    <img className="modal_image" src={product.photo} alt="photo" />
                </div>
            </div>
        </>
    );
};
export default Modal;
