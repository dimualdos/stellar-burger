import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutAuth } from '../services/actions/auth';
import styles from './css/profile.module.css';



export const Orders = () => {
    const dispatch = useDispatch();
    let onLogout = (e) => {
        e.preventDefault();
        dispatch(logoutAuth());
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <nav>
                    <div>
                        <NavLink
                            to={{ pathname: '/profile' }} exact
                            className={styles.textProfile}
                            activeClassName={styles.styleActiveClass}>
                            <p>Профиль</p>
                        </NavLink>
                        <NavLink to={{ pathname: `/profile/orders` }} exact
                            className={styles.textProfile}
                            activeClassName={styles.styleActiveClass}>
                            <p>История заказов</p>
                        </NavLink>
                        <Link to={{ pathname: `/` }} onClick={onLogout}>
                            <li className={styles.textProfile} > <p>Выход</p> </li>
                        </Link>
                    </div>
                    <div>
                        <p className={styles.textPersonal}>
                            В этом разделе Вы можете изменить свои персональные данные
                        </p>
                    </div>
                </nav>
            </div>
        </section>

    )
}
