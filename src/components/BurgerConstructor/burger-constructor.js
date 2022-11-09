import { useState, useContext, useMemo } from 'react';
import ComponentsContructor from './ComponentsConstructor/components-constructor';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/order-details';
import { TotalPriceContext } from '../../services/burger-context';
import { OrderPostContext, OrderPostId } from '../../services/burger-context';
import { postOrder } from '../../utils/burger-api';
import styles from './burger-constructor.module.css';
import Modal from '../Modal/modal';



const BurgerConstructor = () => {
    const { totalPrice } = useContext(TotalPriceContext);
    const [open, setOpen] = useState(false);
    const [orderNum, setOrderNum] = useState();
    const [dataId, setDataId] = useState([]);
    const dataPostId = { ingredients: [...dataId] };

    const handleClick = () => {
        setOpen(true)
        postOrder(dataPostId)
            .then(data => setOrderNum(data))
            .catch(error => console.error(error))
    };

    const closeModal = () => {
        setOpen(null)
    };
    const filteredItems = useMemo(
        () => {
            return orderNum ? orderNum.order.number : 0
        },
        [orderNum]);

    return (
        <section className={styles.burgerConstructor}>
            <div className={styles.constructorComponents}>
                <OrderPostId.Provider value={{ dataId, setDataId }}>
                    <OrderPostContext.Provider value={{ orderNum, setOrderNum }}>
                        <ComponentsContructor />
                    </OrderPostContext.Provider>
                </OrderPostId.Provider>
            </div>
            <div className={styles.constructorInfo}>
                <div className={styles.constructorPrice}>
                    <div className={styles.constructorText}>{totalPrice}</div>
                    <div><CurrencyIcon type="primary" /></div>
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
                    <OrderDetails numberOrder={filteredItems} />
                </Modal>) : null
            }

        </section>
    )
}

export default BurgerConstructor;