import { useState } from 'react';

import ComponentsContructor from './ComponentsConstructor/components-constructor';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/order-details';
import styles from './burger-constructor.module.css';
import Modal from '../Modal/modal';



const BurgerConstructor = () => {

    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(null)
    }

    return (

        <section className={styles.burgerConstructor}>
            <div className={styles.scroll}>
                <div className={styles.constructorComponents}>
                    <ComponentsContructor />
                </div>
            </div>

            <div className={styles.constructorInfo}>
                <div className={styles.constructorPrice}>
                    <div className={styles.constructorText}>610</div>
                    <CurrencyIcon type="primary" />
                </div>
                <button
                    type='button'
                    onClick={handleClick}
                    className={styles.buttonConstructor}>
                    <p className={styles.buttonText}>Оформить заказ</p>
                </button>
            </div>
            {open ?
                (<Modal onClose={closeModal} title='Детали заказа'>
                    <OrderDetails numberOrder='034536' />
                </Modal>) : null
            }

        </section>
    )
}



export default BurgerConstructor;