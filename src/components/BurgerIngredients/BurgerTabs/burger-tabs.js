
import styles from './burger-tabs.module.css';

const BurgerTabs = () => {
    let nameIngridients = ['Булки', 'Соусы', 'Начинки'];
    nameIngridients = nameIngridients.map((item, index) => {
        return (
            <li className={styles.burgerBase} key={index}>
                <div className={styles.breadTab}>
                    <p className={styles.burgerText}>{item}</p>
                </div>
            </li>
        )

    })

    return (
        <ol className={styles.burgerTabs}>
            {nameIngridients}
        </ol>
    )
}
export default BurgerTabs;