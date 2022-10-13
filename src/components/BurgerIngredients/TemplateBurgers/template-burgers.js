
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './template-burgers.module.css';


const TemlateBurger = (props) => {
//console.log(props.data);
    const itemsBurger = props.data.map((value, i) => {

        return (
            <div className={styles.burgerItem} key={value._id}>
                <div className={styles.ingridient}>
                    <div className={styles.counterColumn}>
                        <div className={styles.counterText}>
                            <div className={styles.roundedText}>1</div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.illustration}>
                            <img src={value.image} alt="" />
                        </div>
                        <div className={styles.price}>
                            <div className={styles.textPrice}>{value.price}</div>
                            <div className={styles.icon}><CurrencyIcon type="primary" /></div>
                        </div>
                        <div className={styles.namePrice}>{value.name}</div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className={styles.columnBurgeres}>
            {itemsBurger}
        </div>
    )
}


export default TemlateBurger;