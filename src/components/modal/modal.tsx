import { useEffect, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalItems: HTMLElement | null = document.getElementById('modals');

type TModal = {
    title?: number | string;
    children: ReactNode;
    onClose: () => void;
    overlay: boolean;
    smallTitle: boolean;
}


const Modal: FC<TModal> = ({ title, smallTitle = false, children, onClose, overlay = true }) => {
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
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <section className={smallTitle ? (styles.modalNumber) : (styles.modal)}>
                <div className={smallTitle ? (styles.headerNumber) : (styles.header)}>
                    <div className={smallTitle ? (styles.orderID) : (styles.title)}>
                        {title}
                    </div>
                    <button type='button'
                        className={smallTitle ? (styles.icon1) : (styles.icon)}
                        data-testid='close-modal'
                        onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
                <div className={styles.content}>{children}</div>
            </section>
            {overlay ? (<ModalOverlay onClose={onClose} />) : null}
        </>, modalItems!
    )
}

export default Modal;
