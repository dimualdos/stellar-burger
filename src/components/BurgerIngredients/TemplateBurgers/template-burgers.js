import { PropTypes } from "prop-types";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './template-burgers.module.css';



const TemlateBurger = ({ onIngridientSelected, data, headlineText, id }) => {

    const itemsBurger = data.map((value) => {
        return (
            <div className={styles.ingridient}

                key={value._id}
                onClick={() => onIngridientSelected(value._id, value.image, value.name, value.proteins, value.fat, value.carbohydrates, value.calories)}

            >
                <div className={styles.counterColumn}>
                    <Counter count={1} size="default" />
                </div>
                <div className={styles.content}>
                    <div className={styles.illustration}>
                        <img src={value.image} alt="бургер" />
                    </div>
                    <div className={styles.price}>
                        <div className={styles.textPrice}>{value.price}</div>
                        <div className={styles.icon}><CurrencyIcon type="primary" /></div>
                    </div>
                    <div className={styles.namePrice}>{value.name}</div>
                </div>
            </div>
        )
    })
    return (
        <section className={styles.mainBurgerColumn} >
            <div className={styles.headlineBurger}>
                <div className={styles.headlineText} id={id}>
                    {headlineText}
                </div>
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.columnBurgeres}>
                    {itemsBurger}
                </div>
            </div>

        </section>
    )

}

TemlateBurger.propTypes = {
    onIngridientSelected: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    headlineText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}


export default TemlateBurger;