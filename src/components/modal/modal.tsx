import { useEffect, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalItems: HTMLElement | null = document.getElementById('modals');

type TModal = {
    title: string;
    children: ReactNode;
    onClose: () => void;
    overlay: boolean;
}


const Modal: FC<TModal> = ({ title, children, onClose, overlay = true }) => {
    useEffect(() => {
        const removeModal = (e: KeyboardEvent) => {
            e.key === 'Escape' && onClose();
        }

        modalItems!.classList.add('modalWrapper');
        document.addEventListener('keydown', removeModal);

        return () => {
            document.removeEventListener('keydown', removeModal);
            modalItems!.classList.remove('modalWrapper');

        }
    }, [onClose])

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <button type='button'
                        className={styles.icon}
                        onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>

                </div>
                <div className={styles.content}>{children}</div>

            </div>
            {overlay ? (<ModalOverlay onClose={onClose} />) : null}

        </>, modalItems!
    )
}

export default Modal;
