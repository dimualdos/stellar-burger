
import ComponentsContructor from './ComponentsConstructor/componentsConstructor';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerConstructor.module.css'

const BurgerConstructor = () => {

    return (
        
            <section className={styles.burgerConstructor}>
                <div className={styles.scroll}> </div>
                <div className={styles.constructorComponents}>
                    <ComponentsContructor/>
                </div>
                <div className={styles.constructorInfo}>
                    <div className={styles.constructorPrice}>
                        <div className={styles.constructorText}>610</div>
                        <CurrencyIcon type="primary" />
                    </div>
                    <button className={styles.buttonConstructor}>
                        <div className={styles.buttonBase}>
                            <p className={styles.buttonText}>Оформить заказ</p>
                        </div>
                    </button>
                </div>
            </section>
        

    )
}

export default BurgerConstructor;