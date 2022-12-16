
import { FC } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
    onClose: () => void;
}

const ModalOverlay: FC<TModalOverlay> = ({ onClose }) => {
    return (
        <div className={styles.modalOverLay} onClick={onClose}></div>
    )
}

export default ModalOverlay;
