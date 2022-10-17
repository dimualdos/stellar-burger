
import { PropTypes } from "prop-types";
import styles from './order-details.module.css';

const OrderDetails = ({ numberOrder }) => {

    return (

        <div className="order">
            <div className={styles.divOrderNumber}>
                <p className={`${styles.orderNumber} text text_type_digits-large`}>{numberOrder}</p>
            </div>
            <div className={styles.divOrderText}>
                <p className={`${styles.orderText} text text_type_main-large`}>
                    Идентификатор заказа
                </p>
            </div>
            <div className={styles.done}></div>
            <div className={styles.divOrderText}>
                <p className={`${styles.orderText} text text_type_main-medium`}>
                    Ваш заказ начали готовить
                </p>
            </div>
            <div className={styles.divOrderText}>
                <p className={`${styles.orderText} text text_type_main-medium `} style={{ 'color': '#8585AD' }}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </div>
    )
}

OrderDetails.propTypes = {
    numberOrder: PropTypes.string
}

export default OrderDetails;