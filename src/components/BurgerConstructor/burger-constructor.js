import { useState, useContext, useEffect, useMemo } from 'react';
import ComponentsContructor from './ComponentsConstructor/components-constructor';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/order-details';
import { TotalPriceContext } from '../Services/burger-context';
import { OrderPostContext } from '../Services/burger-context';
import { BurgerContext } from '../Services/burger-context';
import { postOrder } from '../Utils/burger-api';
import styles from './burger-constructor.module.css';
import Modal from '../Modal/modal';



const BurgerConstructor = () => {
    const { totalPrice } = useContext(TotalPriceContext);
    const burger = useContext(BurgerContext);
    const [open, setOpen] = useState(false);
    const [orderNum, setOrderNum] = useState();
    const [dataId, setDataId] = useState([]);
    const bread = burger.data.filter(item => item.type === "bun");
    const ingr = burger.data.filter(item => item.type === 'sauce');

    useEffect(() => {
        let id1 = bread[0]._id;
        let id = ingr.map(item => item._id)
        if (bread && ingr) {
            setDataId([...dataId, id1, ...id])
        }
    }, [])

    const dataPostId = { ingredients: [...dataId] };

    const handleClick = () => {
        setOpen(true)
        postOrder(dataPostId)
            .then(data => setOrderNum(data))
            .catch(error => console.error(error))
    }
    const closeModal = () => {
        setOpen(null)
    }
    const filteredItems = useMemo(
        () => {
            let number = 0;
            if (orderNum) {
                number = orderNum.order.number;
            }
            return number
        },
        [orderNum])

    return (
        <section className={styles.burgerConstructor}>
            <div className={styles.constructorComponents}>
                <OrderPostContext.Provider value={{ orderNum, setOrderNum }}>
                    <ComponentsContructor />
                </OrderPostContext.Provider>
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