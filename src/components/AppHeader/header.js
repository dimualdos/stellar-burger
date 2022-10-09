
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './header.module.css';

const AppHeader = () => {

    return (

        <header className={styles.navPanel}>
            <nav className={styles.navContent}>
                <div className={styles.navLogo}>
                    <Logo />
                </div>
                <ol className={styles.navLink}>
                    <li className={styles.constructorNav}>
                        <BurgerIcon type="primary" />
                        <p className={styles.navText}>конструктор</p></li>
                    <li className={styles.orderNav}>
                        <MenuIcon type="secondary" />
                        <p className={styles.navText}>Лента заказов</p>
                    </li>
                    <li className={styles.accountNav}>
                        <ProfileIcon type="primary" />
                        <p className={styles.navText}>
                            Личный кабинет
                        </p>
                    </li>
                </ol>
            </nav>
        </header>


    )
}

export default AppHeader;