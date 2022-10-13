
import styles from './burger-tabs.module.css';

const BurgerTabs = () => {
    let nameIngridients = ['Булки', 'Соусы', 'Начинки'];
    nameIngridients = nameIngridients.map((item, index) => {
        return (
            <div className={styles.burgerBase} key={index}>
                <div className={styles.breadTab}>
                    <p className={styles.burgerText}>{item}</p>
                </div>
            </div>
        )

    })

    return (
        <section className={styles.burgerTabs}>
            {nameIngridients}
        </section>
    )
}
export default BurgerTabs;