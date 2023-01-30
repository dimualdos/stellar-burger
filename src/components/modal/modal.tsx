import { useEffect, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalItems: HTMLElement | null = document.getElementById('modals');

type TModal = {
    title?: number | string;
    title1?: number | string;
    children: ReactNode;
    onClose: () => void;
    overlay: boolean;
}


const Modal: FC<TModal> = ({ title, title1, children, onClose, overlay = true }) => {
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

            <section className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.orderID}>
                        {title1}
                    </div>

                    <div className={styles.title}>
                        {title}
                    </div>
                    <button type='button'
                        className={styles.icon}
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
