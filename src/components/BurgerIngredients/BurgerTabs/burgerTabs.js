
import styles from './burgerTabs.module.css';

const BurgerTabs = () => {
    return (
        <ol className={styles.burgerTabs}>
            <li className={styles.burgerBase}>
                <div className={styles.breadTab}>
                    <p className={styles.burgerText}>Булки</p>
                </div>
            </li>
            <li className={styles.burgerBase}>
                <div className={styles.sauceTab}>
                    <p className={styles.burgerText}>Соусы</p>
                </div>
            </li>
            <li className={styles.burgerBase}>
                <div className={styles.fillingsTab}>
                    <p className={styles.burgerText}>Начинки</p>
                </div>
            </li>
        </ol>
    )
}
export default BurgerTabs;