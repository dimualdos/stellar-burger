
import { PropTypes } from "prop-types";
import styles from './order-details.module.css';

const OrderDetails = ({ numberOrder }) => {

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

OrderDetails.propTypes = {
    numberOrder: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,

    ])
}

export default OrderDetails;
