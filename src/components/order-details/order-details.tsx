

import { FC } from 'react';
import styles from './order-details.module.css';

type TOrderDetails = {
    numberOrder: number
}

const OrderDetails: FC<TOrderDetails> = ({ numberOrder }) => {

    return (
        <div className={styles.order}>
            <div className={styles.divOrderNumber}>
                <p className={styles.orderNumber} >{numberOrder}</p>
            </div>
            <div className={styles.divOrderText}>
                <p className={styles.idOrderText}>
                    Идентификатор заказа
                </p>
            </div>
            <div className={styles.done}></div>
            <div className={styles.divOrderText}>
                <p className={styles.orderText}>
                    Ваш заказ начали готовить
                </p>
            </div>
            <div className={styles.divOrderText}>
                <p className={styles.orderTextOrbital} >
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </div>
    )
}

export default OrderDetails;
