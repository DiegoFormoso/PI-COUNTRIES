import styles from "./windowModal.module.css";

export const WindowModal = ({children, isOpen, closeModal, buttonCloseUp}) => {

    return (
        //  <div className = {`modal ${isOpen && "is-open"}`}>
        <div className = {(isOpen && styles.modalIsOpen) || (styles.modal)}>
            <div className={styles.modalContainer}>
                <div className={(buttonCloseUp && styles.btnDivVisible) || (styles.btnDivHidden)}>
                    <button 
                        className={styles.modalClose} 
                        onClick={closeModal}>X
                    </button>
                </div>

                <div>
                    {children}
                </div>
                
                <div className={(!buttonCloseUp && styles.btnDivVisible) || (styles.btnDivHidden)}>
                    <button 
                        className={styles.modalOk} 
                        onClick={closeModal}>OK                        
                    </button>
                </div>
            </div>
        </div>
    )
}