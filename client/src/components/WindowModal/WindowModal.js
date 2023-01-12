import "./windowModal.css";

export const WindowModal = ({children, isOpen, closeModal}) => {
    return (
        <div className = {`modal ${isOpen && "is-open"}`}>
            <div className="modal-container">
                <div>
                    {children}
                </div>
                <div>
                    <button className="modal-close" onClick={closeModal}>OK</button>
                </div>
            </div>
        </div>
    )
}