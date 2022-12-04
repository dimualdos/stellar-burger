import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './header.module.css';

const AppHeader = () => {

    const isConstructor = useRouteMatch({ path: '/', exact: true });
    const isFeed = useRouteMatch('/profile/orders');
    const isProfile = useRouteMatch('/profile');
    const userName = useSelector(state => state.user.data?.name);

    return (
        <header className={styles.navPanel}>
            <nav className={styles.navContent}>
                <div className={styles.navLink}>

                    <NavLink
                        to="/"
                        className={styles.constructorNav}>
                        <BurgerIcon type={isConstructor ? "primary" : 'secondary'} />
                        <p className={styles.navText}>конструктор</p>
                    </NavLink>

                    <NavLink
                        to="/profile/orders"
                        className={styles.orderNav}>
                        <MenuIcon type={isFeed ? "primary" : "secondary"} />
                        <p className={styles.navText}>Лента заказов</p>
                    </NavLink>

                </div>

                <NavLink
                    to="/"
                    className={styles.navLogo}>
                    <Logo />
                </NavLink>

                <NavLink
                    to={{ pathname: `/profile` }} exact
                    activeClassName="selected"
                >
                    <div className={styles.accountNav}>
                        <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                        <p className={styles.navText}>
                            {userName ? userName : 'Личный кабинет'}
                        </p>
                    </div>

                </NavLink>

            </nav>
        </header>
    )
}

export default AppHeader;
