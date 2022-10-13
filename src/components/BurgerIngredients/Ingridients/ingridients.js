
import TemlateBurger from '../TemplateBurgers/template-burgers';

import styles from './ingridients.module.css';


const BurgerColumn = (props) => {
    const item = props.data.filter(value => value.type === 'bun');
    return (
        <section className={styles.mainBurgerColumn}>
            <div className={styles.headlineBurger}>
                <div className={styles.headlineText}>
                    Булки
                </div>
            </div>
            <div className={styles.mainColumn}>
                <TemlateBurger data={item} />
            </div>
        </section>
    )
}
const SauceColumn = (props) => {
    const item = props.data.filter(value => value.type === 'sauce');
    return (
        <section className={styles.mainBurgerColumn}>
            <div className={styles.headlineBurger}>
                <div className={styles.headlineText}>
                    Соусы
                </div>
            </div>
            <div className={styles.mainColumn}>
                <TemlateBurger data={item} />
            </div>
        </section>
    )

}
const FillingColumn = (props) => {
    const item = props.data.filter(value => value.type === 'main');
    return (
        <section className={styles.mainBurgerColumn}>
            <div className={styles.headlineBurger}>
                <div className={styles.headlineText}>
                    Ингридиенты
                </div>
            </div>
            <div className={styles.mainColumn}>
                <TemlateBurger data={item} />
            </div>
        </section>
    )
}


const Ingridients = (props) => {
    return (
        <section className={styles.ingridients}>
            <BurgerColumn data={props.data} />
            <SauceColumn data={props.data} />
            <FillingColumn data={props.data} />

        </section>
    )
}

export default Ingridients;