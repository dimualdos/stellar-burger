
import ComponentsContructor from './ComponentsConstructor/components-constructor';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {

    return (

        <section className={styles.burgerConstructor}>
            <div className={styles.scroll}> </div>
            <div className={styles.constructorComponents}>
                <ComponentsContructor />
            </div>
            <div className={styles.constructorInfo}>
                <div className={styles.constructorPrice}>
                    <div className={styles.constructorText}>610</div>
                    <CurrencyIcon type="primary" />
                </div>
                <button className={styles.buttonConstructor}>
                    <p className={styles.buttonText}>Оформить заказ</p>
                </button>
            </div>
        </section>


    )
}

export default BurgerConstructor;